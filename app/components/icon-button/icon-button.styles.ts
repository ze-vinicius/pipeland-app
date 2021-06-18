import styled from "styled-components/native";
import {
  PipelandSystemStyleProps,
  pipelandSystemStyle,
} from "../pipeland-system";

export const Container = styled.TouchableOpacity<PipelandSystemStyleProps>`
  ${(props) => props.customStyle && pipelandSystemStyle(props.customStyle)};
  background-color: ${(props) => props.theme.color.primary};
`;
