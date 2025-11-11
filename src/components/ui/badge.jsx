import React from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Badge({ children, variant = 'default', className }) {
  const styles =
    variant === 'outline'
      ? 'inline-flex items-center rounded-full border border-slate-300 px-2 py-1 text-xs font-medium text-slate-600'
      : 'inline-flex items-center rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white';
  return <span className={cn(styles, className)}>{children}</span>;
}
