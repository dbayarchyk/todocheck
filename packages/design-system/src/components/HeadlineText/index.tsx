import { styled } from '../../themed-styled-components';

function calcPxFontSize(number: number): number {
  if (number === 0) {
    return 12;
  }

  return calcPxFontSize(number - 1) + (Math.round((number - 1) / 4) + 1) * 2;
}

type HeadlineTextLevels = 1 | 2 | 3 | 4 | 5 | 6;

export function fontSizeByLevel(
  level: HeadlineTextLevels,
  baseFontSizeDimension: number,
): string {
  const fontSizes = [
    calcPxFontSize(6) / baseFontSizeDimension,
    calcPxFontSize(5) / baseFontSizeDimension,
    calcPxFontSize(4) / baseFontSizeDimension,
    calcPxFontSize(3) / baseFontSizeDimension,
    calcPxFontSize(2) / baseFontSizeDimension,
    calcPxFontSize(1) / baseFontSizeDimension,
  ];

  return `${fontSizes[level - 1]}rem`;
}

type HeadlineTextProps = {
  level: HeadlineTextLevels;
};

export const HeadlineText = styled.h1.attrs<HeadlineTextProps>(props => ({
  as: `h${props.level}`,
}))<HeadlineTextProps>`
  font-family: ${props => props.theme.typography.fontFamily};
  font-size: ${props => fontSizeByLevel(props.level, 16)};
  font-weight: ${props => props.theme.typography.weights.semiBold};
  line-height: 1.125;
  color: ${props => props.theme.color.grey[900]};
  max-width: ${props => props.theme.typography.maxCharactersPerLine}ch;
`;
