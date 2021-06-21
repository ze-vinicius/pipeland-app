import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useCallback, useEffect } from "react";
import { FlatList } from "react-native";

import { Screen, UserCard, Text } from "../../components";
import { Container } from "../../components/container";
import { LoadingContainer } from "../../components/loading-container";
import { useStores } from "../../store";

import { TaskCard } from "./components/task-card";

import { TasksContainer } from "./tasks-screen.styles";

export const TasksScreen: React.FC = observer(() => {
  const { classesStore } = useStores();

  const navigation = useNavigation();

  const handleTaskCardPress = useCallback((task_id: string) => {
    if (!!classesStore.selectedClass) {
      classesStore.fetchTaskDetails({
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
      <Container flex={1}>
        <UserCard />
        {classesStore.isLoading.tasks ? (
          <LoadingContainer />
        ) : (
          <Container padding={2} paddingBottom={0}>
            {!!classesStore.selectedClass?.tasks?.length ? (
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
            ) : (
              <Text preset="secondary" marginTop={1}>
                Nenhuma atividade cadastrada
              </Text>
            )}
          </Container>
        )}
      </Container>
    </Screen>
  );
});
