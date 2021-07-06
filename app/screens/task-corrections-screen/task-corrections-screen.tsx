import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";

import { FlatList, TouchableOpacity } from "react-native";
import {
  AutoHeightWebvView,
  Avatar,
  Container,
  Icon,
  ProgressBar,
  Screen,
  Text,
} from "../../components";
import { useStores } from "../../store";

// import { Container } from './styles';

const TaskCorrectionsScreen: React.FC = observer(() => {
  const { classesStore } = useStores();
  const navigation = useNavigation();

  useEffect(() => {
    classesStore.fetchTaskCorrections();
  }, [classesStore.taskDetail]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await classesStore.fetchClassRanking();
    setIsRefreshing(false);
  };

  return (
    <Screen>
      <Container flex={1}>
        <FlatList
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          data={classesStore.taskDetail?.students_task_corrections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("correctTask", {
                  student_id: item.id,
                })
              }
              disabled={!!item.task_correction}
            >
              <Container
                shadow
                backgroundColor="background"
                padding={4}
                marginHorizontal={4}
                marginVertical={2}
                flexDirection="row"
                borderRadius={4}
              >
                <Container flex={1}>
                  <Container flexDirection="row" alignItems="center">
                    <Container marginRight={4}>
                      <Avatar name={item.name} uri={item.photo} />
                    </Container>
                    <Text>{item.name}</Text>
                  </Container>
                  {item.task_correction && (
                    <>
                      <Text preset="title" marginTop={4} marginBottom={2}>
                        Correção
                      </Text>
                      <ProgressBar
                        totalPoints={classesStore.taskDetail?.task_value || 0}
                        currentPoints={item.task_correction.earned_coins}
                      />
                      <Container marginTop={4}>
                        <Text preset="subtitle">Comentário</Text>
                        <Container marginTop={2}>
                          <AutoHeightWebvView
                            html={item.task_correction.comment}
                          />
                        </Container>
                      </Container>
                      <Container marginTop={4} flexDirection="row">
                        <Container marginRight={2} flex={1}>
                          <Text preset="secondary" marginBottom={2}>
                            PENALIDADES
                          </Text>
                          <Container flexDirection="row">
                            {!item.task_correction.applied_penalties.length ? (
                              <Text preset="secondary">Vazio</Text>
                            ) : (
                              item.task_correction.applied_penalties.map(
                                (applied_penalty) => (
                                  <Icon
                                    key={applied_penalty.id}
                                    marginRight={2}
                                    uri={applied_penalty.imageUrl}
                                  />
                                )
                              )
                            )}
                          </Container>
                        </Container>
                        <Container marginLeft={2} flex={1}>
                          <Text preset="secondary" marginBottom={2}>
                            RECOMPENSAS
                          </Text>
                          <Container flexDirection="row">
                            {!item.task_correction.applied_bonuses.length ? (
                              <Text preset="secondary">Vazio</Text>
                            ) : (
                              item.task_correction.applied_bonuses.map(
                                (applied_bonus) => (
                                  <Icon
                                    key={applied_bonus.id}
                                    marginRight={2}
                                    uri={applied_bonus.imageUrl}
                                  />
                                )
                              )
                            )}
                          </Container>
                        </Container>
                      </Container>
                    </>
                  )}
                </Container>
              </Container>
            </TouchableOpacity>
          )}
        />
      </Container>
    </Screen>
  );
});

export { TaskCorrectionsScreen };
