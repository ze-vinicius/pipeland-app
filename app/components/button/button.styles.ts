import styled from "styled-components/native";
import { Text } from "..";
import { textPresets, buttonPresets, ButtonPresets } from "./button.presets";

export const ButtonContainer = styled.TouchableOpacity<{
  preset: ButtonPresets;
}>`
  ${(props) => buttonPresets[props.preset]};
`;

export const ButtonText = styled.Text<{
  preset: ButtonPresets;
}>`
  ${(props) => textPresets[props.preset]};
`;
