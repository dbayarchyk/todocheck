import { styled } from '../../themed-styled-components';
import { inputBox, InputBoxProps } from '../../mixings/inputBox';

type FormInputProps = InputBoxProps;

export const FormInput = styled.input.attrs<FormInputProps>(props => ({
  'aria-invalid': props.invalid,
}))<FormInputProps>`
  ${inputBox}
`;
