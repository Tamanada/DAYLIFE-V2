import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Star, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Dialog, DialogContent } from '@/components/ui/dialog.jsx';

export default function CelebrationModal({ open, onClose, dream, onShare }) {
  useEffect(() => {
    if (!open) return;

    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, [open]);

  if (!dream) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden border-0 p-0 sm:max-w-lg">
        <div className="relative bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100 p-8">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(16)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute"
                initial={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  scale: 0,
                  rotate: 0
                }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: 360,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.2, ease: 'easeInOut' }}
              >
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              </motion.div>
            ))}
          </div>
          <div className="relative z-10 space-y-6 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl">
                <Trophy className="h-12 w-12 text-white" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="mb-2 text-4xl font-bold text-slate-800">🎉 Dream Achieved! 🎉</h2>
              <p className="mb-4 text-lg text-slate-600">You completed:</p>
              <p className="text-2xl font-bold text-slate-800">“{dream.title}”</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="rounded-2xl border-2 border-amber-300 bg-white/60 p-6"
            >
              <div className="mb-3 flex items-center justify-center gap-3">
                <Sparkles className="h-6 w-6 text-amber-600" />
                <span className="text-3xl font-bold text-amber-600">+3 ⭐</span>
              </div>
              <p className="font-medium text-slate-700">Amazing! You earned 3 stars for completing this dream!</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="space-y-3 pt-4"
            >
              <Button
                onClick={onShare}
                className="flex h-12 w-full items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-lg hover:from-blue-700 hover:to-purple-700"
              >
                <Share2 className="mr-2 h-5 w-5" /> Share Your Success
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="h-12 w-full bg-white/60 text-lg hover:bg-white/80"
              >
                Continue
              </Button>
            </motion.div>
            <p className="text-sm italic text-slate-600">
              "Every dream achieved is a step closer to the life you envision."
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
