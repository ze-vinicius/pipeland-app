import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Platform,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";

import { Avatar, Screen, Text, DateTimePicker } from "../../components";
import { Container } from "../../components/container";
import { Button } from "../../components/button";
import { observer } from "mobx-react";
import { useStores } from "../../store";
import { LoadingContainer } from "../../components/loading-container";

const AttendanceScreen: React.FC = observer(() => {
  const { classesStore } = useStores();
  const [date, setDate] = useState(new Date());
  const today = new Date();

  const handleDateChance = (selectedDate?: Date) => {
    setDate(selectedDate || date);
  };

  useEffect(() => {
    classesStore.fetchDayAttendanceList(date);
  }, [classesStore.selectedClass, date]);

  const isSaved =
    classesStore.selectedClass?.selectedDayAttendanceList?.is_saved;
  const students =
    classesStore.selectedClass?.selectedDayAttendanceList?.students;

  return (
    <Screen unsafe errorMessage={classesStore.errorMessage}>
      <Container flex={1}>
        <Container padding={4} shadow>
          <DateTimePicker
            value={date}
            onChange={handleDateChance}
            maximumDate={today}
          />
        </Container>
        <LoadingContainer
          isLoading={classesStore.isLoading.attendance}
          flex={1}
          marginTop={2}
        >
          <Container scroll>
            {students?.map((student) => (
              <Container
                flexDirection="row"
                alignItems="center"
                paddingVertical={4}
                paddingHorizontal={4}
                key={student.student_id}
                scroll
              >
                <Avatar uri={student.photo} />
                <Text marginLeft={6} flex={1}>
                  {student.name}
                </Text>
                <Switch
                  value={student.is_present}
                  onValueChange={() =>
                    classesStore.handleChangeStudentAttendance({
                      is_present: !student.is_present,
                      student_id: student.student_id,
                    })
                  }
                />
              </Container>
            ))}
          </Container>
        </LoadingContainer>
        <Container
          backgroundColor="white"
          padding={4}
          borderTopColor="line"
          borderTopWidth={1}
        >
          <Button onPress={() => classesStore.saveDayAttendanceList()}>
            {`${isSaved ? "Atualizar" : "Registrar"} lista de presença`}
          </Button>
        </Container>
      </Container>
    </Screen>
  );
});

export { AttendanceScreen };
