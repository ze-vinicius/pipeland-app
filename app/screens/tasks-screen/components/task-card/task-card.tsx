import React from "react";
import { Icon } from "../../../../components/icon/icon";
import { StatusLabel } from "../../../../components/status-label";
import { Text } from "../../../../components/text";

import {
  Container,
  CardHeader,
  CardBody,
  DateInfoContainer,
  CalendarIcon,
  GameElementsContainer,
  CardFooter,
  CoinContainer,
} from "./task-card.styles";

export const TaskCard: React.FC = () => {
  return (
    <Container>
      <CardHeader>
        <StatusLabel type="opened" mb={2} />
        <Text preset="title">Desenvolvimento de Resumo sobre PMBOK</Text>
      </CardHeader>
      <CardBody>
        <DateInfoContainer>
          <CalendarIcon />
          <Text preset="secondary">15/08/2020</Text>
        </DateInfoContainer>
      </CardBody>
      <CardFooter>
        <GameElementsContainer>
          <Icon mr={2} name="midMushroom" />
          <Icon mr={2} name="redMushroom" />
          <Icon mr={2} name="bomb" />
        </GameElementsContainer>

        <CoinContainer>
          <Icon mr={2} name="coin" />
          <Text>12</Text>
        </CoinContainer>
      </CardFooter>
    </Container>
  );
};
