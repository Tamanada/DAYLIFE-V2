import React, { createContext, useContext } from 'react';
import { createPortal } from 'react-dom';

const DialogContext = createContext(null);

function canUseDom() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export function Dialog({ open, onOpenChange, children }) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ asChild = false, children }) {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('DialogTrigger must be used within a Dialog');
  }
  const handleClick = (event) => {
    if (React.isValidElement(children) && typeof children.props.onClick === 'function') {
      children.props.onClick(event);
    }
    context.onOpenChange?.(!context.open);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: handleClick });
  }

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

export function DialogContent({ children, className }) {
  const context = useContext(DialogContext);
  if (!context?.open || !canUseDom()) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className={[
          'max-h-full w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl',
          className
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export function DialogHeader({ children, className }) {
  return (
    <div className={['mb-4 space-y-2', className].filter(Boolean).join(' ')}>{children}</div>
  );
}

export function DialogTitle({ children, className }) {
  return (
    <h2 className={['text-lg font-semibold text-slate-800', className].filter(Boolean).join(' ')}>
      {children}
    </h2>
  );
}
