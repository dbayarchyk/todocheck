import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import innerText from 'react-innertext';

import { Theme } from '../../theme';
import { withTheme } from '../../themed-styled-components';
import { ToastContext, ToastConfig, ToastContextType } from './ToastContext';
import { ToastList } from './ToastList';

type BaseToastProviderProps = {
  theme: Theme;
};

const BaseToastProvider: React.FC<BaseToastProviderProps> = ({
  children,
  theme,
}) => {
  const [toasts, setToasts] = useState<ToastConfig[]>([]);

  const open: ToastContextType['open'] = toast => {
    const id = Date().toString();
    const newToasts = [
      ...toasts,
      {
        ...toast,
        id,
      },
    ];

    setToasts(newToasts);

    if (!toast.withoutAutoClose) {
      setTimeout(() => close(id), calculateToastDurationTime(toast));
    }

    return id;
  };

  const close: ToastContextType['close'] = id => {
    setToasts(toasts => toasts.filter(toast => toast.id !== id));
  };

  const closeAll: ToastContextType['closeAll'] = () => {
    setToasts([]);
  };

  const calculateToastDurationTime = (toast: {
    title?: React.ReactNode;
    content: React.ReactNode;
  }): number => {
    const durationByText =
      (innerText(toast.title) + innerText(toast.content)).length *
      theme.toast.durationTimePerCharacter;

    return durationByText < theme.toast.minDurationTime
      ? theme.toast.minDurationTime
      : durationByText;
  };

  return (
    <ToastContext.Provider
      value={{
        open,
        close,
        closeAll,
        toasts,
      }}
    >
      {children}
      {createPortal(<ToastList toasts={toasts} close={close} />, document.body)}
    </ToastContext.Provider>
  );
};

export const ToastProvider = withTheme(BaseToastProvider);
