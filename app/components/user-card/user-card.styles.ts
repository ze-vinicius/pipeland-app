import styled from "styled-components/native";

export const Container = styled.View`
  padding-horizontal: 32px;
  padding-vertical: 24px;
  flex-direction: row;

  background-color: ${(props) => props.theme.color.background};
  shadow-color: #000;
  shadow-offset: 0 1px;
  shadow-opacity: 0.18;
  shadow-radius: 1px;
  elevation: 1;
`;

export const UserAvatarContainer = styled.View`
  justify-content: space-between;
`;

export const UserInfoContainer = styled.View`
  flex: 1;
  margin-left: 32px;
`;

export const GameElementsList = styled.View`
  flex-direction: row;
  margin-top: 16px;
  justify-content: flex-end;
`;

export const GameElementContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
