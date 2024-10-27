import styled from 'styled-components';
import {
  borderRadius,
  justifyContent,
  alignItems,
  flexDirection,
  width,
  space,
} from 'styled-system';

const ImageWrapper = styled.View`
  ${borderRadius}
  overflow: hidden
`;

const Image = styled.Image`
  resize-mode: contain;
  width: 100%;
  height: 100%;
`;
const LabelWrapper = styled.View`
  ${justifyContent}
  ${alignItems}
${flexDirection}
${width}
${space}
`;

const ContentCardWrapper = styled.View`
  ${space}
  ${justifyContent}
  ${alignItems}
  ${borderRadius}
`;

export { ImageWrapper, Image, LabelWrapper, ContentCardWrapper };
