import React from "react";
import { useMemo } from "react";
import { Text } from "react-native";

import { ProgressBarProps } from "./progress-bar.props";
import {
  Container,
  LabelContainer,
  Label,
  Background,
  FilledBar,
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
        <Text>{`${currentPoints} / ${totalPoints}`}</Text>
      </LabelContainer>
      <Background>
        <FilledBar progress={progress} />
      </Background>
    </Container>
  );
};
