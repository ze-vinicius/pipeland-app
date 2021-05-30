import React from "react";
import { StatusLabel } from "../../../../components/status-label";
import { Text } from "../../../../components/text";

// import { Container } from './styles';
import { Icon } from "../../../../components/icon/icon";
import { Divider } from "../../../../components/divider";

import {
  ClassContainer,
  StudentStatusContainer,
  GameElementContainer,
} from "./class-card.styles";
import { ClassCardProps } from "./class-card.props";

const ClassCard: React.FC<ClassCardProps> = ({ onPress }) => {
  return (
    <ClassContainer onPress={onPress}>
      <StatusLabel type="opened" />
      <Text preset="title" mt={2} mb={2}>
        Engenharia de Software
      </Text>
      <Text preset="subtitle" mb={2}>
        Professor Vitor Castro
      </Text>
      <Text preset="subtitle">12 de março de 2020</Text>
      <StudentStatusContainer>
        <GameElementContainer>
          <Icon name="coin" mr={4} />
          <Text preset="secondary">40</Text>
        </GameElementContainer>
        <Divider preset="vertical" ml={4} mr={4} />
        <GameElementContainer>
          <Icon name="mario" mr={4} />
          <Text preset="secondary">Mário</Text>
        </GameElementContainer>
      </StudentStatusContainer>
    </ClassContainer>
  );
};

export { ClassCard };
