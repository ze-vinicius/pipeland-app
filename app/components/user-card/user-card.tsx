import React, { useState } from "react";

import { Avatar } from "../avatar";
import { ProgressBar } from "../progress-bar";
import { icons } from "../../../assets/icons";
import { Text } from "../text";

import {
  Container,
  UserAvatarContainer,
  UserInfoContainer,
  UserNameText,
  GameElementsList,
  GameElementContainer,
  GameElement,
  GameAvatar,
} from "./user-card.styles";

export const UserCard = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <Container />;

  return (
    <Container>
      <UserAvatarContainer>
        <Avatar uri={"https://avatars.githubusercontent.com/u/38725875?v=4"} />
        <GameElementContainer>
          <GameAvatar source={icons.mario} />
          <Text>Mario</Text>
        </GameElementContainer>
      </UserAvatarContainer>
      <UserInfoContainer>
        <Text preset="title">José Vinícius</Text>
        <ProgressBar currentPoints={115} totalPoints={260} />
        <GameElementsList>
          <GameElementContainer>
            <GameElement name="mushroomUp" />
            <Text style={{ marginRight: 16 }}>1</Text>
          </GameElementContainer>
          <GameElementContainer>
            <GameElement name="cherry" />
            <Text>2</Text>
          </GameElementContainer>
        </GameElementsList>
      </UserInfoContainer>
    </Container>
  );
};
