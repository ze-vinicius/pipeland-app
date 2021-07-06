import {
  BottomTabBarOptions,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FeatherIconType } from "../../utils/icon-type";
import { Container } from "../container";
import { IconButton } from "../icon-button";
import { Text } from "../text";

// import { Container } from './styles';

const tabIcons: {
  [key: string]: FeatherIconType;
} = {
  ranking: "bar-chart",
  tasks: "check-circle",
  profile: "user",
  attendance: "user-check",
  adjusts: "settings",
};

const TabBar: React.FC<BottomTabBarProps<BottomTabBarOptions>> = ({
  state,
  descriptors,
  navigation,
  safeAreaInsets,
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <Container
      flexDirection="row"
      // paddingVertical={4}
      paddingHorizontal={2}
      paddingBottom={`${safeAreaInsets ? safeAreaInsets.bottom : 0 + 8}px`}
      justifyContent="space-around"
      backgroundColor="white"
      borderTopColor="line"
      borderTopWidth={1}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <IconButton
            key={route.key}
            preset="link"
            iconSize={isFocused ? 24 : 16}
            icon={tabIcons[route.name]}
            onPress={onPress}
            color={isFocused ? "darkGreen" : "dim"}
            flex={1}
            label={!isFocused ? label : undefined}
          />
        );
      })}
    </Container>
  );
};

export { TabBar };
