import React from "react";
import { observer } from "mobx-react";

import { ProgressBar } from "../../components";
import { Container } from "../../components/container";
import { Divider } from "../../components/divider";
import { FeatherIcon } from "../../components/feather-icon";
import { Icon } from "../../components/icon/icon";
import { Screen } from "../../components/screen";
import { StatusLabel } from "../../components/status-label";
import { Text } from "../../components/text";
import { useStores } from "../../store";
import { formatDate } from "../../utils/date";

const TaskDetailScreen: React.FC = observer(() => {
  const { classesStore } = useStores();

  return (
    <Screen isLoading={classesStore.isLoading.taskDetails} unsafe scroll>
      {!!classesStore.taskDetail && (
        <Container flex={1} padding={4}>
          <StatusLabel type={classesStore.taskDetail.status} />
          <Text preset="title" marginTop={4}>
            {classesStore.taskDetail.title}
          </Text>
          <Container flex={1} marginTop={4}>
            <Container
              width="100%"
              flexDirection="row"
              justifyContent="space-between"
              marginBottom={4}
            >
              <Container>
                <Text preset="secondary">DATA DE ENTREGA</Text>
                <Container
                  flexDirection="row"
                  alignItems="center"
                  marginTop={2}
                >
                  <FeatherIcon name="calendar" size={14} marginRight="2" />
                  <Text>
                    {formatDate(
                      classesStore.taskDetail.delivery_date,
                      "dd/MM/yyyy '-' hh:mm"
                    )}
                  </Text>
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
                  {classesStore.taskDetail.task_elements.map((task_element) => (
                    <Icon
                      key={task_element.id}
                      marginRight={2}
                      uri={task_element.imageUrl}
                    />
                  ))}
                </Container>
              </Container>
            </Container>
          </Container>
          <Divider />
          <Text lineHeight={24} preset="secondary" marginTop={4}>
            {classesStore.taskDetail.description}
          </Text>
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
              <Container marginTop={4}>
                <Text marginBottom={2}>BONUS APLICADOS</Text>
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
              <Container marginTop={4}>
                <Text preset="title">Comentário do professor</Text>
                <Text marginTop={2}>
                  {classesStore.taskDetail.task_correction.comment}
                </Text>
              </Container>
            </Container>
          )}
        </Container>
      )}
    </Screen>
  );
});

export { TaskDetailScreen };
