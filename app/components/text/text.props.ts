import { StyleProp, TextStyle } from "react-native";
import { PipelandFlexProps, PipelandTextProps } from "../pipeland-system";
import { TextPresets } from "./text.presets";

export interface TextProps extends PipelandFlexProps, PipelandTextProps {
  preset?: TextPresets;
  selectable?: boolean;
}
