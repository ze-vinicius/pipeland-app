import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ClassNavigator } from "./class-navigator";
import { ClassesScreen } from "../screens/classes-screen";
import { TaskScreen } from "../screens/task-screen/task-screen";
import { useStores } from "../store";
import { observer } from "mobx-react";

const { Navigator, Screen } = createStackNavigator();

const MainNavigator = observer(() => {
  const { classesStore } = useStores();

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
        options={{
          title: classesStore.selectedClass
            ? classesStore.selectedClass.name
            : "Turma",
        }}
      />

      <Screen
        name="task"
        component={TaskScreen}
        options={{ title: "Atividade" }}
      />
    </Navigator>
  );
});

export { MainNavigator };
