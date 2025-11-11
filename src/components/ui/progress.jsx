import React from 'react';

export function Progress({ value = 0, className }) {
  const percentage = Math.max(0, Math.min(100, value));
  return (
    <div
      className={['h-2 w-full overflow-hidden rounded-full bg-slate-200', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
