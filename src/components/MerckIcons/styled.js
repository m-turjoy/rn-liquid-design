import styled from "styled-components";
import { color, fontSize } from "styled-system";
import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import icoMoonConfig from "../../config/selection.json";

const Icon = createIconSetFromIcoMoon(icoMoonConfig);

const IconWrapper = styled(Icon)`
	${color}
	${fontSize}
  backgroundColor: transparent;
`;

export { IconWrapper };
