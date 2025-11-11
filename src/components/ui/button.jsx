import React from 'react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const baseClass = 'inline-flex items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:pointer-events-none';

const variants = {
  default: 'bg-blue-600 text-white hover:bg-blue-700',
  outline: 'bg-transparent border-slate-300 text-slate-700 hover:bg-slate-100',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100'
};

const sizes = {
  default: 'h-10',
  sm: 'h-8 text-xs px-2',
  lg: 'h-12 text-base px-4',
  icon: 'h-10 w-10 p-0',
  none: ''
};

export const Button = React.forwardRef(function Button(
  { className, variant = 'default', size = 'default', type = 'button', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(baseClass, variants[variant] ?? variants.default, sizes[size] ?? sizes.default, className)}
      {...props}
    />
  );
});
