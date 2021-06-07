import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";

import { Screen, UserCard } from "../../components";
import { useStores } from "../../store";

import { TaskCard } from "./components/task-card";

import { Container, TasksContainer } from "./tasks-screen.styles";

export const TasksScreen: React.FC = () => {
  const { classesStore } = useStores();

  const navigation = useNavigation();

  const handleTaskCardPress = useCallback(() => {
    navigation.navigate("task");
  }, []);

  return (
    <Screen unsafe>
      <Container>
        <UserCard />
        <TasksContainer>
          <TaskCard onPress={handleTaskCardPress} />
          <TaskCard onPress={handleTaskCardPress} />
          <TaskCard onPress={handleTaskCardPress} />
          <TaskCard onPress={handleTaskCardPress} />
          <TaskCard onPress={handleTaskCardPress} />
        </TasksContainer>
      </Container>
    </Screen>
  );
};
