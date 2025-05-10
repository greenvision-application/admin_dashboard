// ToastContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { ToastContextProps, ToastProps, ToastType } from '../propTypes';

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (message: string, type: ToastType, duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prevToasts => [...prevToasts, { id, message, type, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Toast Icons based on type
const ToastIcon = ({ type }: { type: ToastType }) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'error':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case 'info':
      return <Info className="h-5 w-5 text-blue-500" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    default:
      return null;
  }
};

// Individual Toast Component
const Toast = ({ toast }: { toast: ToastProps }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, removeToast]);

  // Tailwind classes based on toast type
  const getToastClasses = () => {
    const baseClasses =
      'flex items-center justify-between p-4 rounded-md shadow-md mb-3 w-full max-w-sm';
    switch (toast.type) {
      case 'success':
        return `${baseClasses} bg-green-50 border-l-4 border-green-500`;
      case 'error':
        return `${baseClasses} bg-red-50 border-l-4 border-red-500`;
      case 'info':
        return `${baseClasses} bg-blue-50 border-l-4 border-blue-500`;
      case 'warning':
        return `${baseClasses} bg-yellow-50 border-l-4 border-yellow-500`;
      default:
        return baseClasses;
    }
  };

  return (
    <div className={getToastClasses()}>
      <div className="flex items-center">
        <div className="mr-3">
          <ToastIcon type={toast.type} />
        </div>
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
// Toast Container Component
const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
