import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Divider } from "../../components/divider";
import { Icon } from "../../components/icon/icon";

import { Screen } from "../../components/screen";
import { StatusLabel } from "../../components/status-label";
import { Text } from "../../components/text";

import {
  Container,
  TaskInfoContainer,
  DeliveryDateContainer,
  DateContainer,
  DateIcon,
  Row,
  TaskDescription,
} from "./task-screen.styles";

const TaskScreen: React.FC = () => {
  return (
    <Screen unsafe>
      <Container>
        <StatusLabel type="corrected" />
        <Text preset="title" mt={4}>
          Desenvolvimento de resumo sobre PMBOK
        </Text>
        <TaskInfoContainer>
          <Row>
            <DeliveryDateContainer>
              <Text preset="secondary">DATA DE ENTREGA</Text>
              <DateContainer>
                <DateIcon />
                <Text>15/08/2020</Text>
              </DateContainer>
            </DeliveryDateContainer>
            <DeliveryDateContainer>
              <Text preset="secondary">COINS</Text>
              <DateContainer>
                <Icon name="coin" />
                <Text>12</Text>
              </DateContainer>
            </DeliveryDateContainer>
          </Row>
          <Row>
            <DeliveryDateContainer>
              <Text preset="secondary">ELEMENTOS DO JOGO</Text>
              <DateContainer>
                <Icon name="redMushroom" mr={2} />
                <Icon name="mushroomUp" mr={2} />
                <Icon name="bomb" mr={2} />
              </DateContainer>
            </DeliveryDateContainer>
          </Row>
        </TaskInfoContainer>
        <Divider />
        <TaskDescription>
          A atividade consiste no desenvolvimento de resumo das áreas de
          conhecimento Gerenciamento de Tempo e Gerenciamento de Escopo. A
          atividade pode ser desenvolvida em dupla ou individual Critério de
          Avaliação: - Formatação e Organização do Resumo (1 Coin) -
          Profundidade nos conteúdos (2 Coins) - Referêncial teórico utilizado
          (1,5 Coins) - Relacionamento entre as duas áreas de conhecimento (2,5
          Coins)
        </TaskDescription>
      </Container>
    </Screen>
  );
};

export { TaskScreen };
