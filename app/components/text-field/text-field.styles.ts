import styled from "styled-components/native";
import { ComponentBaseStyleProps, COMPONENT_BASE_CSS } from "../component-base";

export const Container = styled.View<ComponentBaseStyleProps>`
  ${(props) => props.customStyle && COMPONENT_BASE_CSS(props.customStyle)};
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
  border-width: 2px;
  border-color: ${(props) => props.theme.color.line};
  padding: ${(props) => props.theme.spacing[2]}px;
`;
