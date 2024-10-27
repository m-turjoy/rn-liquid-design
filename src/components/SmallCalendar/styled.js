import styled from "styled-components";

import { borderRadius, position, width, minHeight } from "styled-system";
import { shadowStyle } from "../../config/complexStyles";
import { colors } from "../../config";

const StyledCalendar = styled.View`
	${borderRadius};
	${shadowStyle};
	${width};
	${minHeight};
	${position};
	shadow-opacity: 0.15;
	shadow-radius: 6px;
	shadow-color: ${colors.richBlackDefault};
	shadow-offset: 0px 3px;
	background-color: ${colors.white};
	elevation: 15;
`;

export { StyledCalendar };
