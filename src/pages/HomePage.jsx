import React, { useEffect, useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { daylifeClient } from '@/api/daylifeClient.js';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.jsx';
import LifeCounter from '@/components/home/LifeCounter.jsx';
import StarsDisplay from '@/components/home/StarsDisplay.jsx';
import QuoteDisplay from '@/components/home/QuoteDisplay.jsx';
import ProfilePhoto from '@/components/home/ProfilePhoto.jsx';
import HowToEarnStars from '@/components/home/HowToEarnStars.jsx';
import { countries } from '@/data/countries.js';
import { formatDateKey } from '@/utils';

function getWindow() {
  if (typeof window === 'undefined') return null;
  return window;
}

export default function HomePage() {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [sex, setSex] = useState('');
  const [country, setCountry] = useState('');
  const [calculationMode, setCalculationMode] = useState('30000_days');
  const [dailyQuote, setDailyQuote] = useState(null);
  const [dailySlogan, setDailySlogan] = useState(null);

  const { data: userData } = useQuery({
    queryKey: ['me'],
    queryFn: () => daylifeClient.auth.me()
  });

  const { data: quotes = [] } = useQuery({
    queryKey: ['quotes'],
    queryFn: () => daylifeClient.entities.Quote.list()
  });

  const { data: slogans = [] } = useQuery({
    queryKey: ['slogans'],
    queryFn: () => daylifeClient.entities.Slogan.list()
  });

  const { data: dreams = [] } = useQuery({
    queryKey: ['dreams'],
    queryFn: () => daylifeClient.entities.Dream.list('-created_date')
  });

  const updateUserMutation = useMutation({
    mutationFn: (data) => daylifeClient.auth.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    }
  });

  useEffect(() => {
    if (!userData) return;
    setUser(userData);

    (async () => {
      if (!userData.referral_code) {
        const referralCode = `DAY${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        await daylifeClient.auth.updateMe({ referral_code: referralCode });
        queryClient.invalidateQueries({ queryKey: ['me'] });
      }
    })();

    const win = getWindow();
    if (win) {
      const urlParams = new URLSearchParams(win.location.search);
      const refCode = urlParams.get('ref');
      if (refCode && !userData.referred_by && !userData.date_of_birth) {
        daylifeClient.auth.updateMe({ referred_by: refCode });
      }
    }

    const checkAndAwardLoginStar = async () => {
      const today = formatDateKey();
      const lastLogin = userData.last_login_date;
      if (lastLogin && lastLogin === today) return;

      let newStreak = userData.streak_days || 0;
      if (lastLogin) {
        const yesterday = format(new Date(Date.now() - 86400000), 'yyyy-MM-dd');
        newStreak = lastLogin === yesterday ? newStreak + 1 : 1;
      } else {
        newStreak = 1;
      }

      let starsToAdd = 1;
      if (newStreak === 7) {
        starsToAdd = 11;
      }

      await daylifeClient.auth.updateMe({
        last_login_date: today,
        streak_days: newStreak,
        total_stars: (userData.total_stars || 0) + starsToAdd
      });
      queryClient.invalidateQueries({ queryKey: ['me'] });
    };

    checkAndAwardLoginStar();
  }, [userData, queryClient]);

  useEffect(() => {
    if (quotes.length === 0 || slogans.length === 0) return;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const randomSlogan = slogans[Math.floor(Math.random() * slogans.length)];
    setDailyQuote(randomQuote?.text ?? null);
    setDailySlogan(randomSlogan?.text ?? null);
  }, [quotes, slogans]);

  const handleSetupComplete = () => {
    const updates = {
      date_of_birth: dateOfBirth,
      sex,
      country,
      life_calculation_mode: calculationMode
    };

    const win = getWindow();
    if (win) {
      const urlParams = new URLSearchParams(win.location.search);
      const refCode = urlParams.get('ref');
      if (refCode || userData?.referred_by) {
        const actualRefCode = refCode || userData.referred_by;
        updates.referred_by = actualRefCode;
        updates.total_stars = (userData?.total_stars || 0) + 5;
      }
    }

    updateUserMutation.mutate(updates);
  };

  const handlePhotoUpdate = async (photoUrl) => {
    await daylifeClient.auth.updateMe({ profile_photo_url: photoUrl });
    queryClient.invalidateQueries({ queryKey: ['me'] });
  };

  const completedDreams = useMemo(
    () => dreams.filter((dream) => dream.status === 'completed').length,
    [dreams]
  );
  const activeDreams = useMemo(
    () => dreams.filter((dream) => dream.status === 'in_progress').length,
    [dreams]
  );

  if (!user || !user.date_of_birth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-3 text-4xl font-bold text-slate-800">Bienvenue sur DAYLIFE</h1>
            <p className="text-slate-600">Chaque jour compte. Que ferez-vous du vôtre ?</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-slate-700">Date de naissance *</Label>
              <Input
                type="date"
                value={dateOfBirth}
                onChange={(event) => setDateOfBirth(event.target.value)}
                className="mt-2"
                max={formatDateKey()}
              />
            </div>
            <div>
              <Label className="text-slate-700">Sexe *</Label>
              <Select value={sex} onValueChange={setSex}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Sélectionnez votre sexe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Homme</SelectItem>
                  <SelectItem value="female">Femme</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-slate-700">Pays de naissance *</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Sélectionnez votre pays" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {countries.map((item) => (
                    <SelectItem key={item.code} value={item.code}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-slate-700">Méthode de calcul de vie</Label>
              <Select value={calculationMode} onValueChange={setCalculationMode}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30000_days">30 000 jours (par défaut)</SelectItem>
                  <SelectItem value="by_demographics">Réel (selon mon profil)</SelectItem>
                </SelectContent>
              </Select>
              {calculationMode === 'by_demographics' && (
                <p className="mt-2 text-xs text-slate-500">
                  Nous calculerons selon l'espérance de vie moyenne pour votre sexe et pays de naissance
                </p>
              )}
            </div>
            <Button
              onClick={handleSetupComplete}
              disabled={!dateOfBirth || !sex || !country || updateUserMutation.isPending}
              className="h-12 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg hover:from-blue-700 hover:to-purple-700"
            >
              Commencer mon voyage
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="mx-auto max-w-6xl space-y-8 p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6 pt-4"
        >
          <ProfilePhoto photoUrl={user.profile_photo_url} onPhotoUpdate={handlePhotoUpdate} />
          <div className="text-center">
            <h1 className="mb-3 text-3xl font-bold text-slate-800 md:text-4xl">{user.full_name || 'Welcome'}</h1>
            <StarsDisplay totalStars={user.total_stars} streakDays={user.streak_days} />
          </div>
          <div className="flex gap-4">
            <div className="min-w-[100px] rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-blue-600">{activeDreams}</div>
              <div className="mt-1 text-xs text-slate-600">Active Dreams</div>
            </div>
            <div className="min-w-[100px] rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <div className="text-3xl font-bold text-green-600">{completedDreams}</div>
              <div className="mt-1 text-xs text-slate-600">Completed</div>
            </div>
          </div>
        </motion.div>

        <LifeCounter
          dateOfBirth={user.date_of_birth}
          calculationMode={user.life_calculation_mode}
          customLifeYears={user.custom_life_years}
          sex={user.sex}
          country={user.country}
        />

        <QuoteDisplay quote={dailyQuote} slogan={dailySlogan} />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="py-8 text-center">
          <p className="text-2xl font-light text-slate-700">Today is a blank page — write something that matters.</p>
        </motion.div>

        <HowToEarnStars />
      </div>
    </div>
  );
}
