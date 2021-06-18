import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ClassNavigator } from "./class-navigator";
import { ClassesScreen } from "../screens/classes-screen";
import { TaskDetailScreen } from "../screens/task-detail-screen";
import { useStores } from "../store";
import { observer } from "mobx-react";
import { NewClassScreen } from "../screens/new-class-screen/new-class-screen";
import { UnderConstructionScreen } from "../screens/under-construction-screen/under-construction-screen";
import { JoinClassScreen } from "../screens/join-class-screen/join-class-screen";

type MainNavigatorParamsList = {
  classes: undefined;
  class: undefined;
  taskDetail: undefined;
  newClass: undefined;
  joinClass: undefined;
  underConstruction: undefined;
};

const { Navigator, Screen } = createStackNavigator<MainNavigatorParamsList>();

const MainNavigator = observer(() => {
  const { classesStore } = useStores();

  return (
    <Navigator>
      <Screen
        name="classes"
        component={ClassesScreen}
        options={{ title: "Turmas" }}
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

      <Screen
        name="joinClass"
        component={JoinClassScreen}
        options={{ title: "Ingressar em uma turma" }}
      />

      <Screen
        name="underConstruction"
        component={UnderConstructionScreen}
        options={{ title: "Em construção" }}
      />
    </Navigator>
  );
});

export { MainNavigator };
