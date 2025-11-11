import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, Heart, TrendingUp, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button.jsx';

export default function ReflectionCard({ reflection, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2 text-slate-600">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{format(new Date(reflection.date), 'MMMM d, yyyy')}</span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit?.(reflection)}
            className="h-8 w-8 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete?.(reflection)}
            className="h-8 w-8 text-slate-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {reflection.learned && (
          <div>
            <div className="mb-2 flex items-center gap-2 text-blue-600">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">What I Learned</span>
            </div>
            <p className="pl-6 text-sm text-slate-700">{reflection.learned}</p>
          </div>
        )}
        {reflection.grateful && (
          <div>
            <div className="mb-2 flex items-center gap-2 text-rose-600">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">Grateful For</span>
            </div>
            <p className="pl-6 text-sm text-slate-700">{reflection.grateful}</p>
          </div>
        )}
        {reflection.improve && (
          <div>
            <div className="mb-2 flex items-center gap-2 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Want to Improve</span>
            </div>
            <p className="pl-6 text-sm text-slate-700">{reflection.improve}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
