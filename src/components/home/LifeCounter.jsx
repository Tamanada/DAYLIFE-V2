import React from 'react';
import { Hourglass } from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress.jsx';

const lifeExpectancyData = {
  US: { male: 76, female: 81 },
  CA: { male: 80, female: 84 },
  GB: { male: 79, female: 83 },
  FR: { male: 80, female: 86 },
  DE: { male: 79, female: 84 },
  ES: { male: 80, female: 86 },
  IT: { male: 81, female: 85 },
  JP: { male: 82, female: 88 },
  AU: { male: 81, female: 85 },
  CN: { male: 75, female: 80 },
  IN: { male: 70, female: 73 },
  BR: { male: 72, female: 79 },
  MX: { male: 73, female: 78 },
  ZA: { male: 62, female: 68 },
  RU: { male: 68, female: 78 },
  KR: { male: 80, female: 86 },
  AR: { male: 73, female: 80 },
  CL: { male: 77, female: 83 },
  CO: { male: 74, female: 80 },
  PE: { male: 74, female: 79 },
  VE: { male: 70, female: 78 },
  EG: { male: 70, female: 74 },
  NG: { male: 53, female: 55 },
  KE: { male: 64, female: 69 },
  ET: { male: 65, female: 69 },
  TZ: { male: 64, female: 68 },
  UG: { male: 61, female: 66 },
  GH: { male: 63, female: 66 },
  DZ: { male: 76, female: 78 },
  MA: { male: 75, female: 78 },
  TN: { male: 75, female: 78 },
  SA: { male: 74, female: 77 },
  AE: { male: 78, female: 80 },
  TR: { male: 76, female: 81 },
  IR: { male: 75, female: 77 },
  IQ: { male: 68, female: 72 },
  PK: { male: 66, female: 68 },
  BD: { male: 71, female: 74 },
  PH: { male: 67, female: 75 },
  VN: { male: 71, female: 80 },
  TH: { male: 74, female: 81 },
  MY: { male: 74, female: 78 },
  ID: { male: 69, female: 73 },
  SG: { male: 82, female: 86 },
  NZ: { male: 80, female: 84 },
  PL: { male: 74, female: 82 },
  RO: { male: 72, female: 79 },
  CZ: { male: 76, female: 82 },
  HU: { male: 73, female: 80 },
  GR: { male: 79, female: 84 },
  PT: { male: 78, female: 84 },
  BE: { male: 79, female: 84 },
  NL: { male: 80, female: 83 },
  SE: { male: 81, female: 85 },
  NO: { male: 81, female: 85 },
  DK: { male: 79, female: 83 },
  FI: { male: 79, female: 85 },
  CH: { male: 82, female: 86 },
  AT: { male: 79, female: 84 },
  IE: { male: 80, female: 84 },
  IL: { male: 81, female: 85 },
  UA: { male: 67, female: 77 },
  KZ: { male: 69, female: 78 },
  UZ: { male: 70, female: 75 },
  AF: { male: 62, female: 64 },
  SY: { male: 70, female: 76 },
  YE: { male: 64, female: 67 },
  JO: { male: 73, female: 76 },
  LB: { male: 77, female: 81 },
  KW: { male: 74, female: 76 },
  QA: { male: 78, female: 82 },
  BH: { male: 76, female: 78 },
  OM: { male: 76, female: 80 },
  OTHER: { male: 73, female: 78 }
};

