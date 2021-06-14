import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ClassNavigator } from "./class-navigator";
import { ClassesScreen } from "../screens/classes-screen";
import { TaskDetailScreen } from "../screens/task-detail-screen";
import { useStores } from "../store";
import { observer } from "mobx-react";
import { NewClassScreen } from "../screens/new-class-screen/new-class-screen";

type MainNavigatorParamsList = {
  classes: undefined;
  class: undefined;
  taskDetail: undefined;
  newClass: undefined;
};

const { Navigator, Screen } = createStackNavigator<MainNavigatorParamsList>();

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
        name="taskDetail"
        component={TaskDetailScreen}
        options={{ title: "Atividade" }}
      />
      <Screen
        name="newClass"
        component={NewClassScreen}
        options={{ title: "Nova turma" }}
      />
    </Navigator>
  );
});

export { MainNavigator };
