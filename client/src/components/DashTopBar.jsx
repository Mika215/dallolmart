import React from "react";
import styled from "styled-components";
import {Settings} from "@material-ui/icons";

import {useSelector} from "react-redux";

const Container = styled.div`
  height: 68px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 999;

  background-color: white;
  // box-shadow: 1px 2px rgba(215,215,215,0.60);
  box-shadow: 0px 0px 8px 1.5px rgba(0, 0, 0, 0.5);
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
`;
const Logo = styled.h1``;

const Right = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const IconContainer = styled.li`
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px;
  cursor: pointer;
`;

const UserDisplayImg = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #9fa8da;
`;

const UserDisplayAvatar = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #9fa8da;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

const DashTopBar = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Container>
      <Left>
        <Logo>Dashboard</Logo>
      </Left>
      <Right>
        <IconContainer>
          {user.image ? (
            <UserDisplayImg src={user.image} alt={user.firstName} />
          ) : (
            <UserDisplayAvatar>
              {`${user.lastName}`
                ? `${user.firstName}`[0].toUpperCase() +
                  `${user.lastName}`[0].toUpperCase()
                : `${user.firstName}`[0].toUpperCase()}
            </UserDisplayAvatar>
          )}
        </IconContainer>
        <IconContainer>
          <Settings />
        </IconContainer>
      </Right>
    </Container>
  );
};

export default DashTopBar;
