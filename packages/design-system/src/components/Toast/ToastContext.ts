import React, { createContext } from 'react';

export type ToastConfig = {
  id: string;
  type: 'success' | 'danger';
  title?: React.ReactNode;
  content: React.ReactNode;
  withoutAutoClose?: boolean;
};

export type ToastContextType = {
  toasts: ToastConfig[];
  open: (config: {
    type: 'success' | 'danger';
    title?: React.ReactNode;
    content: React.ReactNode;
    withoutAutoClose?: boolean;
  }) => string;
  close: (id: string) => void;
  closeAll: () => void;
};

export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  open: () => '',
  close: () => {},
  closeAll: () => {},
});
