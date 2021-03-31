import React from 'react';

import { styled } from '../../themed-styled-components';

export const FakeRadio = styled.span`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  display: inline-block;
  border: 0.125em solid ${props => props.theme.color.grey[900]};
  border-radius: 50%;
  position: relative;

  &::before {
    content: '';
    height: 0.35em;
    width: 0.35em;
    display: inline-block;
    box-sizing: border-box;
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: ${props => props.theme.color.grey[900]};
  }
`;

export const RadioContainer = styled.span`
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

export const RadioInput = styled.input`
  all: inherit;
  position: absolute;
  opacity: 0;
  z-index: -1;

  &:checked + ${FakeRadio} {
    border-color: ${props => props.theme.color.primary.main};
    background: ${props => props.theme.color.primary.main};

    &::before {
      visibility: visible;
      background: ${props => props.theme.color.primary.mainContrast};
    }
  }

  &:focus + ${FakeRadio} {
    outline: ${props => props.theme.color.primary.dark} auto 5px;
    outline: -webkit-focus-ring-color auto 5px;
  }

  &:hover:not(:checked) + ${FakeRadio} {
    &::before {
      visibility: visible;
      background: ${props => props.theme.color.default.dark};
    }
  }
`;

type RadioInputProps = React.ComponentProps<typeof RadioInput>;
type RadioContainerProps = React.ComponentProps<typeof RadioContainer>;

type RadioProps = Partial<
  Omit<RadioInputProps, 'type' | 'className' | 'style'>
> &
  Partial<Pick<RadioContainerProps, 'className' | 'style'>>;

export const Radio: React.FC<RadioProps> = ({
  className,
  style,
  ...inputProps
}) => (
  <RadioContainer className={className} style={style}>
    <RadioInput type="radio" {...inputProps} />
    <FakeRadio />
  </RadioContainer>
);
