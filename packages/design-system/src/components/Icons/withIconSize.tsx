import React, { JSXElementConstructor } from 'react';
import { styled, css } from '../../themed-styled-components';

type IconContainerProps = {
  alginWithText?: boolean;
};

const IconContainer = styled.div<IconContainerProps>`
  display: inline-flex;
  align-self: center;

  ${props =>
    props.alginWithText &&
    css`
      svg {
        top: 0.125em;
        position: relative;
      }
    `}
`;

export type SizeScale = 'small' | 'medium' | 'big';

export interface IconwithIconSizeProps {
  className?: string;
  scale?: SizeScale;
  alginWithText?: boolean;
}

export function getIconSizeByScale(scale?: SizeScale) {
  switch (scale) {
    case 'small':
      return '0.75em';
    case 'medium':
      return '1em';
    case 'big':
      return '1.25em';
  }
}

export function withIconSize(Icon: JSXElementConstructor<any>) {
  return function IconwithIconSize({
    className,
    scale = 'medium',
    alginWithText,
    ...props
  }: IconwithIconSizeProps) {
    return (
      <IconContainer className={className} alginWithText={alginWithText}>
        <Icon
          {...props}
          height={getIconSizeByScale(scale)}
          width={getIconSizeByScale(scale)}
          fill="currentColor"
        />
      </IconContainer>
    );
  };
}
