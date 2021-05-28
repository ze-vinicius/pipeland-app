import React from "react";
import { Screen } from "../../components/screen";
import { Container, ClassContainer } from "./classes-screen.styles";

import { Text } from "../../components/text";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

export const ClassesScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleOpenClass = useCallback(() => {
    navigation.navigate("class");
  }, []);

  return (
    <Screen unsafe>
      <Container>
        <ClassContainer onPress={handleOpenClass}>
          <Text preset="title">Engenharia de Software</Text>
          <Text preset="subtitle">Vitor Castro</Text>
        </ClassContainer>
      </Container>
    </Screen>
  );
};
