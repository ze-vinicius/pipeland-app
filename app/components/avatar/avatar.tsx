import React from "react";
import { AvatarProps } from "./avatar.props";

import { Container, DefaultAvatar, AvatarImage } from "./avatar.styles";

export const Avatar: React.FC<AvatarProps> = ({ uri, size = 32 }) => {
  const overrideStyle = {
    width: size,
    height: size,
    borderRadius: size,
  };

  return (
    <Container customStyle={overrideStyle}>
      {!!uri ? (
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
