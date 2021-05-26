import React from "react";
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
  amount,
  progress,
}) => {
  return (
    <Container>
      <LabelContainer>
        <Label>COINS</Label>
        <Text>{`${progress} / ${amount}`}</Text>
      </LabelContainer>
      <Background>
        <FilledBar progress={progress} />
      </Background>
    </Container>
  );
};
