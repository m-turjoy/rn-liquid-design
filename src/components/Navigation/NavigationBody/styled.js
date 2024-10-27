import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components';
import {
  borderRadius,
  fontFamily,
  fontSize,
  color,
  lineHeight,
} from 'styled-system';

const { width, height } = Dimensions.get('window');

const IPHONE_X =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (height === 812 || width === 812);

const TITLE_PADDING = IPHONE_X ? 44 : 10;

const ImageWrapper = styled.View`
  ${borderRadius};
  overflow: hidden;
  justify-content: center;
  align-self: center;
  width: 31px;
  height: 31px;
`;

const Image = styled.Image`
  resize-mode: contain;
  width: 100%;
  height: 100%;
`;

const NavigationTabTitle = styled.Text`
  width: 100%;
  text-align: center;
  padding-bottom: 9.6px;
  ${fontSize}
  ${lineHeight}
  ${fontFamily}
  ${color}
`;

const NavigationTitle = styled.Text`
  width: 100%;
  text-align: center;
  padding-top: 7px;
  padding-bottom: ${TITLE_PADDING}px;
  ${fontSize}
  ${lineHeight}
  ${fontFamily}
  ${color}
`;

export { NavigationTitle, NavigationTabTitle, ImageWrapper, Image };
