import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Target, BookHeart, User, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';

const navItems = [
  { name: 'Home', path: 'Home', icon: Home },
  { name: 'Dreams', path: 'Dreams', icon: Target },
  { name: 'Reflections', path: 'Reflections', icon: BookHeart },
  { name: 'Profile', path: 'Profile', icon: User }
];

export default function Layout({ children }) {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link to={createPageUrl('Home')} className="group flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-md"
            >
              <Sparkles className="h-5 w-5 text-white" />
            </motion.div>
            <div>
              <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                DAYLIFE
              </h1>
              <p className="text-xs text-slate-500">30,000 Days</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === createPageUrl(item.path);
              return (
                <Link
                  key={item.path}
                  to={createPageUrl(item.path)}
                  className={[
                    'flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-all',
                    isActive
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 font-medium text-slate-800'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="pb-20 md:pb-8">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-4 gap-1 border-t border-slate-200 bg-white/90 px-2 py-2 shadow-lg backdrop-blur-lg md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === createPageUrl(item.path);
          return (
            <Link
              key={item.path}
              to={createPageUrl(item.path)}
              className={[
                'flex flex-col items-center gap-1 rounded-xl py-2 text-xs font-medium transition-all',
                isActive
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-slate-800'
                  : 'text-slate-600'
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
