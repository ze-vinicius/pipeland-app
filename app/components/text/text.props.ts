import {
  StyleProp,
  TextStyle,
  TextProps as TextProperties,
} from "react-native";
import { TextPresets } from "./text.presets";

export interface TextProps extends TextProperties {
  preset?: TextPresets;
  style?: StyleProp<TextStyle>;
}