const countryNames = {
  AF: 'Afghanistan',
  ZA: 'Afrique du Sud',
  AL: 'Albanie',
  DZ: 'Algérie',
  DE: 'Allemagne',
  AD: 'Andorre',
  AO: 'Angola',
  SA: 'Arabie Saoudite',
  AR: 'Argentine',
  AM: 'Arménie',
  AU: 'Australie',
  AT: 'Autriche',
  AZ: 'Azerbaïdjan',
  BS: 'Bahamas',
  BH: 'Bahreïn',
  BD: 'Bangladesh',
  BB: 'Barbade',
  BE: 'Belgique',
  BZ: 'Belize',
  BJ: 'Bénin',
  BR: 'Brésil',
  BG: 'Bulgarie',
  CA: 'Canada',
  CL: 'Chili',
  CN: 'Chine',
  CO: 'Colombie',
  KR: 'Corée du Sud',
  CR: 'Costa Rica',
  HR: 'Croatie',
  CU: 'Cuba',
  DK: 'Danemark',
  EG: 'Égypte',
  AE: 'Émirats Arabes Unis',
  EC: 'Équateur',
  ES: 'Espagne',
  EE: 'Estonie',
  US: 'États-Unis',
  ET: 'Éthiopie',
  FI: 'Finlande',
  FR: 'France',
  GE: 'Géorgie',
  GH: 'Ghana',
  GR: 'Grèce',
  GT: 'Guatemala',
  HT: 'Haïti',
  HN: 'Honduras',
  HU: 'Hongrie',
  IN: 'Inde',
  ID: 'Indonésie',
  IQ: 'Irak',
  IR: 'Iran',
  IE: 'Irlande',
  IS: 'Islande',
  IL: 'Israël',
  IT: 'Italie',
  JM: 'Jamaïque',
  JP: 'Japon',
  JO: 'Jordanie',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KW: 'Koweït',
  LV: 'Lettonie',
  LB: 'Liban',
  LY: 'Libye',
  LT: 'Lituanie',
  LU: 'Luxembourg',
  MK: 'Macédoine du Nord',
  MY: 'Malaisie',
  ML: 'Mali',
  MA: 'Maroc',
  MX: 'Mexique',
  MD: 'Moldavie',
  MC: 'Monaco',
  MN: 'Mongolie',
  ME: 'Monténégro',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibie',
  NP: 'Népal',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  NO: 'Norvège',
  NZ: 'Nouvelle-Zélande',
  OM: 'Oman',
  UG: 'Ouganda',
  UZ: 'Ouzbékistan',
  PK: 'Pakistan',
  PA: 'Panama',
  PY: 'Paraguay',
  NL: 'Pays-Bas',
  PE: 'Pérou',
  PH: 'Philippines',
  PL: 'Pologne',
  PT: 'Portugal',
  QA: 'Qatar',
  DO: 'République Dominicaine',
  CZ: 'République Tchèque',
  RO: 'Roumanie',
  GB: 'Royaume-Uni',
  RU: 'Russie',
  RW: 'Rwanda',
  SV: 'Salvador',
  SN: 'Sénégal',
  RS: 'Serbie',
  SG: 'Singapour',
  SK: 'Slovaquie',
  SI: 'Slovénie',
  SO: 'Somalie',
  SD: 'Soudan',
  LK: 'Sri Lanka',
  SE: 'Suède',
  CH: 'Suisse',
  SR: 'Suriname',
  SY: 'Syrie',
  TZ: 'Tanzanie',
  TD: 'Tchad',
  TH: 'Thaïlande',
  TG: 'Togo',
  TN: 'Tunisie',
  TR: 'Turquie',
  UA: 'Ukraine',
  UY: 'Uruguay',
  VE: 'Venezuela',
  VN: 'Vietnam',
  YE: 'Yémen',
  ZM: 'Zambie',
  ZW: 'Zimbabwe',
  OTHER: 'Moyenne mondiale'
};

function formatNumber(value) {
  return value.toLocaleString('fr-FR');
}

export default function LifeCounter({
  dateOfBirth,
  calculationMode = '30000_days',
  customLifeYears,
  sex,
  country
}) {
  if (!dateOfBirth) return null;

  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  const daysLived = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));

  let totalDays = 30000;
  let modeLabel = '30 000 jours';

  switch (calculationMode) {
    case 'by_demographics': {
      if (sex && country) {
        const expectancy = lifeExpectancyData[country] || lifeExpectancyData.OTHER;
        const years = expectancy[sex] || 78;
        totalDays = Math.floor(years * 365.25);
        modeLabel = `Réel (${sex === 'male' ? 'Homme' : 'Femme'}, ${
          countryNames[country] || country
        })`;
      }
      break;
    }
    case 'custom': {
      if (customLifeYears) {
        totalDays = Math.floor(customLifeYears * 365.25);
        modeLabel = 'Personnalisé';
      }
      break;
    }
    default:
      totalDays = 30000;
  }

  const daysRemaining = Math.max(totalDays - daysLived, 0);
  const percentLived = totalDays > 0 ? (daysLived / totalDays) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8 shadow-lg md:p-12"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-300 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-300 blur-3xl" />
      </div>
      <div className="relative z-10">
        <div className="mb-8 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 180 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          >
            <Hourglass className="h-12 w-12 text-amber-600" />
          </motion.div>
        </div>
        <div className="mb-8 text-center">
          <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <p className="mb-3 text-lg text-slate-700">Vous vivez le jour</p>
            <div className="mb-6 text-5xl font-bold text-slate-800 md:text-6xl lg:text-7xl">
              #{formatNumber(daysLived)}
            </div>
          </motion.div>
          <div className="mb-8 space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-medium text-slate-800"
            >
              <span className="font-semibold text-blue-600">{formatNumber(daysRemaining)}</span> jours devant vous
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-slate-600"
            >
              {percentLived.toFixed(1)}% de votre parcours accompli
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-sm italic text-slate-500"
            >
              Basé sur {modeLabel}
            </motion.p>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mx-auto w-full max-w-md"
          >
            <Progress value={percentLived} className="h-3 bg-white/50" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
