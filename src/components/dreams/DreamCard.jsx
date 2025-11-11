import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  Calendar,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  BookHeart
} from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Progress } from '@/components/ui/progress.jsx';

const colorMap = {
  blue: 'from-blue-400/30 to-blue-500/30 border-blue-400/50',
  purple: 'from-purple-400/30 to-purple-500/30 border-purple-400/50',
  amber: 'from-amber-400/30 to-amber-500/30 border-amber-400/50',
  rose: 'from-rose-400/30 to-rose-500/30 border-rose-400/50',
  emerald: 'from-emerald-400/30 to-emerald-500/30 border-emerald-400/50'
};

export default function DreamCard({
  dream,
  milestones = [],
  reflections = [],
  onToggleStatus,
  onEdit,
  onDelete,
  onAddMilestone,
  onDeleteMilestone
}) {
  const [showMilestones, setShowMilestones] = useState(false);
  const [showReflections, setShowReflections] = useState(false);
  const isCompleted = dream.status === 'completed';

  let deadlineProgress = 0;
  let daysRemaining = 0;
  if (dream.deadline) {
    const today = new Date();
    const deadlineDate = new Date(dream.deadline);
    const createdDate = new Date(dream.created_date || dream.created_at || today);
    const totalDays = Math.max(differenceInDays(deadlineDate, createdDate), 1);
    const daysPassed = differenceInDays(today, createdDate);
    deadlineProgress = Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
    daysRemaining = differenceInDays(deadlineDate, today);
  }

  const dreamMilestones = milestones.filter((milestone) => milestone.dream_id === dream.id);
  const completedMilestones = dreamMilestones.filter((milestone) => milestone.status === 'completed').length;
  const dreamReflections = reflections.filter((reflection) => reflection.dream_id === dream.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all bg-gradient-to-br ${
        colorMap[dream.color || 'blue']
      } p-6`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex flex-1 items-start gap-3">
          <button onClick={() => onToggleStatus?.(dream)} className="mt-1 transition-transform hover:scale-110">
            {isCompleted ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <Circle className="h-6 w-6 text-slate-600" />
            )}
          </button>
          <div className="flex-1">
            <h3
              className={`mb-2 text-xl font-semibold ${
                isCompleted ? 'line-through text-slate-500' : 'text-slate-800'
              }`}
            >
              {dream.title}
            </h3>
            {dream.description && <p className="mb-3 text-sm text-slate-700">{dream.description}</p>}
            <div className="mb-3 flex flex-wrap gap-2">
              {dream.deadline && (
                <Badge variant="outline" className="bg-white/50 text-xs">
                  <Calendar className="mr-1 h-3 w-3" />
                  {format(new Date(dream.deadline), 'MMM d, yyyy')}
                </Badge>
              )}
              {isCompleted && dream.completed_date && (
                <Badge className="bg-green-600 text-xs text-white">
                  Completed {format(new Date(dream.completed_date), 'MMM d')}
                </Badge>
              )}
              {dreamMilestones.length > 0 && (
                <Badge variant="outline" className="bg-white/50 text-xs">
                  {completedMilestones}/{dreamMilestones.length} milestones
                </Badge>
              )}
              {dreamReflections.length > 0 && (
                <Badge variant="outline" className="bg-white/50 text-xs">
                  <BookHeart className="mr-1 h-3 w-3" />
                  {dreamReflections.length} reflections
                </Badge>
              )}
            </div>
            {dream.deadline && !isCompleted && (
              <div className="mb-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-slate-600">Time to deadline</span>
                  <span className={`text-xs font-semibold ${daysRemaining < 7 ? 'text-red-600' : 'text-slate-700'}`}>
                    {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                  </span>
                </div>
                <Progress value={deadlineProgress} className="h-2 bg-white/50" />
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit?.(dream)}
            className="text-slate-600 hover:bg-white/30 hover:text-slate-800"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete?.(dream)}
            className="text-slate-600 hover:bg-white/30 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {dreamMilestones.length > 0 && (
        <div className="mb-3 border-t border-white/30 pt-3">
          <button
            onClick={() => setShowMilestones((prev) => !prev)}
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            {showMilestones ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            Milestones ({completedMilestones}/{dreamMilestones.length})
          </button>
          {showMilestones && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-2">
              {dreamMilestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className={`flex items-center gap-2 rounded-lg p-2 ${
                    milestone.status === 'completed' ? 'bg-green-100/50' : 'bg-white/30'
                  }`}
                >
                  {milestone.status === 'completed' ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <Circle className="h-4 w-4 text-slate-500" />
                  )}
                  <span
                    className={`flex-1 text-sm ${
                      milestone.status === 'completed' ? 'line-through text-slate-600' : 'text-slate-800'
                    }`}
                  >
                    {milestone.title}
                  </span>
                  {milestone.target_date && (
                    <span className="text-xs text-slate-600">
                      {format(new Date(milestone.target_date), 'MMM d')}
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteMilestone?.(milestone)}
                    className="h-6 w-6 text-slate-500 hover:bg-white/30 hover:text-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {dreamReflections.length > 0 && (
        <div className="mb-3 border-t border-white/30 pt-3">
          <button
            onClick={() => setShowReflections((prev) => !prev)}
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            {showReflections ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            <BookHeart className="h-4 w-4" />
            Linked Reflections ({dreamReflections.length})
          </button>
          {showReflections && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="space-y-2">
              {dreamReflections.map((reflection) => (
                <div key={reflection.id} className="rounded-lg bg-white/30 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-slate-600" />
                    <span className="text-xs font-medium text-slate-700">
                      {format(new Date(reflection.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  {reflection.learned && (
                    <p className="text-xs text-slate-700">
                      <span className="font-medium">Learned: </span>
                      {reflection.learned}
                    </p>
                  )}
                  {reflection.grateful && (
                    <p className="mt-1 text-xs text-slate-700">
                      <span className="font-medium">Grateful: </span>
                      {reflection.grateful}
                    </p>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onAddMilestone?.(dream)}
        className="w-full text-slate-700 hover:bg-white/30 hover:text-slate-900"
      >
        <Plus className="mr-1 h-4 w-4" /> Add Milestone
      </Button>
    </motion.div>
  );
}
