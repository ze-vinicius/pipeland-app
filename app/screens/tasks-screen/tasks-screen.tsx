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

  const handleTaskCardPress = useCallback(() => {
    navigation.navigate("task");
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
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TaskCard onPress={handleTaskCardPress} taskInfo={item} />
            )}
          />
        </TasksContainer>
      </Container>
    </Screen>
  );
});
