import React from "react";

import { Avatar } from "../avatar";
import { ProgressBar } from "../progress-bar";
import { Text } from "../text";

import {
  CardContainer,
  UserAvatarContainer,
  UserInfoContainer,
  GameElementsList,
  GameElementContainer,
} from "./user-card.styles";
import { Icon } from "../icon/icon";
import { useStores } from "../../store";
import { observer } from "mobx-react";

import { Container } from "../container";

const marioAvatars = {
  mario: "Mario",
  superMario: "Super Mario",
  fireMario: "Fire Mario",
  capeMario: "Cape Mario",
};

export const UserCard = observer(() => {
  const { classesStore } = useStores();

  if (!classesStore.selectedClass || !classesStore.selectedClass.student_info)
    return null;

  return (
    <CardContainer>
      <Container alignItems="center" justifyContent="center">
        <Avatar size={80} uri={classesStore.selectedClass.student_info.photo} />
        {/* <GameElementContainer>
          <Icon
            name={classesStore.selectedClass.student_info.current_avatar}
            marginRight={2}
          />
          <Text>
            {
              marioAvatars[
                classesStore.selectedClass.student_info.current_avatar
              ]
            }
          </Text>
        </GameElementContainer> */}
      </Container>
      <UserInfoContainer>
        <Container flexDirection="row" alignItems="center" width="100%">
          <Text preset="title" flexShrink={1} numberOfLines={1}>
            {classesStore.selectedClass.student_info.nickname ||
              classesStore.selectedClass.student_info.student_name}
          </Text>
          <Icon
            name={classesStore.selectedClass.student_info.current_avatar}
            marginLeft={2}
            size={16}
          />
        </Container>
        <ProgressBar
          currentPoints={
            classesStore.selectedClass.student_info.current_coinst_qty
          }
          totalPoints={classesStore.selectedClass.coins_max}
        />
        <GameElementsList>
          <Container flexDirection="row" alignItems="center">
            <Icon marginRight={2} name="attendanceAnchor" />
            <Text>
              {classesStore.selectedClass.student_info.attendances_count}
            </Text>
          </Container>
          <Container flexDirection="row" alignItems="center" marginLeft={4}>
            <Icon marginRight={2} name="mushroomUp" />
            <Text>
              {classesStore.selectedClass.student_info.current_mushroom_ups_qty}
            </Text>
          </Container>
        </GameElementsList>
      </UserInfoContainer>
    </CardContainer>
  );
});
