import styled from "styled-components/native";

import { ComponentBaseProps, COMPONENT_BASE_CSS } from "../component-base";
import { textPresets, buttonPresets, ButtonPresets } from "./button.presets";

export const ButtonContainer = styled.TouchableOpacity<{
  preset: ButtonPresets;
  customStyle: ComponentBaseProps;
}>`
  ${(props) => props.customStyle && COMPONENT_BASE_CSS(props.customStyle)};
  ${(props) => buttonPresets[props.preset]};
`;

export const ButtonText = styled.Text<{
  preset: ButtonPresets;
}>`
  ${(props) => textPresets[props.preset]};
`;
