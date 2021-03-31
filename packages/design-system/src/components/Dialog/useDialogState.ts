import { useState, useRef } from 'react';

export interface DialogState {
  visible: boolean;
  toggle: {
    ref: React.MutableRefObject<any>;
    ['aria-haspopup']: true;
    ['aria-expanded']: boolean;
    onClick: () => void;
  };
  open: () => void;
  close: () => void;
}

export function useDialogState(isDefaultVisible = false): DialogState {
  const [visible, setVisible] = useState(isDefaultVisible);
  const ref = useRef<HTMLElement>();

  const open = () => setVisible(true);
  const close = () => {
    setVisible(false);

    if (ref.current && ref.current.focus) {
      ref.current.focus();
    }
  };

  return {
    visible,
    open,
    close,
    toggle: {
      ref,
      ['aria-haspopup']: true,
      ['aria-expanded']: visible,
      onClick: open,
    },
  };
}
