import { useContext } from 'react';
import { ToastContext } from './ToastContext';

export const useToast = () => {
  const { open, close, closeAll } = useContext(ToastContext);

  return {
    open,
    close,
    closeAll,
  };
};
