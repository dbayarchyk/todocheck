import React from 'react';
import { createPortal } from 'react-dom';

import { DialogState } from './useDialogState';
import { useAutoFocus } from '../../hooks';
import { styled } from '../../themed-styled-components';

export * from './useDialogState';

export const DialogContainer = styled.div`
  top: 0;
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DialogLayout = styled.div`
  background: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: ${props => props.theme.borders.radius.medium};
`;

const ESC_KEY_CODE = 27;

export interface DialogProps {
  visible: DialogState['visible'];
  close: DialogState['close'];
  children?: React.ReactNode;
  hideOnClickOutside?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  visible,
  children,
  close,
  hideOnClickOutside = true,
}) => {
  const dialogLayoutRef = useAutoFocus<HTMLDivElement>(visible);

  if (!visible) {
    return null;
  }

  return createPortal(
    <DialogContainer
      onClick={() => {
        if (!hideOnClickOutside) {
          return;
        }

        close();
      }}
      onKeyDown={(event: React.KeyboardEvent) =>
        event.keyCode === ESC_KEY_CODE && close()
      }
      role="dialog"
    >
      <DialogLayout
        tabIndex={-1}
        ref={dialogLayoutRef}
        onClick={event => event.stopPropagation()}
      >
        {children}
      </DialogLayout>
    </DialogContainer>,
    document.body,
  );
};
