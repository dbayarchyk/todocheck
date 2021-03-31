import React from 'react';

import { styled } from '../../themed-styled-components';
import { stack, inset } from '../../mixings';
import { Toast } from './Toast';
import { ToastConfig } from './ToastContext';

export const ToastListContainer = styled.aside`
  ${stack('medium')}
  ${inset('medium')}

  position: fixed;
  top: 0;
  right: 0;
`;

type ToastListProps = {
  toasts: ToastConfig[];
  close: (id: string) => void;
};

export const ToastList: React.FC<ToastListProps> = ({ toasts, close }) => {
  return (
    <ToastListContainer>
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClick={() => close(toast.id)} />
      ))}
    </ToastListContainer>
  );
};
