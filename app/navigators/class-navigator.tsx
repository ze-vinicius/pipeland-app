import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TasksScreen } from "../screens/tasks-screen/tasks-screen";
import { useTheme } from "styled-components";
import Feather from "@expo/vector-icons/Feather";
// import { TasksNavigator } from "./tasks-navigator";
// import { RankingNavigator } from "./ranking-navigator";
// import { ProfileNavigator } from "./profile-navigator";
// import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useStores } from "../store";
// import { TaskScreen } from "../screens/task-screen/task-screen";
import { RankingScreen } from "../screens/ranking-screen/ranking-screen";
import { ProfileScreen } from "../screens/profile-screen/profile-screen";
import { AdjustsScreen } from "../screens/adjusts-screen/adjusts-screen";
import { UnderConstructionScreen } from "../screens/under-construction-screen/under-construction-screen";

// type ClassNavigatorRouteProps = RouteProp<
//   { class: { classId: string } },
//   "class"
// >;

type ClassNavigatorParamsList = {
  tasks: undefined;
  ranking: undefined;
  profile: undefined;
  adjusts: undefined;
  presence: undefined;
};

const { Navigator, Screen } =
  createBottomTabNavigator<ClassNavigatorParamsList>();

export function ClassNavigator() {
  const theme = useTheme();
  const { sessionsStore } = useStores();

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

      {sessionsStore.activeSession?.user?.role === "TEACHER" && (
        <>
          <Screen
            name="presence"
            component={UnderConstructionScreen}
            options={{
              title: "Presença",
              tabBarIcon: ({ size, color }) => {
                return <Feather name="user-check" size={size} color={color} />;
              },
            }}
          />
          <Screen
            name="adjusts"
            component={AdjustsScreen}
            options={{
              title: "Ajustes",
              tabBarIcon: ({ size, color }) => {
                return <Feather name="settings" size={size} color={color} />;
              },
            }}
          />
        </>
      )}
      {sessionsStore.activeSession?.user?.role === "STUDENT" && (
        <Screen
          name="profile"
          component={ProfileScreen}
          options={{
            title: "Perfil",
            tabBarIcon: ({ size, color }) => {
              return <Feather name="user" size={size} color={color} />;
            },
          }}
        />
      )}
    </Navigator>
  );
}
