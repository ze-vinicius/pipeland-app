import React from "react";
import { getStyle } from "../component-base";
import { AvatarProps } from "./avatar.props";

import { Container, DefaultAvatar, AvatarImage } from "./avatar.styles";

export const Avatar: React.FC<AvatarProps> = ({ uri, size = 32 }) => {
  const overrideStyle = getStyle({
    width: size,
    height: size,
  });

  return (
    <Container style={overrideStyle}>
      {uri ? (
        <AvatarImage
          source={{
            uri,
          }}
        />
      ) : (
        <DefaultAvatar size={size - 12} />
      )}
    </Container>
  );
};
