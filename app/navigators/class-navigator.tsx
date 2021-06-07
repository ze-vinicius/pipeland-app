import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TasksScreen } from "../screens/tasks-screen/tasks-screen";
import { useTheme } from "styled-components";
import Feather from "@expo/vector-icons/Feather";
import { TasksNavigator } from "./tasks-navigator";
import { RankingNavigator } from "./ranking-navigator";
import { ProfileNavigator } from "./profile-navigator";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useStores } from "../store";
// import { TaskScreen } from "../screens/task-screen/task-screen";
import RankingScreen from "../screens/ranking-screen/ranking-screen";

type ClassNavigatorRouteProps = RouteProp<
  { class: { classId: string } },
  "class"
>;

type ClassNavigatorParamsList = {
  tasks: {
    classId?: string;
  };
  ranking: {
    classId?: string;
  };
  profile: {
    classId?: string;
  };
};

const { Navigator, Screen } =
  createBottomTabNavigator<ClassNavigatorParamsList>();

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
        component={RankingScreen}
        options={{
          title: "Ranking",
          tabBarIcon: ({ size, color }) => {
            return <Feather name="bar-chart" size={size} color={color} />;
          },
        }}
      />
      <Screen
        name="profile"
        component={RankingScreen}
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
