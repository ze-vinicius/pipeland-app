import React from "react";
import { useMemo } from "react";
import { Icon } from "../icon/icon";
import { Text } from "../text";

import { ProgressBarProps } from "./progress-bar.props";
import {
  LabelContainer,
  Background,
  FilledBar,
  CoinsContainer,
} from "./progress-bar.styles";

import { Container } from "../container";

export const ProgressBar: React.FC<ProgressBarProps> = ({
  totalPoints,
  currentPoints,
  ...customStyle
}) => {
  const progress = useMemo(
    () => (currentPoints * 100) / totalPoints,
    [currentPoints, totalPoints]
  );

  return (
    <Container {...customStyle}>
      <LabelContainer>
        <Text>COINS</Text>
        <CoinsContainer>
          <Icon name="coin" marginRight={2} />
          <Text>{`${currentPoints} / ${totalPoints}`}</Text>
        </CoinsContainer>
      </LabelContainer>
      <Background>
        <FilledBar progress={progress} />
      </Background>
    </Container>
  );
};
