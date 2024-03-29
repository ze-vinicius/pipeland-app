import React from "react";
import { useTheme } from "styled-components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useStores } from "../store";

// Screens
import { TasksScreen } from "../screens/tasks-screen/tasks-screen";
import { RankingScreen } from "../screens/ranking-screen/ranking-screen";
import { ProfileScreen } from "../screens/profile-screen/profile-screen";
import { AdjustsScreen } from "../screens/adjusts-screen/adjusts-screen";
import { UnderConstructionScreen } from "../screens/under-construction-screen/under-construction-screen";
import { AttendanceScreen } from "../screens/attendance-screen/attendance-screen";
import { observer } from "mobx-react";
import { FeatherIcon } from "../components";
import { TabBar } from "../components/tab-bar";

type ClassNavigatorParamsList = {
  tasks: undefined;
  ranking: undefined;
  profile: undefined;
  adjusts: undefined;
  attendance: undefined;
};

const { Navigator, Screen } =
  createBottomTabNavigator<ClassNavigatorParamsList>();

export const ClassNavigator = observer(() => {
  const theme = useTheme();
  const { sessionsStore } = useStores();

  return (
    <>
      <Navigator
        backBehavior="initialRoute"
        tabBar={(props) => <TabBar {...props} />}
        tabBarOptions={{
          activeTintColor: theme.color.darkGreen,
          inactiveTintColor: theme.color.dim,
        }}
      >
        <Screen
          name="tasks"
          component={TasksScreen}
          options={{
            title: "Tarefas",
            tabBarIcon: ({ size, color }) => {
              return (
                <FeatherIcon name="check-circle" size={size} color={color} />
              );
            },
          }}
        />
        <Screen
          name="ranking"
          component={RankingScreen}
          options={{
            title: "Ranking",
            tabBarIcon: ({ size, color }) => {
              return <FeatherIcon name="bar-chart" size={size} color={color} />;
            },
          }}
        />

        {sessionsStore.activeSession?.user?.role === "TEACHER" && (
          <>
            <Screen
              name="attendance"
              component={AttendanceScreen}
              options={{
                title: "Presença",
                tabBarIcon: ({ size, color }) => {
                  return (
                    <FeatherIcon name="user-check" size={size} color={color} />
                  );
                },
              }}
            />
            <Screen
              name="adjusts"
              component={AdjustsScreen}
              options={{
                title: "Ajustes",
                tabBarIcon: ({ size, color }) => {
                  return (
                    <FeatherIcon name="settings" size={size} color={color} />
                  );
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
                return <FeatherIcon name="user" size={size} color={color} />;
              },
            }}
          />
        )}
      </Navigator>
    </>
  );
});
