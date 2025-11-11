import React, { createContext, useContext } from 'react';

const TabsContext = createContext(null);

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Tabs({ value, onValueChange, children }) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsTrigger must be used within Tabs');
  }
  const isActive = context.value === value;
  return (
    <button
      type="button"
      onClick={() => context.onValueChange?.(value)}
      className={cn(
        'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-slate-800 shadow-inner'
          : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
      )}
    >
      {children}
    </button>
  );
}
