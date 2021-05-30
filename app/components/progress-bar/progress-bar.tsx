import React from "react";
import { useMemo } from "react";
import { Icon } from "../icon/icon";
import { Text } from "../text";

import { ProgressBarProps } from "./progress-bar.props";
import {
  Container,
  LabelContainer,
  Label,
  Background,
  FilledBar,
  CoinsContainer,
  Coin,
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
        <Text>COINS</Text>
        <CoinsContainer>
          <Icon name="coin" mr={2} />
          <Text>{`${currentPoints} / ${totalPoints}`}</Text>
        </CoinsContainer>
      </LabelContainer>
      <Background>
        <FilledBar progress={progress} />
      </Background>
    </Container>
  );
};
