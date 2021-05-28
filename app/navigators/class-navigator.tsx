import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TasksScreen } from "../screens/tasks-screen/tasks-screen";
import { useTheme } from "styled-components";
import Feather from "@expo/vector-icons/Feather";
import { UserCard } from "../components/user-card";

const { Navigator, Screen } = createBottomTabNavigator();

export function ClassNavigator() {
  const theme = useTheme();

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.color.primary,
        inactiveTintColor: theme.color.dim,
      }}
    >
      <Screen
        name="tasks"
        component={TasksScreen}
        options={{
          title: "Tarefas",
          tabBarIcon: ({ size, color }) => {
            return <Feather name="check-square" size={size} color={color} />;
          },
        }}
      />
      <Screen
        name="ranking"
        component={TasksScreen}
        options={{
          title: "Ranking",
          tabBarIcon: ({ size, color }) => {
            return <Feather name="bar-chart" size={size} color={color} />;
          },
        }}
      />
      <Screen
        name="profile"
        component={TasksScreen}
        options={{
          title: "Perfil",
          tabBarIcon: ({ size, color }) => {
            return <Feather name="user" size={size} color={color} />;
          },
        }}
      />
    </Navigator>
  );
}
