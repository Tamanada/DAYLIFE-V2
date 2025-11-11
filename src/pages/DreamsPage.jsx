import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Target, CheckCircle } from 'lucide-react';
import { daylifeClient } from '@/api/daylifeClient.js';
import { Button } from '@/components/ui/button.jsx';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import DreamCard from '@/components/dreams/DreamCard.jsx';
import DreamForm from '@/components/dreams/DreamForm.jsx';
import MilestoneForm from '@/components/dreams/MilestoneForm.jsx';
import CelebrationModal from '@/components/dreams/CelebrationModal.jsx';

export default function DreamsPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingDream, setEditingDream] = useState(null);
  const [showMilestoneForm, setShowMilestoneForm] = useState(false);
  const [selectedDream, setSelectedDream] = useState(null);
  const [filter, setFilter] = useState('all');
  const [celebrationDream, setCelebrationDream] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const { data: dreams = [] } = useQuery({
    queryKey: ['dreams'],
    queryFn: () => daylifeClient.entities.Dream.list('-created_date')
  });

  const { data: milestones = [] } = useQuery({
    queryKey: ['milestones'],
    queryFn: () => daylifeClient.entities.Milestone.list('-created_date')
  });

  const { data: reflections = [] } = useQuery({
    queryKey: ['reflections'],
    queryFn: () => daylifeClient.entities.Reflection.list('-date')
  });

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => daylifeClient.auth.me()
  });

  const createDreamMutation = useMutation({
    mutationFn: async (dreamData) => {
      const result = await daylifeClient.entities.Dream.create(dreamData);
      await daylifeClient.auth.updateMe({ total_stars: (user?.total_stars || 0) + 2 });
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dreams'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
      setShowForm(false);
      setEditingDream(null);
    }
  });

  const updateDreamMutation = useMutation({
    mutationFn: ({ id, data }) => daylifeClient.entities.Dream.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dreams'] });
      setShowForm(false);
      setEditingDream(null);
    }
  });

  const deleteDreamMutation = useMutation({
    mutationFn: (id) => daylifeClient.entities.Dream.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dreams'] });
    }
  });

  const createMilestoneMutation = useMutation({
    mutationFn: async (milestoneData) => {
      const result = await daylifeClient.entities.Milestone.create(milestoneData);
      if (milestoneData.status === 'completed') {
        await daylifeClient.auth.updateMe({ total_stars: (user?.total_stars || 0) + 1 });
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
      setShowMilestoneForm(false);
      setSelectedDream(null);
    }
  });

  const deleteMilestoneMutation = useMutation({
    mutationFn: async (milestone) => {
      if (milestone.status === 'completed') {
        await daylifeClient.auth.updateMe({ total_stars: Math.max((user?.total_stars || 0) - 1, 0) });
      }
      await daylifeClient.entities.Milestone.delete(milestone.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['milestones'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
    }
  });

  const handleSave = (dreamData) => {
    if (editingDream) {
      updateDreamMutation.mutate({ id: editingDream.id, data: dreamData });
    } else {
      createDreamMutation.mutate(dreamData);
    }
  };

  const handleToggleStatus = async (dream) => {
    const newStatus = dream.status === 'completed' ? 'in_progress' : 'completed';
    const updateData = {
      ...dream,
      status: newStatus,
      completed_date: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : null
    };
    await updateDreamMutation.mutateAsync({ id: dream.id, data: updateData });
    if (newStatus === 'completed') {
      await daylifeClient.auth.updateMe({ total_stars: (user?.total_stars || 0) + 3 });
      queryClient.invalidateQueries({ queryKey: ['me'] });
      setCelebrationDream(dream);
      setShowCelebration(true);
    }
  };

  const handleShare = () => {
    if (!celebrationDream) return;
    const win = typeof window !== 'undefined' ? window : null;
    const shareText = `🎉 I just achieved my dream: "${celebrationDream.title}" on DAYLIFE! Every day counts. What will you do with yours? #DAYLIFE #DreamAchieved`;
    const shareUrl = win?.location?.origin ?? 'https://daylife.app';

    if (win?.navigator?.share) {
      win.navigator.share({
        title: 'Dream Achieved on DAYLIFE',
        text: shareText,
        url: shareUrl
      });
      return;
    }

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    if (win) {
      win.open(twitterUrl, '_blank');
    }
  };

  const handleEdit = (dream) => {
    setEditingDream(dream);
    setShowForm(true);
  };

  const handleDelete = (dream) => {
    if (typeof window !== 'undefined' && !window.confirm('Are you sure you want to delete this dream?')) {
      return;
    }
    deleteDreamMutation.mutate(dream.id);
  };

  const handleAddMilestone = (dream) => {
    setSelectedDream(dream);
    setShowMilestoneForm(true);
  };

  const handleSaveMilestone = (milestoneData) => {
    createMilestoneMutation.mutate(milestoneData);
  };

  const handleDeleteMilestone = (milestone) => {
    const message =
      milestone.status === 'completed'
        ? 'This milestone is completed and you earned 1 star for it. Deleting it will deduct 1 star. Continue?'
        : 'Are you sure you want to delete this milestone?';
    if (typeof window !== 'undefined' && !window.confirm(message)) {
      return;
    }
    deleteMilestoneMutation.mutate(milestone);
  };

  const filteredDreams = dreams.filter((dream) => {
    if (filter === 'all') return true;
    return dream.status === filter;
  });

  const inProgressCount = dreams.filter((dream) => dream.status === 'in_progress').length;
  const completedCount = dreams.filter((dream) => dream.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="mx-auto max-w-6xl space-y-8 p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="mb-2 text-3xl font-bold text-slate-800 md:text-4xl">Your Dreams</h1>
          <p className="mb-6 text-slate-600">Turn your days into dreams, and your dreams into days</p>
          <Button
            onClick={() => {
              setEditingDream(null);
              setShowForm(true);
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Dream
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
          >
            <Target className="mx-auto mb-2 h-8 w-8 text-blue-500" />
            <div className="text-3xl font-bold text-slate-800">{inProgressCount}</div>
            <div className="text-sm text-slate-600">In Progress</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
          >
            <CheckCircle className="mx-auto mb-2 h-8 w-8 text-green-500" />
            <div className="text-3xl font-bold text-slate-800">{completedCount}</div>
            <div className="text-sm text-slate-600">Completed</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="col-span-2 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm md:col-span-1"
          >
            <div className="text-3xl font-bold text-slate-800">{dreams.length}</div>
            <div className="text-sm text-slate-600">Total Dreams</div>
          </motion.div>
        </div>

        <div className="flex justify-center">
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="bg-white">
              <TabsTrigger value="all">All ({dreams.length})</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress ({inProgressCount})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AnimatePresence>
            {filteredDreams.map((dream) => (
              <DreamCard
                key={dream.id}
                dream={dream}
                milestones={milestones}
                reflections={reflections}
                onToggleStatus={handleToggleStatus}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddMilestone={handleAddMilestone}
                onDeleteMilestone={handleDeleteMilestone}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredDreams.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
            <Target className="mx-auto mb-4 h-16 w-16 text-slate-400" />
            <h3 className="mb-2 text-xl text-slate-600">No dreams yet</h3>
            <p className="mb-6 text-slate-500">Start by adding your first dream or goal</p>
            <Button
              onClick={() => {
                setEditingDream(null);
                setShowForm(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="mr-2 h-5 w-5" /> Add Your First Dream
            </Button>
          </motion.div>
        )}

        <DreamForm
          open={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingDream(null);
          }}
          onSave={handleSave}
          dream={editingDream}
        />

        <MilestoneForm
          open={showMilestoneForm}
          onClose={() => {
            setShowMilestoneForm(false);
            setSelectedDream(null);
          }}
          onSave={handleSaveMilestone}
          dreamId={selectedDream?.id}
        />

        <CelebrationModal
          open={showCelebration}
          onClose={() => {
            setShowCelebration(false);
            setCelebrationDream(null);
          }}
          dream={celebrationDream}
          onShare={handleShare}
        />
      </div>
    </div>
  );
}
