import {
  StyleProp,
  TextStyle,
  TextProps as TextProperties,
} from "react-native";
import { BaseComponentInterface } from "../../theme/BaseComponentInterface";
import { TextPresets } from "./text.presets";

export interface TextProps extends TextProperties, BaseComponentInterface {
  preset?: TextPresets;
  style?: StyleProp<TextStyle>;
}
