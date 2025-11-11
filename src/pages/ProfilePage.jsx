import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Star, Flame, Target, BookHeart, LogOut } from 'lucide-react';
import { daylifeClient } from '@/api/daylifeClient.js';
import { Button } from '@/components/ui/button.jsx';
import ProfilePhoto from '@/components/home/ProfilePhoto.jsx';
import ReferralSection from '@/components/profile/ReferralSection.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.jsx';
import { countries } from '@/data/countries.js';
import { formatDateKey } from '@/utils';

export default function ProfilePage() {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: () => daylifeClient.auth.me()
  });

  const { data: dreams = [] } = useQuery({
    queryKey: ['dreams'],
    queryFn: () => daylifeClient.entities.Dream.list()
  });

  const { data: reflections = [] } = useQuery({
    queryKey: ['reflections'],
    queryFn: () => daylifeClient.entities.Reflection.list()
  });

  const { data: allUsers = [] } = useQuery({
    queryKey: ['all-users'],
    queryFn: () => daylifeClient.entities.User.list(),
    enabled: !!user?.referral_code
  });

  const referralCount = user?.referral_code
    ? allUsers.filter((item) => item.referred_by === user.referral_code && item.date_of_birth).length
    : 0;
  const referralStars = referralCount * 5;

  const handleProfileUpdate = async (updates) => {
    await daylifeClient.auth.updateMe(updates);
    queryClient.invalidateQueries({ queryKey: ['me'] });
  };

  const handleLogout = () => {
    daylifeClient.auth.logout();
  };

  if (!user) return null;

  const completedDreams = dreams.filter((dream) => dream.status === 'completed').length;
  const activeDreams = dreams.filter((dream) => dream.status === 'in_progress').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="mx-auto max-w-4xl space-y-8 p-4 md:p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="mb-2 text-3xl font-bold text-slate-800 md:text-4xl">Profil</h1>
          <p className="text-slate-600">Votre parcours en un coup d'œil</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center gap-6">
            <ProfilePhoto photoUrl={user.profile_photo_url} onPhotoUpdate={(photoUrl) => handleProfileUpdate({ profile_photo_url: photoUrl })} />
            <div className="text-center">
              <h2 className="mb-1 text-2xl font-bold text-slate-800">{user.full_name}</h2>
              <p className="text-slate-600">{user.email}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 rounded-full border border-amber-300 bg-gradient-to-r from-amber-100 to-yellow-100 px-4 py-2">
                <Star className="h-5 w-5 fill-amber-600 text-amber-600" />
                <span className="text-xl font-bold text-amber-700">{user.total_stars || 0}</span>
                <span className="text-sm text-slate-700">étoiles</span>
              </div>
              {user.streak_days > 0 && (
                <div className="flex items-center gap-2 rounded-full border border-orange-300 bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2">
                  <Flame className="h-5 w-5 text-orange-600" />
                  <span className="text-xl font-bold text-orange-700">{user.streak_days}</span>
                  <span className="text-sm text-slate-700">jours de suite</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
          >
            <Target className="mx-auto mb-3 h-8 w-8 text-blue-500" />
            <div className="mb-1 text-3xl font-bold text-slate-800">{activeDreams}</div>
            <div className="text-sm text-slate-600">Rêves actifs</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
          >
            <Target className="mx-auto mb-3 h-8 w-8 text-green-500" />
            <div className="mb-1 text-3xl font-bold text-slate-800">{completedDreams}</div>
            <div className="text-sm text-slate-600">Rêves accomplis</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
          >
            <BookHeart className="mx-auto mb-3 h-8 w-8 text-purple-500" />
            <div className="mb-1 text-3xl font-bold text-slate-800">{reflections.length}</div>
            <div className="text-sm text-slate-600">Réflexions</div>
          </motion.div>
        </div>

        <ReferralSection referralCode={user.referral_code} referralCount={referralCount} referralStars={referralStars} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Paramètres</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-700">Date de naissance</Label>
              <Input
                type="date"
                value={user.date_of_birth || ''}
                onChange={(event) => handleProfileUpdate({ date_of_birth: event.target.value })}
                className="bg-slate-50"
                max={formatDateKey()}
              />
              <p className="text-xs text-slate-500">Vous pouvez modifier votre date de naissance si nécessaire</p>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700">Sexe</Label>
              <Select value={user.sex || 'male'} onValueChange={(value) => handleProfileUpdate({ sex: value })}>
                <SelectTrigger className="bg-slate-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Homme</SelectItem>
                  <SelectItem value="female">Femme</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">Utilisé pour calculer l'espérance de vie réelle</p>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700">Pays de naissance</Label>
              <Select value={user.country || 'OTHER'} onValueChange={(value) => handleProfileUpdate({ country: value })}>
                <SelectTrigger className="bg-slate-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {countries.map((item) => (
                    <SelectItem key={item.code} value={item.code}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-slate-500">
                Utilisé pour calculer l'espérance de vie selon les statistiques de votre pays
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700">Méthode de calcul de vie</Label>
              <Select
                value={user.life_calculation_mode || '30000_days'}
                onValueChange={(value) => handleProfileUpdate({ life_calculation_mode: value })}
              >
                <SelectTrigger className="bg-slate-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30000_days">30 000 jours (par défaut)</SelectItem>
                  <SelectItem value="by_demographics">
                    Réel (selon mon profil)
                    {user.sex && user.country
                      ? ` - ${user.sex === 'male' ? 'Homme' : 'Femme'}, ${
                          countries.find((item) => item.code === user.country)?.name || user.country
                        }`
                      : ''}
                  </SelectItem>
                </SelectContent>
              </Select>
              {user.life_calculation_mode === 'by_demographics' && (
                <p className="mt-2 text-xs text-slate-500">
                  Basé sur les données d'espérance de vie pour les {user.sex === 'male' ? 'hommes' : 'femmes'} en {
                    countries.find((item) => item.code === user.country)?.name || 'votre pays'
                  }
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700">Thème</Label>
              <Select value={user.theme_preference || 'light'} onValueChange={(value) => handleProfileUpdate({ theme_preference: value })}>
                <SelectTrigger className="bg-slate-50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Clair (Recommandé)</SelectItem>
                  <SelectItem value="dark">Sombre</SelectItem>
                  <SelectItem value="lunar">Lunaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-4">
              <Button onClick={handleLogout} variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700">
                <LogOut className="mr-2 h-4 w-4" /> Se déconnecter
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
