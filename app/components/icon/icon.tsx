import React from "react";
import { icons, IconTypes } from "../../../assets/icons";
import { IconProps } from "./icon.props";
import { Image } from "./icon.styles";

export const Icon: React.FC<IconProps> = ({ name, style }) => {
  return <Image resizeMode="contain" source={icons[name]} style={style} />;
};
