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

    await Promise.all([
      classesStore.selectedClass?.fetchRanking(),
      classesStore.fetchStudentCard(),
    ]);
    setIsRefreshing(false);
  };

  useEffect(() => {
    classesStore.selectedClass?.fetchRanking();
  }, [classesStore.selectedClass]);

  return (
    <Screen unsafe errorMessage={classesStore.errorMessage}>
      <UserCard />
      <LoadingContainer
        flex={1}
        isLoading={classesStore.isLoading.classRanking}
      >
        <FlatList
          data={classesStore.selectedClass?.classRanking}
          keyExtractor={(item) => item.studentId}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          renderItem={({ item: student }) => (
            <Container
              flexDirection="row"
              paddingVertical={student.rankingPosition <= 3 ? 4 : 1}
              backgroundColor={student.rankingPosition > 3 ? "line" : "white"}
              alignItems="center"
              key={student.studentId}
              borderBottomWidth={1}
              borderBottomColor={student.rankingPosition >= 3 ? "dim" : "line"}
            >
              <RankingNumberContainer ranking={student.rankingPosition}>
                <Text color={student.rankingPosition <= 3 ? "white" : "text"}>
                  {student.rankingPosition}
                </Text>
              </RankingNumberContainer>
              <Avatar name={student.name} uri={student.photo_url} />
              <Text marginLeft={4} flex={1} numberOfLines={1}>
                {student.name}
              </Text>
              <CoinContainer>
                <Icon name="coin" marginRight={2} />
                <Text>{student.currentCoinsQty}</Text>
              </CoinContainer>
            </Container>
          )}
        />
      </LoadingContainer>
    </Screen>
  );
});

export { RankingScreen };
