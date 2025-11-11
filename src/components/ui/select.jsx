import React, { createContext, useContext, useState, useMemo } from 'react';

const SelectContext = createContext(null);

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Select({ value, defaultValue = '', onValueChange, children }) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  const currentValue = value !== undefined ? value : internalValue;

  const contextValue = useMemo(
    () => ({
      value: currentValue,
      setValue: (nextValue) => {
        if (value === undefined) {
          setInternalValue(nextValue);
        }
        onValueChange?.(nextValue);
        setOpen(false);
      },
      open,
      setOpen
    }),
    [currentValue, open, onValueChange, value]
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children, className }) {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('SelectTrigger must be used within a Select');
  }
  const { open, setOpen } = context;
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        'flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200',
        className
      )}
    >
      {children}
      <span className="ml-2 text-xs text-slate-500">▾</span>
    </button>
  );
}

export function SelectValue({ placeholder }) {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('SelectValue must be used within a Select');
  }
  const { value } = context;
  return <span>{value ? value : placeholder}</span>;
}

export function SelectContent({ children, className }) {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('SelectContent must be used within a Select');
  }
  if (!context.open) return null;
  return (
    <div
      className={cn(
        'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg',
        className
      )}
    >
      {children}
    </div>
  );
}

export function SelectItem({ children, value }) {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('SelectItem must be used within a Select');
  }
  const isActive = context.value === value;
  return (
    <div
      role="option"
      tabIndex={0}
      onClick={() => context.setValue(value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          context.setValue(value);
        }
      }}
      className={cn(
        'cursor-pointer px-3 py-2 text-sm text-slate-700 hover:bg-blue-50',
        isActive && 'bg-blue-100 font-medium'
      )}
    >
      {children}
    </div>
  );
}
