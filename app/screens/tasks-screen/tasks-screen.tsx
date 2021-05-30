import React from "react";
import { Screen } from "../../components/screen";
import { UserCard } from "../../components/user-card";
import { TaskCard } from "./components/task-card";
import { Container, TasksContainer } from "./tasks-screen.styles";

export const TasksScreen: React.FC = () => {
  return (
    <Screen unsafe>
      <Container>
        <UserCard />
        <TasksContainer>
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </TasksContainer>
      </Container>
    </Screen>
  );
};
