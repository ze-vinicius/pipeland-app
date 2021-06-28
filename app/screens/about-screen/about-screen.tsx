import React from "react";
import { IconTypes } from "../../../assets/icons";

import { Container, Divider, Icon, Screen, Text } from "../../components";
import { useStores } from "../../store";
import { GameElement } from "../../store/game-element-store/game-element";

const AboutScreen: React.FC = () => {
  const { gameElementsStore } = useStores();

  const gameElements = [
    ...gameElementsStore.gameRewards,
    ...gameElementsStore.gamePenalties,
  ];

  const gameAvatars: Array<{
    title: string;
    description: string;
    icon: IconTypes;
  }> = [
    {
      title: "Mario",
      icon: "mario",
      description: "Menor ou igual a 100 coins",
    },
    {
      title: "Super Mário",
      icon: "superMario",
      description: "Entre 101 e 130 coins",
    },
    {
      title: "Fire Mário",
      icon: "fireMario",
      description: "Entre 131 e 170 coins",
    },
    {
      title: "Cape Mário",
      icon: "capeMario",
      description: "Maior ou igual a 170 coins",
    },
  ];

  return (
    <Screen>
      <Container scroll padding={4} flex={1}>
        <Text>Bem vindo!</Text>
        <Text preset="title" marginTop={4} marginBottom={2}>
          Conversão da pontuação do game para o conceito final
        </Text>
        {gameAvatars.map((item) => (
          <Container
            alignItems="center"
            flexDirection="row"
            width="100%"
            paddingVertical={2}
            key={item.title}
            borderBottomColor="line"
            borderBottomWidth={1}
          >
            <Container width="10%">
              <Icon name={item.icon} size={24} />
            </Container>
            <Container width="30%">
              <Text>{item.title}</Text>
            </Container>
            <Container width="60%">
              <Text>{item.description}</Text>
            </Container>
          </Container>
        ))}
        <Text preset="title" marginTop={4} marginBottom={2}>
          Elementos do jogo
        </Text>
        <Container width="100%">
          {gameElements.length &&
            gameElements.map((item) => (
              <Container
                alignItems="center"
                flexDirection="row"
                width="100%"
                paddingVertical={2}
                key={item.id}
                borderBottomColor="line"
                borderBottomWidth={1}
              >
                <Container width="10%">
                  <Icon uri={item.imageUrl} size={24} />
                </Container>
                <Container width="30%">
                  <Text>{item.name}</Text>
                </Container>
                <Container width="60%">
                  <Text>{item.description}</Text>
                </Container>
              </Container>
            ))}
        </Container>
      </Container>
    </Screen>
  );
};

export { AboutScreen };
