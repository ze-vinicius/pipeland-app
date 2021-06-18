import styled from "styled-components/native";

import { PipelandSystemProps, pipelandSystemStyle } from "../pipeland-system";
import { textPresets, buttonPresets, ButtonPresets } from "./button.presets";

export const ButtonContainer = styled.TouchableOpacity<{
  preset: ButtonPresets;
  customStyle: PipelandSystemProps;
}>`
  ${(props) => props.customStyle && pipelandSystemStyle(props.customStyle)};
  ${(props) => buttonPresets[props.preset]};
`;

export const ButtonText = styled.Text<{
  preset: ButtonPresets;
}>`
  ${(props) => textPresets[props.preset]};
`;
