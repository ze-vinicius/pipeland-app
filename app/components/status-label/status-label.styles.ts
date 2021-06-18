import styled from "styled-components/native";
import {
  PipelandSystemProps,
  PipelandSystemStyleProps,
  pipelandSystemStyle,
} from "../pipeland-system";
import { Text } from "../text";

export const Container = styled.View<PipelandSystemStyleProps>`
  ${(props) => props.customStyle && pipelandSystemStyle(props.customStyle)};
  background-color: ${(props) => props.theme.color.line};
  align-self: flex-start;
`;

export const LabelText = styled(Text)`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  color: ${(props) => props.theme.color.primary};
`;
