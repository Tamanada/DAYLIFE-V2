import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';

function getWindow() {
  if (typeof window === 'undefined') return null;
  return window;
}

export default function ReferralSection({ referralCode, referralCount = 0, referralStars = 0 }) {
  const [copied, setCopied] = useState(false);
  const referralLink = useMemo(() => {
    const win = getWindow();
    const origin = win?.location?.origin ?? 'https://daylife.app';
    return `${origin}?ref=${referralCode ?? ''}`;
  }, [referralCode]);

  const handleCopy = async () => {
    const win = getWindow();
    try {
      if (win?.navigator?.clipboard) {
        await win.navigator.clipboard.writeText(referralLink);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.warn('Clipboard unavailable', error);
    }
  };

  const handleShare = async () => {
    const win = getWindow();
    if (!win) {
      await handleCopy();
      return;
    }

    if (win.navigator?.share) {
      try {
        await win.navigator.share({
          title: 'Join DAYLIFE',
          text: 'Every day counts. Join me on DAYLIFE and start making your days matter!',
          url: referralLink
        });
        return;
      } catch (error) {
        console.debug('Share cancelled', error);
      }
    }

    await handleCopy();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100 p-6 shadow-sm"
    >
      <div className="mb-4 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Share2 className="h-6 w-6 text-purple-600" />
          <h3 className="text-xl font-bold text-slate-800">Share & Earn Stars</h3>
        </div>
        <p className="text-sm text-slate-600">
          Invite friends and earn <span className="font-bold text-purple-600">+5 ⭐</span> for each friend who joins!
        </p>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/70 p-4">
          <div className="flex flex-col items-center gap-1">
            <Users className="mb-1 h-5 w-5 text-purple-600" />
            <div className="text-3xl font-bold text-purple-600">{referralCount}</div>
            <div className="text-xs text-slate-600">Friends Joined</div>
          </div>
        </div>
        <div className="rounded-xl bg-white/70 p-4">
          <div className="flex flex-col items-center gap-1">
            <Star className="mb-1 h-5 w-5 fill-amber-600 text-amber-600" />
            <div className="text-3xl font-bold text-amber-600">{referralStars}</div>
            <div className="text-xs text-slate-600">Stars Earned</div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Your Referral Link</label>
          <div className="flex gap-2">
            <Input value={referralLink} readOnly className="bg-white/70 text-sm" />
            <Button onClick={handleCopy} variant="outline" className="flex-shrink-0">
              {copied ? (
                <>
                  <Check className="mr-1 h-4 w-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-4 w-4" /> Copy
                </>
              )}
            </Button>
          </div>
        </div>
        <Button
          onClick={handleShare}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Share2 className="mr-2 h-4 w-4" /> Share with Friends
        </Button>
      </div>
      <div className="mt-4 text-center text-xs text-slate-600">
        When someone joins using your link and completes setup, you both earn bonus stars!
      </div>
    </motion.div>
  );
}
