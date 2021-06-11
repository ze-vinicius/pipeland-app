import React from "react";

import { Avatar } from "../avatar";
import { ProgressBar } from "../progress-bar";
import { Text } from "../text";

import {
  Container,
  UserAvatarContainer,
  UserInfoContainer,
  GameElementsList,
  GameElementContainer,
} from "./user-card.styles";
import { Icon } from "../icon/icon";
import { useStores } from "../../store";
import { observer } from "mobx-react";

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
    <Container>
      <UserAvatarContainer>
        <Avatar size={64} uri={classesStore.selectedClass.student_info.photo} />
        <GameElementContainer>
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
        </GameElementContainer>
      </UserAvatarContainer>
      <UserInfoContainer>
        <Text preset="title">
          {classesStore.selectedClass.student_info.nickname ||
            classesStore.selectedClass.student_info.student_name}
        </Text>
        <ProgressBar
          currentPoints={
            classesStore.selectedClass.student_info.current_coinst_qty
          }
          totalPoints={classesStore.selectedClass.coins_max}
        />
        <GameElementsList>
          <GameElementContainer>
            <Icon marginRight={2} name="mushroomUp" />
            <Text>
              {classesStore.selectedClass.student_info.current_mushroom_ups_qty}
            </Text>
          </GameElementContainer>
          {/* <GameElementContainer>
            <Icon marginRight={2} name="cherry" />
            <Text>2</Text>
          </GameElementContainer> */}
        </GameElementsList>
      </UserInfoContainer>
    </Container>
  );
});
