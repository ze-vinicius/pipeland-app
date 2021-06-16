import styled from "styled-components/native";
import { ComponentBaseStyleProps, COMPONENT_BASE_CSS } from "../component-base";

export const Container = styled.TouchableOpacity<ComponentBaseStyleProps>`
  ${(props) => props.customStyle && COMPONENT_BASE_CSS(props.customStyle)};
  background-color: ${(props) => props.theme.color.primary};
`;
