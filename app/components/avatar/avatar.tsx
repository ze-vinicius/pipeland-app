import React from "react";
import { AvatarProps } from "./avatar.props";

import { Container, DefaultAvatar, AvatarImage } from "./avatar.styles";

export const Avatar: React.FC<AvatarProps> = ({ uri }) => {
  return (
    <Container>
      {uri ? (
        <AvatarImage
          source={{
            uri,
          }}
        />
      ) : (
        <DefaultAvatar />
      )}
    </Container>
  );
};
