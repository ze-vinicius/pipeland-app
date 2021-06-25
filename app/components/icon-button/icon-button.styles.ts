import styled from "styled-components/native";
import {
  PipelandSystemStyleProps,
  pipelandSystemStyle,
} from "../pipeland-system";
import { iconButtonPresets, IconButtonPresets } from "./icon-button.presets";

export const Container = styled.TouchableOpacity<
  PipelandSystemStyleProps & {
    preset: IconButtonPresets;
  }
>`
  ${(props) => iconButtonPresets[props.preset]};
  ${(props) => props.customStyle && pipelandSystemStyle(props.customStyle)};
`;
