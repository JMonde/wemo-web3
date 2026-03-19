// src/components/ui/Toast.tsx
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
  id?: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
  action?: React.ReactNode;
}

const toastVariants = {
  success: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
  error: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
  info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
};

const toastIcons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

export function Toast({
  message,
  type = 'info',
  duration = 5000,
  onClose,
  action,
}: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg',
        'max-w-md w-full',
        toastVariants[type]
      )}
    >
      <span className="text-lg font-bold">{toastIcons[type]}</span>
      <p className="flex-1 text-sm font-medium">{message}</p>
      {action && <div className="flex-shrink-0">{action}</div>}
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:opacity-70 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </motion.div>
  );
}

// Toast Container and Manager
interface ToastMessage extends Omit<ToastProps, 'id'> {
  id: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Global toast state
const toastContext = React.createContext<{
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
} | null>(null);

// Toaster component to be placed in layout
export function Toaster() {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const addToast = React.useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <toastContext.Provider value={{ toasts, addToast, removeToast }}>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </toastContext.Provider>
  );
}

// Hook for managing toasts
export function useToast() {
  const context = React.useContext(toastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a Toaster provider');
  }

  const { addToast, removeToast } = context;

  const success = React.useCallback((message: string) => {
    return addToast({ message, type: 'success' });
  }, [addToast]);

  const error = React.useCallback((message: string) => {
    return addToast({ message, type: 'error' });
  }, [addToast]);

  const warning = React.useCallback((message: string) => {
    return addToast({ message, type: 'warning' });
  }, [addToast]);

  const info = React.useCallback((message: string) => {
    return addToast({ message, type: 'info' });
  }, [addToast]);

  return {
    success,
    error,
    warning,
    info,
  };
}

export default Toast;
