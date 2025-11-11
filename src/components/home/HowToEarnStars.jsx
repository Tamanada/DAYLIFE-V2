import React from 'react';
import { motion } from 'framer-motion';
import { Star, Target, BookHeart, CheckCircle, Flame } from 'lucide-react';

const cards = [
  {
    icon: Star,
    title: 'Daily login',
    reward: '+1 ⭐',
    className: 'bg-white/60',
    iconWrapper: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    icon: Target,
    title: 'Add a dream or goal',
    reward: '+2 ⭐',
    className: 'bg-white/60',
    iconWrapper: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    icon: CheckCircle,
    title: 'Complete a dream',
    reward: '+3 ⭐',
    className: 'bg-white/60',
    iconWrapper: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    icon: BookHeart,
    title: 'Add a reflection',
    reward: '+1 ⭐',
    className: 'bg-white/60',
    iconWrapper: 'bg-rose-100',
    iconColor: 'text-rose-600'
  },
  {
    icon: CheckCircle,
    title: 'Complete a milestone',
    reward: '+1 ⭐',
    className: 'bg-white/60',
    iconWrapper: 'bg-emerald-100',
    iconColor: 'text-emerald-600'
  },
  {
    icon: Flame,
    title: '7-day streak bonus',
    reward: '+10 ⭐',
    className: 'bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300',
    iconWrapper: 'bg-orange-200',
    iconColor: 'text-orange-600'
  }
];

export default function HowToEarnStars() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4 }}
      className="rounded-3xl border border-amber-200/50 bg-gradient-to-br from-amber-50 to-yellow-50 p-8 shadow-lg"
    >
      <div className="mb-6 text-center">
        <div className="mb-3 flex items-center justify-center gap-2">
          <Star className="h-6 w-6 fill-amber-500 text-amber-500" />
          <h3 className="text-2xl font-bold text-slate-800">How to Earn Stars</h3>
        </div>
        <p className="text-slate-600">Every action counts towards your journey</p>
      </div>
      <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
        {cards.map(({ icon: Icon, title, reward, className, iconWrapper, iconColor }) => (
          <div
            key={title}
            className={`flex items-center gap-3 rounded-xl border border-transparent p-4 ${className}`}
          >
            <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${iconWrapper}`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <div className="flex-1">
              <span className="font-medium text-slate-700">{title}</span>
            </div>
            <span className="text-lg font-bold text-amber-600">{reward}</span>
          </div>
        ))}
        <div className="md:col-span-2 flex items-center gap-3 rounded-xl border-2 border-purple-300 bg-gradient-to-r from-purple-100 to-pink-100 p-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-200">
            <Star className="h-5 w-5 fill-purple-600 text-purple-600" />
          </div>
          <div className="flex-1">
            <span className="font-bold text-slate-800">Invite a friend (referral)</span>
          </div>
          <span className="text-xl font-bold text-purple-600">+5 ⭐</span>
        </div>
      </div>
    </motion.div>
  );
}
