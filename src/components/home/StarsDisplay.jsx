import React from 'react';
import { Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StarsDisplay({ totalStars = 0, streakDays = 0 }) {
  return (
    <div className="flex items-center justify-center gap-6">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 rounded-full border border-amber-300 bg-gradient-to-r from-amber-100 to-yellow-100 px-6 py-3"
      >
        <Star className="h-5 w-5 fill-amber-600 text-amber-600" />
        <span className="text-2xl font-bold text-amber-700">{totalStars}</span>
        <span className="text-sm text-slate-700">stars</span>
      </motion.div>
      {streakDays > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 rounded-full border border-orange-300 bg-gradient-to-r from-orange-100 to-red-100 px-6 py-3"
        >
          <Flame className="h-5 w-5 text-orange-600" />
          <span className="text-2xl font-bold text-orange-700">{streakDays}</span>
          <span className="text-sm text-slate-700">day streak</span>
        </motion.div>
      )}
    </div>
  );
}
