import React, { useEffect, useMemo, useState } from "react";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import {
  FlatList,
  Platform,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";

import { Avatar, Screen, Text } from "../../components";
import { Container } from "../../components/container";
import { formatDate } from "../../utils/date";
import { FeatherIcon } from "../../components/feather-icon";
import { Button } from "../../components/button";
import { observer } from "mobx-react";
import { useStores } from "../../store";
import { LoadingContainer } from "../../components/loading-container";

const AttendanceScreen: React.FC = observer(() => {
  const { classesStore } = useStores();
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const today = new Date();

  const handleDateChance = (event: Event, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  useEffect(() => {
    classesStore.fetchDayAttendanceList(date);
  }, [classesStore.selectedClass, date]);

  const students =
    classesStore.selectedClass?.selectedDayAttendanceList?.students;

  return (
    <Screen unsafe>
      <Container padding={4} flex={1}>
        <TouchableOpacity onPress={() => setShow(!show)}>
          <Container
            paddingHorizontal={4}
            paddingVertical={2}
            borderColor="line"
            borderWidth={2}
            alignItems="center"
            flexDirection="row"
            borderRadius={4}
          >
            <FeatherIcon name="calendar" marginRight="4" size={16} />
            <Text>{formatDate(date)}</Text>
          </Container>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChance}
            maximumDate={today}
          />
        )}
        <LoadingContainer
          isLoading={classesStore.isLoading.attendance}
          marginTop={6}
          flex={1}
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
        <Button onPress={() => classesStore.saveDayAttendanceList()}>
          Salvar
        </Button>
      </Container>
    </Screen>
  );
});

export { AttendanceScreen };
