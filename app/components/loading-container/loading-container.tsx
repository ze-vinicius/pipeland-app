import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Container } from "../container";
import { formatColor, PipelandSystemProps } from "../pipeland-system";
import { Text } from "../text";

interface LoadingContainerProps extends PipelandSystemProps {
  isLoading: boolean;
  indicatorColor?: string;
}

const LoadingContainer: React.FC<LoadingContainerProps> = ({
  children,
  isLoading,
  indicatorColor,
  ...customStyle
}) => {
  return (
    <Container {...customStyle}>
      {isLoading ? (
        <Container
          flex={1}
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <ActivityIndicator
            size={"large"}
            color={formatColor(indicatorColor || "primary")}
          />
        </Container>
      ) : (
        children
      )}
    </Container>
  );
};

export { LoadingContainer };
