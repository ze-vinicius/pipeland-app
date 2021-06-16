import styled from "styled-components/native";
import {
  ComponentBaseProps,
  ComponentBaseStyleProps,
  COMPONENT_BASE_CSS,
} from "../component-base";
import { Text } from "../text";

export const Container = styled.View<ComponentBaseStyleProps>`
  ${(props) => props.customStyle && COMPONENT_BASE_CSS(props.customStyle)};
  background-color: ${(props) => props.theme.color.line};
  align-self: flex-start;
`;

export const LabelText = styled(Text)`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 12px;
  color: ${(props) => props.theme.color.primary};
`;
