import React, { useState } from "react";
import { useEffect } from "react";
import { Text } from "react-native";
import api from "../../services/api/api";
import { Avatar } from "../avatar";
import { ProgressBar } from "../progress-bar";
import { icons } from "../../../assets/icons";

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
        <UserNameText>José Vinícius</UserNameText>
        <ProgressBar currentPoints={40} totalPoints={260} />
        <GameElementsList>
          <GameElementContainer>
            <GameElement source={icons.mushroomUp} />
            <Text style={{ marginRight: 16 }}>12</Text>
          </GameElementContainer>
          <GameElementContainer>
            <GameElement source={icons.cherry} />
            <Text>2</Text>
          </GameElementContainer>
        </GameElementsList>
      </UserInfoContainer>
    </Container>
  );
};
