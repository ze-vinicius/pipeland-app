import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react";
import * as Linking from "expo-linking";

import theme from "./theme";
import { MainNavigator } from "./navigators/main-navigator";
import { createRootStore, RootStore, RootStoreProvider } from "./store";

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
            <MainNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </RootStoreProvider>
  );
});

export default App;
