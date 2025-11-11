import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function QuoteDisplay({ quote, slogan }) {
  if (!quote && !slogan) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg md:p-10"
    >
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-purple-100 opacity-50 blur-3xl" />
      <div className="relative z-10 text-center">
        <div className="mb-6 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <span className="text-sm font-medium uppercase tracking-wider text-purple-600">Today's Inspiration</span>
        </div>
        {quote && (
          <blockquote className="mb-6 text-2xl font-light italic leading-relaxed text-slate-800 md:text-3xl">
            “{quote}”
          </blockquote>
        )}
        {slogan && <p className="text-lg font-medium text-slate-600">{slogan}</p>}
      </div>
    </motion.div>
  );
}
