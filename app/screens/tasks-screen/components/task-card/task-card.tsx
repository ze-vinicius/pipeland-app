import React from "react";
import { Icon } from "../../../../components/icon/icon";
import { StatusLabel } from "../../../../components/status-label";
import { Text } from "../../../../components/text";
import { formatDate } from "../../../../utils/date";
import { TaskCardProps } from "./task-card.props";

import {
  CardHeader,
  GameElementsContainer,
  CardFooter,
  CoinContainer,
} from "./task-card.styles";

import { Container, FeatherIcon } from "../../../../components";
import { TouchableOpacity } from "react-native";

export const TaskCard: React.FC<TaskCardProps> = ({ onPress, taskInfo }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} delayPressIn={100}>
      <Container shadow margin={2} padding={4} borderRadius={4}>
        <CardHeader>
          <StatusLabel type={taskInfo.status} marginBottom={2} />
          <Text preset="title">{taskInfo.title}</Text>
        </CardHeader>
        <Container marginTop={2} marginBottom={4} flexDirection="row">
          <Container flexDirection="row" alignItems="center">
            <FeatherIcon
              name="calendar"
              color="textSecondary"
              marginRight={2}
            />
            <Text preset="secondary">
              {formatDate(taskInfo.create_date, "dd/MM/yyyy '-' hh:mm")}
            </Text>
          </Container>
          <FeatherIcon
            name="arrow-right"
            marginHorizontal={2}
            color="textSecondary"
            marginRight={2}
          />
          <Container flexDirection="row" alignItems="center">
            <FeatherIcon
              name="calendar"
              color="textSecondary"
              marginRight={2}
            />
            <Text preset="secondary">
              {formatDate(taskInfo.delivery_date, "dd/MM/yyyy '-' hh:mm")}
            </Text>
          </Container>
        </Container>
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
    </TouchableOpacity>
  );
};
