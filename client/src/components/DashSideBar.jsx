import React from "react";
import styled from "styled-components";
import {
  Home,
  PeopleOutline,
  CardGiftcard,
  ShoppingCart,
  MailOutline,
  Settings,
  Autorenew,
  TrendingUp,
  FolderOpen,
  FavoriteBorder,
  NotificationImportant,
} from "@material-ui/icons";
import {Link} from "react-router-dom";

const Container = styled.div`
  background-color: lightgray;
  height: 100vh;
  width: 15%;
  position: fixed;
  top: 68px;
  left: 0;
  padding-top: 40px;
  color: #444;
  box-shadow: 0px 0px 12px 2.5px rgba(0, 0, 0, 0.55);
`;
const Wrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: start;
  // justify-content: space-between;
  margin-top: 20px;
`;

const MenuSection = styled.div`
  margin-bottom: 10px;
`;
const SidebarTitle = styled.h3`
  font-size: 13px;
  color: #607d8b;
  opacity: 0.5;
`;

const ItemsContainer = styled.ul`
  list-style-type: none;
  padding: 5px;
`;
const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    background-color: #607d8b;
    color: white;
    transition: all 0.4s ease-out;
    box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.25);
  }
  &:active {
    // background-color:#607d8b;
    color: red;
    // box-shadow: 0px 0px 16px 3px rgba(0, 0, 0, 0.25);
    // // transition: all 0.4s ease-out;
  }
`;

const DashSideBar = () => {
  return (
    <Container>
      <Wrapper>
        <MenuSection>
          <SidebarTitle>Main Section</SidebarTitle>
          <ItemsContainer>
            <Link style={{textDecoration: "none", color: "#444"}} to="/admin">
              <Item>
                <Home style={{marginRight: "20px", fontSize: "20px"}} />
                Home
              </Item>
            </Link>
            <Link
              style={{textDecoration: "none", color: "#444"}}
              to="/admin/users"
            >
              <Item>
                <PeopleOutline
                  style={{marginRight: "20px", fontSize: "20px"}}
                />
                Users
              </Item>
            </Link>
            <Link
              style={{textDecoration: "none", color: "#444"}}
              to="/admin/products"
            >
              <Item>
                <CardGiftcard style={{marginRight: "20px", fontSize: "20px"}} />
                Products
              </Item>
            </Link>
          </ItemsContainer>
        </MenuSection>
        <MenuSection>
          <SidebarTitle>Sales</SidebarTitle>
          <ItemsContainer>
            <Item>
              <ShoppingCart style={{marginRight: "20px", fontSize: "20px"}} />
              Cart
            </Item>
            <Item>
              <TrendingUp style={{marginRight: "20px", fontSize: "20px"}} />
              Orders
            </Item>
            <Item>
              <CardGiftcard style={{marginRight: "20px", fontSize: "20px"}} />
              Whishlist
            </Item>
          </ItemsContainer>
        </MenuSection>
        <MenuSection>
          <SidebarTitle>Communication</SidebarTitle>
          <ItemsContainer>
            <Item>
              <MailOutline style={{marginRight: "20px", fontSize: "20px"}} />
              Email
            </Item>
            <Item>
              <FavoriteBorder style={{marginRight: "20px", fontSize: "20px"}} />
              Liked products
            </Item>
            <Item>
              <NotificationImportant
                style={{marginRight: "20px", fontSize: "20px"}}
              />
              Important
            </Item>
          </ItemsContainer>
        </MenuSection>
        <MenuSection>
          <SidebarTitle>Others</SidebarTitle>
          <ItemsContainer>
            <Item>
              <FolderOpen style={{marginRight: "20px", fontSize: "20px"}} />
              Saved-data
            </Item>

            <Item>
              <Autorenew style={{marginRight: "20px", fontSize: "20px"}} />
              Rebase
            </Item>
            <Item>
              <Settings style={{marginRight: "20px", fontSize: "20px"}} />
              Settings
            </Item>
          </ItemsContainer>
        </MenuSection>
      </Wrapper>
    </Container>
  );
};

export default DashSideBar;
