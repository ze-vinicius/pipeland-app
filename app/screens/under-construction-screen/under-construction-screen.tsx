import React from "react";
import { Screen, Text } from "../../components";
import { Container } from "../../components/container";

// import { Container } from './styles';

const UnderConstructionScreen: React.FC = () => {
  return (
    <Screen>
      <Container
        flex={1}
        alignItems="center"
        justifyContent="center"
        padding={4}
      >
        <Text preset="header" marginBottom="2">
          Página em construção
        </Text>
        <Text textAlign="center">
          Mário está trabalhando no encanamento dessa página, aguarde!
        </Text>
      </Container>
    </Screen>
  );
};

export { UnderConstructionScreen };
