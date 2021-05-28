import React from "react";
import { Screen } from "../../components/screen";
import { UserCard } from "../../components/user-card";
import { Container } from "./tasks-screen.styles";

export const TasksScreen: React.FC = () => {
  return (
    <Screen unsafe>
      <Container>
        <UserCard />
      </Container>
    </Screen>
  );
};
