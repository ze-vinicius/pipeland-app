import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Container } from "../container";

const LoadingContainer: React.FC = () => {
  return (
    <Container flex={1} alignItems="center" justifyContent="center">
      <ActivityIndicator size={"large"} />
    </Container>
  );
};

export { LoadingContainer };
