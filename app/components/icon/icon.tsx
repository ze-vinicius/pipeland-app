import React from "react";
import { icons } from "../../../assets/icons";
import { getStyle } from "../component-base";
import { IconProps } from "./icon.props";
import { Image } from "./icon.styles";

export const Icon: React.FC<IconProps> = ({
  name,
  style,
  uri,
  size = 16,
  marginBottom = 0,
  marginTop = 0,
  marginLeft = 0,
  marginRight = 0,
}) => {
  const overrideStyle = getStyle({
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    width: size,
    height: size,
  });

  return (
    <Image
      resizeMode="contain"
      source={
        uri
          ? {
              uri,
            }
          : icons[name || "coin"]
      }
      style={[overrideStyle, style]}
    />
  );
};
