import React from "react";
import { Icon } from "../../../../components/icon/icon";
import { StatusLabel } from "../../../../components/status-label";
import { Text } from "../../../../components/text";
import { TaskCardProps } from "./task-card.props";

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

export const TaskCard: React.FC<TaskCardProps> = ({ onPress }) => {
  return (
    <Container onPress={onPress}>
      <CardHeader>
        <StatusLabel type="opened" marginBottom={2} />
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
          <Icon marginRight={2} name="midMushroom" />
          <Icon marginRight={2} name="redMushroom" />
          <Icon marginRight={2} name="bomb" />
        </GameElementsContainer>

        <CoinContainer>
          <Icon marginRight={2} name="coin" />
          <Text>12</Text>
        </CoinContainer>
      </CardFooter>
    </Container>
  );
};
