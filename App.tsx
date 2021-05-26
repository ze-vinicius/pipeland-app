import React from "react";
import { DashboardScreen } from "./app/screens/dashboard-screen";
import { ThemeProvider } from "styled-components";
import theme from "./app/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <DashboardScreen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
