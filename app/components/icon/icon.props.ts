import { StyleProp, ImageProps } from "react-native";
import { IconTypes } from "../../../assets/icons";
import { BaseComponentInterface } from "../../theme/BaseComponentInterface";

export interface IconProps extends BaseComponentInterface {
  name: IconTypes;
  style?: StyleProp<ImageProps>;
  size?: number;
}
