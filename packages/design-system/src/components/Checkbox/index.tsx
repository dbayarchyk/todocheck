import React from 'react';

import { styled } from '../../themed-styled-components';

export const FakeCheckbox = styled.span`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: inline-block;
  border: 0.125em solid ${props => props.theme.color.grey[900]};
  border-radius: 0.125em;
  position: relative;

  &::before {
    content: '';
    font-size: 0.7em;
    height: 0.5em;
    width: 0.9em;
    display: inline-block;
    box-sizing: border-box;
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%) rotate(-50deg);
    border-left: 0.2em solid ${props => props.theme.color.grey[900]};
    border-bottom: 0.2em solid ${props => props.theme.color.grey[900]};
  }
`;

export const CheckboxContainer = styled.span`
  box-sizing: border-box;
  position: relative;
  vertical-align: top;
  line-height: 1;
  display: inline-block;
  height: 1em;
  width: 1em;
  vertical-align: text-top;
  line-height: inherit;
`;

export const CheckboxInput = styled.input`
  all: inherit;
  position: absolute;
  opacity: 0;
  z-index: -1;

  &:checked + ${FakeCheckbox} {
    border-color: ${props => props.theme.color.primary.main};
    background: ${props => props.theme.color.primary.main};

    &::before {
      border-color: ${props => props.theme.color.primary.mainContrast};
      visibility: visible;
    }
  }

  &:focus + ${FakeCheckbox} {
    outline: ${props => props.theme.color.primary.dark} auto 5px;
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:hover:not(:checked) + ${FakeCheckbox} {
    &::before {
      border-color: ${props => props.theme.color.default.dark};
      visibility: visible;
    }
  }
`;

type CheckboxInputProps = React.ComponentProps<typeof CheckboxInput>;
type CheckboxContainerProps = React.ComponentProps<typeof CheckboxContainer>;

type CheckboxProps = Partial<
  Omit<CheckboxInputProps, 'type' | 'className' | 'style'>
> &
  Partial<Pick<CheckboxContainerProps, 'className' | 'style'>>;

export const Checkbox: React.FC<CheckboxProps> = ({
  className,
  style,
  ...inputProps
}) => (
  <CheckboxContainer className={className} style={style}>
    <CheckboxInput type="checkbox" {...inputProps} />
    <FakeCheckbox />
  </CheckboxContainer>
);
