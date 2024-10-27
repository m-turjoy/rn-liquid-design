import styled from 'styled-components';
import { Platform } from 'react-native';
import {
  fontFamily,
  fontSize,
  lineHeight,
  backgroundColor,
  color,
} from 'styled-system';

const LabelsContainer = styled.View`
  width: 250px;
  flex-direction: row;
  flex-wrap: wrap;
  ${Platform.select({ android: 'top: 10px' })};
  ${Platform.select({ ios: 'top: 57px' })};
`;

const LabelsColumn = styled.View`
  flex-direction: column;
  background-color: white;
`;

const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 17px;
`;

const LabelSquare = styled.View`
  width: 12px;
  height: 12px;
  border-top-right-radius: 6px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  margin-left: 20px;
  ${backgroundColor}
`;

const Label = styled.Text`
  ${fontSize}
  ${lineHeight}
  ${color}
  ${fontFamily}
  margin-left: 5px;
  background-color: transparent;
`;

const ChartWrapper = styled.View`
  align-items: center;
`;

const ChartGroupWrapper = styled.View`
  align-items: center;
  flex-direction: row;
`;

const ViewWrapper = styled.View`
  align-items: center;
`;

const PaginationWrapper = styled.View`
  ${Platform.select({ ios: 'margin-top: 25px' })};
  ${Platform.select({ android: 'margin-top: 0px' })};
  align-items: center;
  justify-content: center;
`;

export {
  LabelsContainer,
  LabelsColumn,
  LabelWrapper,
  LabelSquare,
  Label,
  ChartWrapper,
  ViewWrapper,
  ChartGroupWrapper,
  PaginationWrapper,
};
