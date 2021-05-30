import React from "react";
import { Screen } from "../../components/screen";

import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import { Container } from "./classes-screen.styles";
import { ClassCard } from "./components/class-card";

export const ClassesScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleOpenClass = useCallback(() => {
    navigation.navigate("class");
  }, []);

  return (
    <Screen unsafe>
      <Container>
        <ClassCard onPress={handleOpenClass} />
        <ClassCard onPress={handleOpenClass} />
        <ClassCard onPress={handleOpenClass} />
        <ClassCard onPress={handleOpenClass} />
        <ClassCard onPress={handleOpenClass} />
        <ClassCard onPress={handleOpenClass} />
        <ClassCard onPress={handleOpenClass} />
      </Container>
    </Screen>
  );
};
