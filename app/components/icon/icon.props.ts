import { StyleProp, ImageProps } from "react-native";
import { IconTypes } from "../../../assets/icons";
import { ComponentBaseProps } from "../component-base";

export interface IconProps extends ComponentBaseProps {
  name?: IconTypes;
  uri?: string;
  style?: StyleProp<ImageProps>;
  size?: number;
}
