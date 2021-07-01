import React from "react";
import { observer } from "mobx-react";
import { useNavigation } from "@react-navigation/native";

import {
  ProgressBar,
  Container,
  Divider,
  FeatherIcon,
  Icon,
  Screen,
  StatusLabel,
  Text,
  AutoHeightWebvView,
  Button,
} from "../../components";
import { useStores } from "../../store";
import { formatDate } from "../../utils/date";
import { isAfter } from "date-fns/esm";

const TaskDetailScreen: React.FC = observer(() => {
  const { classesStore, sessionsStore } = useStores();
  const navigation = useNavigation();

  return (
    <Screen isLoading={classesStore.isLoading.taskDetails} unsafe>
      {!!classesStore.taskDetail && (
        <Container flex={1}>
          <Container flex={1} padding={4} height="100%" scroll>
            <StatusLabel type={classesStore.taskDetail.status} />
            <Text preset="title" marginTop={4}>
              {classesStore.taskDetail.title}
            </Text>
            <Container marginTop={4}>
              <Container
                width="100%"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={4}
              >
                <Container flex={1}>
                  <Text preset="secondary" marginBottom={2}>
                    PERÍODO DE ENTREGA
                  </Text>
                  <Container flexDirection="row" alignItems="center">
                    <Container flexDirection="row" alignItems="center">
                      <FeatherIcon name="calendar" marginRight={2} size={14} />
                      <Text>
                        {formatDate(
                          classesStore.taskDetail.create_date,
                          "dd/MM/yyyy '-' hh:mm"
                        )}
                      </Text>
                    </Container>

                    <FeatherIcon
                      name="arrow-right"
                      marginHorizontal={2}
                      color="textSecondary"
                      marginRight={2}
                      size={14}
                    />

                    <Container flexDirection="row" alignItems="center">
                      <FeatherIcon name="calendar" marginRight={2} size={14} />
                      <Text>
                        {formatDate(
                          classesStore.taskDetail.delivery_date,
                          "dd/MM/yyyy '-' hh:mm"
                        )}
                      </Text>
                    </Container>
                  </Container>
                </Container>
              </Container>
              <Container
                width="100%"
                flexDirection="row"
                justifyContent="space-between"
                marginBottom={4}
              >
                <Container>
                  <Text preset="secondary">ELEMENTOS DA ATIVIDADE</Text>
                  <Container
                    flexDirection="row"
                    alignItems="center"
                    marginTop={2}
                  >
                    {classesStore.taskDetail.task_elements.map(
                      (task_element) => (
                        <Icon
                          key={task_element.id}
                          marginRight={2}
                          uri={task_element.imageUrl}
                        />
                      )
                    )}
                  </Container>
                </Container>
                <Container>
                  <Text preset="secondary">COINS</Text>
                  <Container
                    flexDirection="row"
                    alignItems="center"
                    marginTop={2}
                  >
                    <Icon name="coin" />
                    <Text> {classesStore.taskDetail.task_value}</Text>
                  </Container>
                </Container>
              </Container>
            </Container>
            <Divider height={1} />
            <Container flex={1} marginTop={4}>
              <AutoHeightWebvView html={classesStore.taskDetail.description} />
            </Container>

            {classesStore.taskDetail.task_correction && (
              <Container>
                <Text preset="header" marginTop={4}>
                  Correção
                </Text>
                <ProgressBar
                  totalPoints={classesStore.taskDetail.task_value}
                  currentPoints={
                    classesStore.taskDetail.task_correction.earned_coins
                  }
                />
                <Container marginTop={4}>
                  <Text marginBottom={2}>PENALIDADES APLICADAS</Text>
                  <Container flexDirection="row">
                    {!classesStore.taskDetail.task_correction.applied_penalties
                      .length ? (
                      <Text preset="secondary">
                        Nenhuma penalidade foi aplicada
                      </Text>
                    ) : (
                      classesStore.taskDetail.task_correction.applied_penalties.map(
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
                <Container marginTop={4}>
                  <Text marginBottom={2}>BONUS APLICADOS</Text>
                  <Container flexDirection="row">
                    {!classesStore.taskDetail.task_correction.applied_bonuses
                      .length ? (
                      <Text preset="secondary">Nenhum bônus foi aplicado</Text>
                    ) : (
                      classesStore.taskDetail.task_correction.applied_bonuses.map(
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
                <Container marginTop={4}>
                  <Text preset="title">Comentário do professor</Text>
                  <Container flex={1} marginTop={2}>
                    <AutoHeightWebvView
                      html={classesStore.taskDetail.task_correction.comment}
                    />
                  </Container>
                </Container>
              </Container>
            )}
          </Container>
          {sessionsStore.activeSession?.user?.role === "TEACHER" &&
            isAfter(
              new Date(),
              new Date(classesStore.taskDetail.delivery_date)
            ) && (
              <Container
                borderTopColor="line"
                borderTopWidth={1}
                backgroundColor="white"
                padding={4}
              >
                <Button
                  onPress={() => navigation.navigate("taskCorrections")}
                  marginHorizontal={4}
                  marginBottom={4}
                  icon="corner-down-right"
                >
                  Correções
                </Button>
              </Container>
            )}
        </Container>
      )}
    </Screen>
  );
});

export { TaskDetailScreen };
