import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useCallback, useEffect } from "react";
import { FlatList } from "react-native";

import { Screen, UserCard } from "../../components";
import { useStores } from "../../store";

import { TaskCard } from "./components/task-card";

import { Container, TasksContainer } from "./tasks-screen.styles";

export const TasksScreen: React.FC = observer(() => {
  const { classesStore } = useStores();

  const navigation = useNavigation();

  const handleTaskCardPress = useCallback((task_id: string) => {
    if (!!classesStore.selectedClass) {
      classesStore.fetchTaskDetail({
        class_id: classesStore.selectedClass.id,
        task_id,
      });
      navigation.navigate("taskDetail");
    }
  }, []);

  useEffect(() => {
    if (!!classesStore.selectedClass) {
      classesStore.fetchClassTasks(classesStore.selectedClass.id);
    }
  }, [classesStore.selectedClass]);

  return (
    <Screen unsafe>
      <Container>
        <UserCard />
        <TasksContainer>
          <FlatList
            data={classesStore.selectedClass?.tasks}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TaskCard
                onPress={() => handleTaskCardPress(item.id)}
                taskInfo={item}
              />
            )}
          />
        </TasksContainer>
      </Container>
    </Screen>
  );
});
