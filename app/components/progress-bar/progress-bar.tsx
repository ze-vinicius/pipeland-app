import React from "react";
import { useMemo } from "react";
import { Text } from "react-native";
import { GameElement } from "../user-card/user-card.styles";

import { ProgressBarProps } from "./progress-bar.props";
import {
  Container,
  LabelContainer,
  Label,
  Background,
  FilledBar,
  CoinsContainer,
} from "./progress-bar.styles";

export const ProgressBar: React.FC<ProgressBarProps> = ({
  totalPoints,
  currentPoints,
}) => {
  const progress = useMemo(
    () => (currentPoints * 100) / totalPoints,
    [currentPoints, totalPoints]
  );

  return (
    <Container>
      <LabelContainer>
        <Label>COINS</Label>
        <CoinsContainer>
          <GameElement
            resizeMode="contain"
            source={{
              uri: "http://localhost:3333/files/game-assets/icons/coin.png",
            }}
          />
          <Text>{`${currentPoints} / ${totalPoints}`}</Text>
        </CoinsContainer>
      </LabelContainer>
      <Background>
        <FilledBar progress={progress} />
      </Background>
    </Container>
  );
};
