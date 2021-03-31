import { styled } from '../../themed-styled-components';

export const Group = styled.div.attrs({
  role: 'group',
})`
  display: flex;

  > {
    :focus {
      position: relative;
    }

    :first-child:not(:last-child) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    :not(:first-child):not(:last-child) {
      border-radius: 0;
    }

    :last-child:not(:first-child) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;
