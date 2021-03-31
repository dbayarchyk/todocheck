import { styled } from '../../themed-styled-components';
import { inputBox, InputBoxProps } from '../../mixings/inputBox';

type FormTextAreaProps = InputBoxProps;

export const FormTextArea = styled.textarea.attrs<FormTextAreaProps>(props => ({
  'aria-invalid': props.invalid,
}))<FormTextAreaProps>`
  ${inputBox}
`;
