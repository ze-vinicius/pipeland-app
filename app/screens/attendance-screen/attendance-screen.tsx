import React, { useEffect, useState } from "react";
import { Switch } from "react-native";

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
    classesStore.selectedClass?.fetchDayAttendanceList(date);
  }, [classesStore.selectedClass, date]);

  const isSaved = classesStore.selectedClass?.selectedAttendanceList?.isSaved;

  const students =
    classesStore.selectedClass?.selectedAttendanceListDetails?.students;

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
                key={student.studentId}
                scroll
              >
                <Avatar name={student.name} uri={student.photoUrl} />
                <Text marginLeft={6} flex={1}>
                  {student.name}
                </Text>
                <Switch
                  value={student.isPresent}
                  onValueChange={() =>
                    classesStore.handleChangeStudentAttendance({
                      isPresent: !student.isPresent,
                      studentId: student.studentId,
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
          <Button
            onPress={() => classesStore.selectedClass?.saveDayAttendanceList()}
          >
            {`${isSaved ? "Atualizar" : "Registrar"} lista de presença`}
          </Button>
        </Container>
      </Container>
    </Screen>
  );
});

export { AttendanceScreen };
