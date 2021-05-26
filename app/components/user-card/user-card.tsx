import React from "react";
import { Text } from "react-native";
import { Avatar } from "../avatar";
import { ProgressBar } from "../progress-bar";

import {
  Container,
  UserAvatarContainer,
  UserInfoContainer,
  UserNameText,
  GameElementsList,
  GameElementContainer,
  GameElement,
} from "./user-card.styles";

export const UserCard = () => {
  return (
    <Container>
      <UserAvatarContainer>
        <Avatar uri={"https://avatars.githubusercontent.com/u/38725875?v=4"} />
        <GameElementContainer>
          <GameElement />
          <Text>Mario</Text>
        </GameElementContainer>
      </UserAvatarContainer>
      <UserInfoContainer>
        <UserNameText>José Vinícius</UserNameText>
        <ProgressBar progress={40} amount={260} />
        <GameElementsList>
          <GameElementContainer>
            <GameElement />
            <Text style={{ marginRight: 16 }}>12</Text>
          </GameElementContainer>
          <GameElementContainer>
            <GameElement />
            <Text>2</Text>
          </GameElementContainer>
        </GameElementsList>
      </UserInfoContainer>
    </Container>
  );
};
