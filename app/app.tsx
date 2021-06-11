import "react-native-gesture-handler";

if (typeof Intl === "undefined") {
  require("intl");
  require("intl/locale-data/jsonp/pt-BR");
  require("date-time-format-timezone");
}

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react";
import * as Linking from "expo-linking";

import theme from "./theme";
import { MainNavigator } from "./navigators/main-navigator";
import {
  createRootStore,
  RootStore,
  RootStoreProvider,
  useStores,
} from "./store";
import { AuthNavigator } from "./navigators/auth-navigator";
import { ActivityIndicator, View } from "react-native";

const prefix = Linking.createURL("/");

const App = observer(() => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);

  const linking = {
    prefixes: [prefix],
  };

  useEffect(() => {
    setRootStore(createRootStore());
  }, []);

  if (!rootStore) return null;

  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer linking={linking}>
            {!!rootStore.sessionsStore.activeSession ? (
              <MainNavigator />
            ) : (
              <AuthNavigator />
            )}
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </RootStoreProvider>
  );
});

export default App;
