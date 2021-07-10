import React, { useEffect, useCallback, useState } from "react";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "../../components/screen";
import { ClassCard } from "./components/class-card";
import { Container } from "../../components/container";
import { useStores } from "../../store";

// import { Container } from "./classes-screen.styles";
import { IconButton } from "../../components/icon-button";
import { FlatList } from "react-native";
import { DrawerMenu } from "../../components/drawer-menu";
import { Text } from "../../components";

export const ClassesScreen: React.FC = observer(() => {
  const navigation = useNavigation();

  const { classesStore, sessionsStore } = useStores();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchAsync = async () => {
      await classesStore.fetchClasses();
    };

    fetchAsync();
  }, []);

  const handleOpenClass = useCallback((classId: string) => {
    classesStore.fetchClassDetails(classId);
    navigation.navigate("class");
  }, []);

  const handleNavigate = useCallback(() => {
    if (sessionsStore.activeSession?.user?.role === "TEACHER") {
      navigation.navigate("newClass");
    } else {
      navigation.navigate("joinClass");
    }
  }, [sessionsStore.activeSession]);

  const onRefresh = async () => {
    setRefreshing(true);
    await classesStore.fetchClasses();
    setRefreshing(false);
  };

  return (
    <Screen unsafe isLoading={classesStore.isLoading.classes}>
      <Container flex={1} height={"100%"} padding={2}>
        <DrawerMenu />

        <FlatList
          data={classesStore.classes}
          keyExtractor={(item) => item.id}
          onRefresh={onRefresh}
          refreshing={refreshing}
          renderItem={({ item: c }) => (
            <ClassCard
              key={c.id}
              classInfo={c}
              onPress={() => handleOpenClass(c.id)}
            />
          )}
          ListEmptyComponent={() => (
            <Container alignItems="center">
              <Text preset="secondary" marginTop={1}>
                Você está vinculado em nenhuma classe
              </Text>
            </Container>
          )}
        />
      </Container>
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
        onPress={handleNavigate}
      />
    </Screen>
  );
});
