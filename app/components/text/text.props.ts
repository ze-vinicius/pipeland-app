import {
  StyleProp,
  TextStyle,
  TextProps as TextProperties,
} from "react-native";
import { ComponentBaseProps } from "../component-base";
import { TextPresets } from "./text.presets";

export interface TextProps extends TextProperties, ComponentBaseProps {
  preset?: TextPresets;
  style?: StyleProp<TextStyle>;
}
