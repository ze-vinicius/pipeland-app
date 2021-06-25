import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Container } from "../container";
import { PipelandSystemProps } from "../pipeland-system";

interface LoadingContainerProps extends PipelandSystemProps {
  isLoading: boolean;
}

const LoadingContainer: React.FC<LoadingContainerProps> = ({
  children,
  isLoading,
  ...customStyle
}) => {
  return (
    <Container {...customStyle}>
      {isLoading ? (
        <Container flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator size={"large"} />
        </Container>
      ) : (
        children
      )}
    </Container>
  );
};

export { LoadingContainer };
