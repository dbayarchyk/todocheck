import React from 'react';
import readableColor from 'polished/lib/color/readableColor';

import { styled } from '../../themed-styled-components';
import { insetSquish } from '../../mixings/insetSquish';
import { regularText } from '../../mixings/regularText';

const Container = styled.label`
  position: relative;
  border-radius: ${props => props.theme.borders.radius.big};
`;

const VisibleRadioText = styled.span`
  ${insetSquish('tiny')}
  ${regularText('normal')}

  background: ${props => props.theme.color.grey[200]};
  color: ${props => readableColor(props.theme.color.grey[200])};
  border-radius: inherit;
`;

const RadioInput = styled.input`
  all: inherit;
  position: absolute;
  opacity: 0;
  z-index: -1;

  &:checked + ${VisibleRadioText} {
    background: ${props => props.theme.color.primary[500]};
    color: ${props => readableColor(props.theme.color.primary[500])};
  }

  &:focus + ${VisibleRadioText} {
    box-shadow: 0px 0px 2px 2px ${props => props.theme.color.primary['500']};
    z-index: 1;
    position: relative;
  }
`;

type RadioInputProps = React.ComponentProps<typeof RadioInput>;

type FormRadioToggleProps = {
  className?: string;
  name?: RadioInputProps['name'];
  id?: RadioInputProps['id'];
  value?: RadioInputProps['value'];
  checked?: RadioInputProps['checked'];
  onChange?: RadioInputProps['onChange'];
  onFocus?: RadioInputProps['onFocus'];
  onBlur?: RadioInputProps['onBlur'];
};

export const FormRadioToggle: React.FC<FormRadioToggleProps> = ({
  children,
  className,
  id,
  name,
  value,
  checked,
  onChange,
  onFocus,
  onBlur,
}) => {
  return (
    <Container className={className}>
      <RadioInput
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <VisibleRadioText>{children}</VisibleRadioText>
    </Container>
  );
};
