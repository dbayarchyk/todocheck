import reset from 'styled-reset';

import { css } from './themed-styled-components';

export default css`
  ${reset} :root {
    font-size: 100%;
    font-family: ${props => props.theme.typography.fontFamily};
  }

  :root,
  body {
    background: ${props => props.theme.color.backgroundColor};
  }

  * {
    box-sizing: border-box;
  }

  [tabindex='-1'] {
    outline: none;
  }
`;
