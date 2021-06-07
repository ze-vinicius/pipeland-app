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

export const TaskCard: React.FC<TaskCardProps> = ({ onPress, taskInfo }) => {
  return (
    <Container onPress={onPress}>
      <CardHeader>
        <StatusLabel type="opened" marginBottom={2} />
        <Text preset="title">{taskInfo.title}</Text>
      </CardHeader>
      <CardBody>
        <DateInfoContainer>
          <CalendarIcon />
          <Text preset="secondary">{taskInfo.delivery_date}</Text>
        </DateInfoContainer>
      </CardBody>
      <CardFooter>
        <GameElementsContainer>
          {taskInfo.task_elements.map((task_element) => (
            <Icon
              key={task_element.id}
              marginRight={2}
              uri={task_element.imageUrl}
            />
          ))}
        </GameElementsContainer>

        <CoinContainer>
          <Icon marginRight={2} name="coin" />
          <Text>{taskInfo.task_value}</Text>
        </CoinContainer>
      </CardFooter>
    </Container>
  );
};
