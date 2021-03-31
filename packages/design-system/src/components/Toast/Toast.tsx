import React from 'react';

import { inset, stack } from '../../mixings';
import { styled, css } from '../../themed-styled-components';
import { ToastConfig } from './ToastContext';
import { RegularText } from '../RegularText';
import { HeadlineText } from '../HeadlineText';
import { CloseIcon } from '../Icons/CloseIcon';

type ToastContainerProps = {
  type: ToastConfig['type'];
};

export const ToastContainer = styled.article<ToastContainerProps>`
  ${inset('small')}
  ${stack('small')}

  border-radius: ${props => props.theme.borders.radius.medium};
  width: 250px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
  background-color: ${props => {
    switch (props.type) {
      case 'success':
        return props.theme.color.success.light;
      case 'danger':
        return props.theme.color.danger.light;
      default:
        return props.theme.color.primary.light;
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'success':
        return props.theme.color.success.lightContrast;
      case 'danger':
        return props.theme.color.danger.lightContrast;
      default:
        return props.theme.color.primary.lightContrast;
    }
  }};

  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
`;

export const ToastHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

type ToastProps = ToastConfig & {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  content,
  className,
  onClick,
}) => {
  return (
    <ToastContainer
      className={className}
      type={type}
      id={id}
      onClick={onClick}
      role="alert"
    >
      <ToastHeader>
        {title && <HeadlineText level={6}>{title}</HeadlineText>}
        <CloseIcon />
      </ToastHeader>
      <RegularText as="div">{content}</RegularText>
    </ToastContainer>
  );
};
