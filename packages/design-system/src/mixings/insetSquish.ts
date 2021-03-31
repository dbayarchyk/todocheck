import getValueAndUnit from 'polished/lib/helpers/getValueAndUnit';
import { css } from '../themed-styled-components';
import { Theme } from '../theme';

export const getInsetSquishVerticalSpacing = (
  scale: keyof Theme['spacings'],
  theme: Theme,
) => theme.spacings[scale];

export const getInsetSquishHorizontalSpacing = (
  scale: keyof Theme['spacings'],
  theme: Theme,
) => {
  const verticalSpacing = getInsetSquishVerticalSpacing(scale, theme);
  const [verticalSpacingDimension, spacingUnit] = getValueAndUnit(
    verticalSpacing,
  );
  const horizontalSpacingDimension =
    Number(verticalSpacingDimension) * theme.squishRatio;

  return `${horizontalSpacingDimension}${spacingUnit}`;
};

export const insetSquish = (scale: keyof Theme['spacings']) => css`
  padding: ${props =>
    `${getInsetSquishVerticalSpacing(
      scale,
      props.theme,
    )} ${getInsetSquishHorizontalSpacing(scale, props.theme)}`};
`;
