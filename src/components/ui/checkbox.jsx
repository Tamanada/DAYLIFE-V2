import React from 'react';

export const Checkbox = React.forwardRef(function Checkbox(
  { className, checked, onCheckedChange, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type="checkbox"
      className={[
        'h-4 w-4 rounded border border-slate-300 text-blue-600 focus:ring-blue-500',
        className
      ]
        .filter(Boolean)
        .join(' ')}
      checked={checked}
      onChange={(event) => onCheckedChange?.(event.target.checked)}
      {...props}
    />
  );
});
