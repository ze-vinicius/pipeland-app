import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ClassNavigator } from "./class-navigator";
import { ClassesScreen } from "../screens/classes-screen";
import { TaskScreen } from "../screens/task-screen/task-screen";

const { Navigator, Screen } = createStackNavigator();

export function MainNavigator() {
  return (
    <Navigator>
      <Screen
        name="classes"
        component={ClassesScreen}
        options={{ title: "Minhas turmas" }}
      />

      <Screen
        name="class"
        component={ClassNavigator}
        options={{ headerShown: false }}
      />

      <Screen
        name="task"
        component={TaskScreen}
        options={{ title: "Atividade" }}
      />
    </Navigator>
  );
}
