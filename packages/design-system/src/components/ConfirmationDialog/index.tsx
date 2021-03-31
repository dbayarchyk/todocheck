import React from 'react';

import { Dialog, DialogProps } from '../Dialog';
import { PrimaryButton } from '../PrimaryButton';
import { BasicButton } from '../BasicButton';
import { HeadlineText } from '../HeadlineText';
import { RegularText } from '../RegularText';
import { styled } from '../../themed-styled-components';
import { stack, inline, inset } from '../../mixings';

const Header = styled.header``;

const Description = styled.div``;

const Footer = styled.footer`
  ${inline('small')}

  display: flex;
  align-content: center;
  justify-content: flex-end;
`;

const StyledLayout = styled.article`
  ${inset('medium')}
  ${stack('medium')}

  height: 100%;
  width: 100%;
`;

type ConfirmationDialogLayoutComponent = typeof StyledLayout & {
  Header: typeof Header;
  Description: typeof Description;
  Footer: typeof Footer;
};

export const ConfirmationDialogLayout: ConfirmationDialogLayoutComponent = StyledLayout as ConfirmationDialogLayoutComponent;

ConfirmationDialogLayout.Header = Header;
ConfirmationDialogLayout.Description = Description;
ConfirmationDialogLayout.Footer = Footer;

export interface ConfirmationDialogProps extends DialogProps {
  header: React.ReactNode;
  description?: React.ReactNode;
  cancelButtonTitle?: React.ReactNode;
  confirmButtonTitle?: React.ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  visible,
  close,
  hideOnClickOutside,
  header,
  description,
  cancelButtonTitle = 'Cancel',
  confirmButtonTitle = 'Confirm',
  onConfirm,
  onCancel,
}) => {
  const closeWithConfirmation = (isConfirmed: boolean) => {
    close();

    if (isConfirmed) {
      onConfirm();
    } else if (onCancel) {
      onCancel();
    }
  };

  return (
    <Dialog
      visible={visible}
      close={() => closeWithConfirmation(false)}
      hideOnClickOutside={hideOnClickOutside}
    >
      <ConfirmationDialogLayout>
        <ConfirmationDialogLayout.Header>
          <HeadlineText level={1}>{header}</HeadlineText>
        </ConfirmationDialogLayout.Header>

        {description && (
          <ConfirmationDialogLayout.Description>
            <RegularText>{description}</RegularText>
          </ConfirmationDialogLayout.Description>
        )}

        <ConfirmationDialogLayout.Footer>
          <BasicButton
            type="button"
            onClick={() => closeWithConfirmation(false)}
          >
            {cancelButtonTitle}
          </BasicButton>

          <PrimaryButton
            type="button"
            color="primary"
            onClick={() => closeWithConfirmation(true)}
          >
            {confirmButtonTitle}
          </PrimaryButton>
        </ConfirmationDialogLayout.Footer>
      </ConfirmationDialogLayout>
    </Dialog>
  );
};
