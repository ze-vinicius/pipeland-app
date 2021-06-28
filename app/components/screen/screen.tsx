import React from "react";
import {
  ActivityIndicator,
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

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        height: "100%",
      }}
      behavior={isIos ? "padding" : "height"}
    >
      <StatusBar barStyle={"dark-content"} />
      <View
        style={{
          flex: 1,
          paddingBottom: props.unsafe ? 0 : insets.bottom,
          justifyContent: "flex-start",
          alignItems: "stretch",
          height: "100%",
          width: "100%",
          backgroundColor: theme.color.background,
        }}
      >
        {props.isLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          props.children
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        height: "100%",
      }}
      behavior={isIos ? "padding" : "height"}
    >
      <StatusBar barStyle={"dark-content"} />
      <View
        style={{
          flex: 1,
          paddingBottom: props.unsafe ? 0 : insets.bottom,
          justifyContent: "flex-start",
          alignItems: "stretch",
          height: "100%",
          width: "100%",
          backgroundColor: theme.color.background,
        }}
      >
        {props.isLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <ScrollView
            style={{
              flex: 1,
              height: "100%",
              backgroundColor: theme.color.background,
            }}
            contentContainerStyle={{
              justifyContent: "flex-start",
              height: "100%",
              alignItems: "stretch",
            }}
          >
            {props.children}
          </ScrollView>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

export const Screen: React.FC<ScreenProps> = (props) => {
  if (!!props.scroll) {
    return <ScreenWithScrolling {...props} />;
  }

  return <ScreenWithoutScrolling {...props} />;
};
