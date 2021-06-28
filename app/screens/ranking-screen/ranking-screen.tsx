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
              paddingVertical={4}
              alignItems="center"
              key={student.student_id}
              borderBottomWidth={1}
              borderBottomColor="line"
            >
              <RankingNumberContainer isInPodium={student.ranking <= 3}>
                <Text>{student.ranking}</Text>
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
