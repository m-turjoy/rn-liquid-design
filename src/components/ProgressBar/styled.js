import styled from 'styled-components';
import {
  justifyContent,
  flexDirection,
  alignItems,
  width,
  height,
  minWidth,
  position,
  space,
  flex,
  bgColor,
} from 'styled-system';

const ProgressBarWrapper = styled.View`
  ${justifyContent};
  ${alignItems};
  ${width};
  ${height} ${position};
  ${bgColor}
  ${flexDirection};
  ${minWidth}
`;
const StepContainer = styled.View`
  ${flexDirection};
  ${justifyContent};
  ${alignItems};
  ${space};
  ${flex};
  ${bgColor};
`;
export { ProgressBarWrapper, StepContainer };
