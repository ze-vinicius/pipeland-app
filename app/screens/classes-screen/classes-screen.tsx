import React, { useEffect, useCallback } from "react";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";

import { Screen } from "../../components/screen";
import { ClassCard } from "./components/class-card";
import { useStores } from "../../store";

import { Container } from "./classes-screen.styles";

export const ClassesScreen: React.FC = observer(() => {
  const navigation = useNavigation();

  const { classesStore, sessionsStore } = useStores();

  useEffect(() => {
    const fetchAsync = async () => {
      await sessionsStore.login({ email: "", password: "" });
      await classesStore.fetchClasses();
    };

    fetchAsync();
  }, []);

  const handleOpenClass = useCallback((classId: string) => {
    classesStore.fetchClassInfo(classId);
    navigation.navigate("class");
  }, []);

  return (
    <Screen unsafe isLoading={classesStore.isLoading}>
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
    </Screen>
  );
});
