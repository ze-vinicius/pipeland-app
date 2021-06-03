import React, { useState } from "react";

import { Avatar } from "../avatar";
import { ProgressBar } from "../progress-bar";
import { Text } from "../text";

import {
  Container,
  UserAvatarContainer,
  UserInfoContainer,
  GameElementsList,
  GameElementContainer,
} from "./user-card.styles";
import { Icon } from "../icon/icon";

export const UserCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <Container />;

  return (
    <Container>
      <UserAvatarContainer>
        <Avatar
          size={64}
          uri={"https://avatars.githubusercontent.com/u/38725875?v=4"}
        />
        <GameElementContainer>
          <Icon name="mario" marginRight={2} />
          <Text>Mario</Text>
        </GameElementContainer>
      </UserAvatarContainer>
      <UserInfoContainer>
        <Text preset="title">José Vinícius</Text>
        <ProgressBar currentPoints={115} totalPoints={260} />
        <GameElementsList>
          <GameElementContainer>
            <Icon marginRight={2} name="mushroomUp" />
            <Text marginRight={4}>1</Text>
          </GameElementContainer>
          <GameElementContainer>
            <Icon marginRight={2} name="cherry" />
            <Text>2</Text>
          </GameElementContainer>
        </GameElementsList>
      </UserInfoContainer>
    </Container>
  );
};
