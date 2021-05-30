import React from "react";
import { ImageStyle } from "react-native";
import { icons, IconTypes } from "../../../assets/icons";
import { spacing } from "../../theme/spacing";
import { IconProps } from "./icon.props";
import { Image } from "./icon.styles";

export const Icon: React.FC<IconProps> = ({
  name,
  style,
  size = 16,
  mb = 0,
  mt = 0,
  ml = 0,
  mr = 0,
}) => {
  const overrideStyle = [
    {
      marginBottom: Number(spacing[mb]),
      marginTop: Number(spacing[mt]),
      marginRight: Number(spacing[mr]),
      marginLeft: Number(spacing[ml]),
      width: size,
      height: size,
    } as ImageStyle,
    style,
  ];

  return (
    <Image resizeMode="contain" source={icons[name]} style={overrideStyle} />
  );
};
