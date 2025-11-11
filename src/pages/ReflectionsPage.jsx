import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, BookHeart } from 'lucide-react';
import { daylifeClient } from '@/api/daylifeClient.js';
import { Button } from '@/components/ui/button.jsx';
import ReflectionCard from '@/components/reflections/ReflectionCard.jsx';
import ReflectionForm from '@/components/reflections/ReflectionForm.jsx';

export default function ReflectionsPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingReflection, setEditingReflection] = useState(null);

  const { data: reflections = [] } = useQuery({
    queryKey: ['reflections'],
    queryFn: () => daylifeClient.entities.Reflection.list('-date')
  });

  const { data: dreams = [] } = useQuery({
    queryKey: ['dreams'],
    queryFn: () => daylifeClient.entities.Dream.list('-created_date')
  });

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => daylifeClient.auth.me()
  });

  const createReflectionMutation = useMutation({
    mutationFn: async (reflectionData) => {
      const result = await daylifeClient.entities.Reflection.create(reflectionData);
      await daylifeClient.auth.updateMe({ total_stars: (user?.total_stars || 0) + 1 });
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reflections'] });
      queryClient.invalidateQueries({ queryKey: ['me'] });
      setShowForm(false);
      setEditingReflection(null);
    }
  });

  const updateReflectionMutation = useMutation({
    mutationFn: ({ id, data }) => daylifeClient.entities.Reflection.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reflections'] });
      setShowForm(false);
      setEditingReflection(null);
    }
  });

  const deleteReflectionMutation = useMutation({
    mutationFn: (id) => daylifeClient.entities.Reflection.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reflections'] });
    }
  });

  const handleSave = (reflectionData) => {
    if (editingReflection) {
      updateReflectionMutation.mutate({ id: editingReflection.id, data: reflectionData });
    } else {
      createReflectionMutation.mutate(reflectionData);
    }
  };

  const handleEdit = (reflection) => {
    setEditingReflection(reflection);
    setShowForm(true);
  };

  const handleDelete = (reflection) => {
    if (typeof window !== 'undefined' && !window.confirm('Are you sure you want to delete this reflection?')) {
      return;
    }
    deleteReflectionMutation.mutate(reflection.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="mx-auto max-w-4xl space-y-8 p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="mb-2 text-3xl font-bold text-slate-800 md:text-4xl">Daily Reflections</h1>
          <p className="mb-6 text-slate-600">A space to learn, grow, and be grateful</p>
          <Button
            onClick={() => {
              setEditingReflection(null);
              setShowForm(true);
            }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Reflection
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
        >
          <div className="mb-2 flex items-center justify-center gap-3">
            <BookHeart className="h-8 w-8 text-purple-500" />
            <div>
              <div className="text-3xl font-bold text-slate-800">{reflections.length}</div>
              <div className="text-sm text-slate-600">Total Reflections</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500">Each reflection brings you closer to self-understanding</p>
        </motion.div>

        <div className="space-y-4">
          <AnimatePresence>
            {reflections.map((reflection) => (
              <ReflectionCard key={reflection.id} reflection={reflection} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </AnimatePresence>
        </div>

        {reflections.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
            <BookHeart className="mx-auto mb-4 h-16 w-16 text-slate-400" />
            <h3 className="mb-2 text-xl text-slate-600">No reflections yet</h3>
            <p className="mb-6 text-slate-500">Start your daily reflection practice</p>
            <Button
              onClick={() => {
                setEditingReflection(null);
                setShowForm(true);
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="mr-2 h-5 w-5" /> Add Your First Reflection
            </Button>
          </motion.div>
        )}

        <ReflectionForm
          open={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingReflection(null);
          }}
          onSave={handleSave}
          reflection={editingReflection}
          dreams={dreams}
        />
      </div>
    </div>
  );
}
