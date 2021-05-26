import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { useTheme } from "styled-components";
import { ScreenProps } from "./screen.props";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const isIos = Platform.OS === "ios";

export const Screen: React.FC<ScreenProps> = (props) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        height: "100%",
      }}
      behavior={isIos ? "padding" : undefined}
    >
      <StatusBar barStyle={"dark-content"} />
      <View
        style={{
          flex: 1,
          paddingTop: props.unsafe ? 0 : insets.top,
          justifyContent: "flex-start",
          alignItems: "stretch",
          height: "100%",
          width: "100%",
          backgroundColor: theme.color.background,
        }}
      >
        {props.children}
      </View>
    </KeyboardAvoidingView>
  );
};
