import styled from 'styled-components';
import { top, left, width, height, backgroundColor } from 'styled-system';

const PlaceholderWrapper = styled.View``;

const SquareIllustrationWrapper = styled.View`
  ${top}
  ${left}
  position: absolute
`;

const CircularWrapper = styled.View`
  ${width}
  ${height}
${backgroundColor}
borderRadius: 150
`;

const RectangularIllustrationWrapper = styled.View`
  ${top}
  ${left}
  position: absolute
`;

export {
  PlaceholderWrapper,
  SquareIllustrationWrapper,
  CircularWrapper,
  RectangularIllustrationWrapper,
};
