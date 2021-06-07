import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react";

import theme from "./theme";
import { MainNavigator } from "./navigators/main-navigator";
import { createRootStore, RootStore, RootStoreProvider } from "./store";

const App = observer(() => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);

  useEffect(() => {
    setRootStore(createRootStore());
  }, []);

  if (!rootStore) return null;

  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </RootStoreProvider>
  );
});

export default App;
