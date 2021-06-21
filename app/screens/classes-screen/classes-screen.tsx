import React, { useEffect, useCallback } from "react";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "../../components/screen";
import { ClassCard } from "./components/class-card";
import { useStores } from "../../store";

import { Container } from "./classes-screen.styles";
import { IconButton } from "../../components/icon-button";

export const ClassesScreen: React.FC = observer(() => {
  const navigation = useNavigation();

  const { classesStore, sessionsStore } = useStores();

  useEffect(() => {
    const fetchAsync = async () => {
      await classesStore.fetchClasses();
    };

    fetchAsync();
  }, []);

  const handleOpenClass = useCallback((classId: string) => {
    classesStore.fetchClassInfo(classId);
    navigation.navigate("class");
  }, []);

  const handleNavigate = useCallback(() => {
    if (sessionsStore.activeSession?.user?.role === "TEACHER") {
      navigation.navigate("newClass");
    } else {
      navigation.navigate("joinClass");
    }
  }, [sessionsStore.activeSession]);

  return (
    <Screen unsafe isLoading={classesStore.isLoading.classes}>
      <Container>
        {classesStore.classes.length > 0 &&
          classesStore.classes.map((c) => (
            <ClassCard
              key={c.id}
              classInfo={c}
              onPress={() => handleOpenClass(c.id)}
            />
          ))}
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
