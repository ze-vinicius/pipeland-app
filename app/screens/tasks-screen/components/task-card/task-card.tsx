import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../../../../components/text";

import {
  Container,
  CardHeader,
  CardBody,
  DateInfoContainer,
  CalendarIcon,
  GameElementsContainer,
  GameElement,
  CardFooter,
  CoinContainer,
} from "./task-card.styles";

export const TaskCard: React.FC = () => {
  return (
    <TouchableOpacity>
      <Container>
        <CardHeader>
          <Text>Desenvolvimento de Resumo sobre PMBOK</Text>
        </CardHeader>
        <CardBody>
          <DateInfoContainer>
            <CalendarIcon />
            <Text preset="secondary">15/08/2020</Text>
          </DateInfoContainer>
        </CardBody>
        <CardFooter>
          <GameElementsContainer>
            <GameElement name="midMushroom" />
            <GameElement name="redMushroom" />
          </GameElementsContainer>

          <CoinContainer>
            <GameElement name="coin" />
            <Text>12</Text>
          </CoinContainer>
        </CardFooter>
      </Container>
    </TouchableOpacity>
  );
};
