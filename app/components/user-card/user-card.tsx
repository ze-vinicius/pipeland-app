import React, { useState } from "react";
import { useEffect } from "react";
import { Text } from "react-native";
import api from "../../services/api/api";
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

interface IGameElement {
  name: string;
  imageUrl: string;
  value: number;
}

export const UserCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gameElements, setGameElements] = useState<IGameElement[]>([]);

  useEffect(() => {
    setIsLoading(true);

    api
      .get<IGameElement[]>("/classes/game-elements")
      .then((resp) => {
        setGameElements(resp.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Container />;

  return (
    <Container>
      <UserAvatarContainer>
        <Avatar uri={"https://avatars.githubusercontent.com/u/38725875?v=4"} />
        <GameElementContainer>
          <GameElement
            source={{
              uri: gameElements.find((g) => g.name === "mario")?.imageUrl,
            }}
          />
          <Text>Mario</Text>
        </GameElementContainer>
      </UserAvatarContainer>
      <UserInfoContainer>
        <UserNameText>José Vinícius</UserNameText>
        <ProgressBar currentPoints={40} totalPoints={260} />
        <GameElementsList>
          <GameElementContainer>
            <GameElement
              source={{
                uri: gameElements.find((g) => g.name === "mushroom-up")
                  ?.imageUrl,
              }}
            />
            <Text style={{ marginRight: 16 }}>12</Text>
          </GameElementContainer>
          <GameElementContainer>
            <GameElement
              source={{
                uri: gameElements.find((g) => g.name === "cherry")?.imageUrl,
              }}
            />
            <Text>2</Text>
          </GameElementContainer>
        </GameElementsList>
      </UserInfoContainer>
    </Container>
  );
};
