import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FeatherIconType } from "../../utils/icon-type";
import { Container } from "../container";
import { IconButton } from "../icon-button";
import { Text } from "../text";

interface HeaderProps {
  onLeftPress?: () => void;
  onRightPress?: () => void;
  rightIcon?: FeatherIconType;
  leftIcon?: FeatherIconType;
  headerText: string;
}

const Header: React.FC<HeaderProps> = ({
  headerText,
  leftIcon,
  onLeftPress,
  onRightPress,
  rightIcon,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Container
      paddingTop={`${insets.top}px`}
      backgroundColor="white"
      padding={2}
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      flexDirection="row"
      borderBottomColor="line"
      borderBottomWidth={1}
    >
      {!!leftIcon ? (
        <IconButton
          preset="link"
          iconSize={24}
          icon={leftIcon}
          onPress={() => onLeftPress && onLeftPress()}
        />
      ) : (
        <Container width={"32px"}></Container>
      )}

      <Container flex={1} alignItems="center">
        <Text preset="title">{headerText}</Text>
      </Container>

      {!!rightIcon ? (
        <IconButton
          preset="link"
          iconSize={24}
          icon={rightIcon}
          onPress={() => onRightPress && onRightPress()}
        />
      ) : (
        <Container width={"40px"} height="40px"></Container>
      )}
    </Container>
  );
};

export { Header };
