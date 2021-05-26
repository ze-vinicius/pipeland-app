import React from "react";
import { Text } from "react-native";
import { Screen } from "../../components/screen";
import { UserCard } from "../../components/user-card";
import { Container } from "./dashboard-screen.styles";

export const DashboardScreen: React.FC = () => {
  return (
    <Screen>
      <Container>
        <UserCard />
      </Container>
    </Screen>
  );
};
