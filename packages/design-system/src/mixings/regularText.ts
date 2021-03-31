import { css } from '../themed-styled-components';

export type RegularTextPriority = 'high' | 'normal' | 'low';

export const regularText = (priority?: RegularTextPriority) => css`
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: 1rem;
  max-width: ${props => props.theme.typography.maxCharactersPerLine}ch;

  ${props => {
    switch (priority) {
      case 'high':
        return css`
          line-height: 1.7;
          font-weight: ${props.theme.typography.weights.semiBold};
          color: ${props.theme.color.grey[900]};
        `;
      case 'low':
        return css`
          line-height: 1.5;
          font-weight: ${props.theme.typography.weights.regular};
          color: ${props.theme.color.grey[500]};
        `;
      case 'normal':
      default:
        return css`
          line-height: 1.5;
          font-weight: ${props.theme.typography.weights.regular};
          color: ${props.theme.color.grey[900]};
        `;
    }
  }}
`;
