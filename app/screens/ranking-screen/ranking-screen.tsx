import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { FlatList, View, ViewStyle } from "react-native";

import { Screen, UserCard, Text, Avatar, Icon } from "../../components";
import { Container } from "../../components/container";
import { LoadingContainer } from "../../components/loading-container";
import { useStores } from "../../store";

import { RankingNumberContainer, CoinContainer } from "./ranking-screen.styles";

const RankingScreen: React.FC = observer(() => {
  const { classesStore } = useStores();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    if (classesStore.selectedClass && classesStore.selectedClass.student_info) {
      await classesStore.fetchStudentCard();
    }
    await classesStore.fetchClassRanking();
    setIsRefreshing(false);
  };

  useEffect(() => {
    classesStore.fetchClassRanking();
  }, [classesStore.selectedClass]);

  return (
    <Screen unsafe>
      <UserCard />
      <LoadingContainer
        flex={1}
        isLoading={classesStore.isLoading.classRanking}
      >
        <FlatList
          data={classesStore.selectedClass?.classRanking}
          keyExtractor={(item) => item.student_id}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          renderItem={({ item: student }) => (
            <Container
              flexDirection="row"
              paddingVertical={student.ranking <= 3 ? 4 : 1}
              backgroundColor={student.ranking > 3 ? "line" : "white"}
              alignItems="center"
              key={student.student_id}
              borderBottomWidth={1}
              borderBottomColor={student.ranking >= 3 ? "dim" : "line"}
            >
              <RankingNumberContainer ranking={student.ranking}>
                <Text color={student.ranking <= 3 ? "white" : "text"}>
                  {student.ranking}
                </Text>
              </RankingNumberContainer>
              <Avatar />
              <Text marginLeft={4} flex={1} numberOfLines={1}>
                {student.name}
              </Text>
              <CoinContainer>
                <Icon name="coin" marginRight={2} />
                <Text>{student.current_coins_qty}</Text>
              </CoinContainer>
            </Container>
          )}
        />
      </LoadingContainer>
    </Screen>
  );
});

export { RankingScreen };
