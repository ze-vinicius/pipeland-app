import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

import { PipelandSystemProps, pipelandSystemStyle } from "../pipeland-system";
import { textPresets, buttonPresets, ButtonPresets } from "./button.presets";

export const ButtonContainer = styled.TouchableOpacity<{
  preset: ButtonPresets;
  customStyle: PipelandSystemProps;
}>`
  ${(props) => buttonPresets[props.preset]};
  ${(props) => props.customStyle && pipelandSystemStyle(props.customStyle)};
`;

export const ButtonText = styled.Text<{
  preset: ButtonPresets;
  disabled?: boolean;
}>`
  ${(props) => textPresets[props.preset]};
  ${(props) =>
    props.disabled &&
    css`
      color: ${props.theme.color.dim};
    `};
`;

export const ButtonIcon = styled(Feather)<{
  preset: ButtonPresets;
  disabled?: boolean;
}>`
  ${(props) => textPresets[props.preset]};
  margin-right: ${(props) => props.theme.spacing[2]}px;
  ${(props) =>
    props.disabled &&
    css`
      color: ${props.theme.color.dim};
    `};
`;
