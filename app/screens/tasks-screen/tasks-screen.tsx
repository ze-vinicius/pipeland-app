import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

import { Screen, UserCard, Text } from "../../components";
import { Container } from "../../components/container";
import { IconButton } from "../../components/icon-button";
import { LoadingContainer } from "../../components/loading-container";
import { useStores } from "../../store";

import { TaskCard } from "./components/task-card";

export const TasksScreen: React.FC = observer(() => {
  const { classesStore, sessionsStore } = useStores();
  const navigation = useNavigation();

  const handleTaskCardPress = useCallback((task_id: string) => {
    if (!!classesStore.selectedClass) {
      classesStore.fetchTaskDetails({
        task_id,
      });
      navigation.navigate("taskDetail");
    }
  }, []);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);

    await classesStore.fetchClassTasks();
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (!!classesStore.selectedClass) {
      classesStore.fetchClassTasks(classesStore.selectedClass.id);
    }
  }, [classesStore.selectedClass]);

  return (
    <Screen unsafe errorMessage={classesStore.errorMessage}>
      <Container flex={1}>
        <UserCard />
        <LoadingContainer
          isLoading={classesStore.isLoading.tasks}
          padding={2}
          paddingBottom={0}
          flex={1}
        >
          <FlatList
            data={classesStore.selectedClass?.tasks}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TaskCard
                onPress={() => handleTaskCardPress(item.id)}
                taskInfo={item}
              />
            )}
            ListEmptyComponent={() => (
              <Container alignItems="center">
                <Text preset="secondary" marginTop={1}>
                  Nenhuma atividade cadastrada
                </Text>
              </Container>
            )}
          />
        </LoadingContainer>
        {sessionsStore.activeSession?.user?.role === "TEACHER" && (
          <IconButton
            icon="plus"
            position="absolute"
            borderRadius={32}
            iconSize={32}
            bottom={0}
            right={0}
            marginRight={4}
            marginBottom={4}
            paddingBottom={2}
            paddingLeft={2}
            paddingRight={2}
            paddingTop={2}
            onPress={() => navigation.navigate("newTask")}
          />
        )}
      </Container>
    </Screen>
  );
});
