import {
  StyleProp,
  TextStyle,
  TextProps as TextProperties,
} from "react-native";
import { ComponentProps } from "../../theme/component-props";
import { TextPresets } from "./text.presets";

export interface TextProps extends TextProperties, ComponentProps {
  preset?: TextPresets;
  style?: StyleProp<TextStyle>;
}
