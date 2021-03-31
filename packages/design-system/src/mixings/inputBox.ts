import { css } from '../themed-styled-components';
import { regularText } from './regularText';
import { insetSquish, getInsetSquishHorizontalSpacing } from './insetSquish';
import { focusable } from './focusable';

export type InputBoxProps = {
  expectedLength?: number;
  invalid?: boolean;
};

export const inputBox = css<InputBoxProps>`
  ${insetSquish('small')}
  ${regularText('normal')}
  ${focusable}

  border: 0;
  border-radius: ${props =>
    getInsetSquishHorizontalSpacing('small', props.theme)};
  background-color: ${props => props.theme.color.grey[200]};
  box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.08);

  :hover,
  :focus,
  :focus-within {
    border-color: ${props => props.theme.color.primary.dark};
  }

  ${props =>
    props.expectedLength &&
    css`
      width: calc(
        100% - 2 * ${getInsetSquishHorizontalSpacing('small', props.theme)} - 2 *
          ${props => props.theme.borders.width.small}
      );
      max-width: ${props.expectedLength}ch;
      box-sizing: content-box;
    `};

  ${props =>
    props.invalid &&
    css`
      border-color: ${props => props.theme.color.danger.main};

      :hover,
      :focus,
      :focus-within {
        border-color: ${props => props.theme.color.danger.dark};
      }
    `}
`;
