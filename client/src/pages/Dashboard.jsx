import React from "react";
import styled from "styled-components";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import DashSideBar from "../components/DashSideBar";
import DashTopBar from "../components/DashTopBar";
import DashHome from "./DashHome";
import Login from "./Login";
import SingleUser from "./SingleUser";
import DashAddUser from "../components/DashAddUser";
import {useSelector} from "react-redux";
import UsersDataGrid from "./UsersDataGrid";
import ProductsDataGrid from "./ProductsDataGrid";
import DashAddProduct from "../components/DashAddProduct";
import SingleProduct from "./SingleProduct";


const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Dashboard = () => {
  const user = useSelector((state) => state.user.currentUser);

  // console.log(user);

  return (
    <Router>
      <Container>
        <DashTopBar />
        <DashSideBar />
        <Switch>
          <Route exact path="/admin">
            {user ? user.isAdmin ? <DashHome /> : <Login /> : null}
          </Route>
        
          <Route exact path="/admin/user/:userId">
            <SingleUser />
          </Route>
          <Route exact path="/admin/product/:productId">
            <SingleProduct />
        
          </Route>
          <Route exact path="/admin/users/newuser">
            <DashAddUser />
          </Route>
          <Route exact path="/admin/products/newproduct">
            <DashAddProduct />
          </Route>

          <Route exact path="/admin/users">
            <UsersDataGrid />
          </Route>
          <Route exact path="/admin/products">
            <ProductsDataGrid />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default Dashboard;
