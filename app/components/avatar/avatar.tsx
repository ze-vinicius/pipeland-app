import React from "react";
import { ViewStyle } from "react-native";
import { AvatarProps } from "./avatar.props";

import { Container, DefaultAvatar, AvatarImage } from "./avatar.styles";

export const Avatar: React.FC<AvatarProps> = ({ uri, size = 32 }) => {
  const overrideStyle = { width: size, height: size } as ViewStyle;

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
