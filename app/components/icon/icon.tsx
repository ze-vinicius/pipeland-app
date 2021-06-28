import React from "react";
import { icons } from "../../../assets/icons";
import { IconProps } from "./icon.props";
import { Image } from "./icon.styles";

export const Icon: React.FC<IconProps> = ({
  name,
  uri,
  size = 16,
  ...customStyle
}) => {
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
      customStyle={{ height: size, width: size, ...customStyle }}
    />
  );
};
