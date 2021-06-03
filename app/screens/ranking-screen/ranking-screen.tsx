import React, { useState } from "react";

import { Screen, UserCard, Text, Avatar, Icon } from "../../components";

import {
  RankingTableContainer,
  Row,
  RankingNumberContainer,
  CoinContainer,
} from "./ranking-screen.styles";

const RankingScreen: React.FC = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      ranking: 1,
      name: "José Vinícius",
      coins: 120,
    },
    {
      id: 2,
      ranking: 2,
      name: "José Vinícius",
      coins: 100,
    },
    {
      id: 3,
      ranking: 3,
      name: "José Vinícius",
      coins: 90,
    },
    {
      id: 4,
      ranking: 4,
      name: "José Vinícius",
      coins: 89,
    },
    {
      id: 5,
      ranking: 5,
      name: "José Vinícius",
      coins: 89,
    },
    {
      id: 6,
      ranking: 6,
      name: "José Vinícius",
      coins: 89,
    },
    {
      id: 7,
      ranking: 7,
      name: "José Vinícius",
      coins: 89,
    },
    {
      id: 8,
      ranking: 8,
      name: "José Vinícius",
      coins: 89,
    },
  ]);

  return (
    <Screen unsafe>
      <UserCard />
      <RankingTableContainer>
        {students.map((student) => (
          <Row key={student.id}>
            <RankingNumberContainer isInPodium={student.ranking <= 3}>
              <Text>{student.ranking}</Text>
            </RankingNumberContainer>
            <Avatar />
            <Text marginLeft={6} style={{ flex: 1, maxWidth: "100%" }}>
              {student.name}
            </Text>
            <CoinContainer>
              <Icon name="coin" marginRight={2} />
              <Text>{student.coins}</Text>
            </CoinContainer>
          </Row>
        ))}
      </RankingTableContainer>
    </Screen>
  );
};

export default RankingScreen;
