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
import { Container } from "../container";
import { Text } from "../text";
import { FeatherIcon } from "../feather-icon";

const isIos = Platform.OS === "ios";

const ErrorMessage = ({ errorMessage }: { errorMessage?: string | null }) =>
  !!errorMessage ? (
    <Container
      width="100%"
      padding={2}
      alignItems="center"
      backgroundColor="alert"
      flexDirection="row"
      justifyContent="center"
    >
      <FeatherIcon
        name="alert-triangle"
        marginRight={2}
        size={16}
        color="darkRed"
      />
      <Text color="darkRed">{errorMessage}</Text>
    </Container>
  ) : null;

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        height: "100%",
      }}
      behavior={isIos ? "padding" : undefined}
    >
      <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
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
        <ErrorMessage errorMessage={props.errorMessage} />
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
      behavior={isIos ? "padding" : undefined}
    >
      <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
      <View
        style={{
          flex: 1,
          paddingBottom: props.unsafe ? 0 : insets.bottom,
          height: "100%",
          backgroundColor: theme.color.background,
        }}
      >
        <ErrorMessage errorMessage={props.errorMessage} />

        {props.isLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <ActivityIndicator size="large" color={theme.color.primary} />
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
