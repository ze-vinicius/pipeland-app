import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RankingScreen from "../screens/ranking-screen/ranking-screen";

const { Navigator, Screen } = createStackNavigator();

export function RankingNavigator() {
  return (
    <Navigator>
      <Screen
        name="ranking"
        component={RankingScreen}
        options={{ title: "Engenharia de Software" }}
      />
    </Navigator>
  );
}
