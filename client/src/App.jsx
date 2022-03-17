import "./App.css";
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"; //!switch is only available in "npm i react-router-dom@5.3.0" other versions doens't support it?
import {useSelector} from "react-redux";

import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductsList from "./pages/ProductsList";
import Pay from "./pages/Pay";
import Success from "./pages/Success";
import Login from "./pages/Login";

// import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import Forbidden from "./pages/Forbidden";
import AccountActivation from "./pages/AccountActivation";
import ActivationEmailSent from "./pages/ActivationEmailSent";
import Register from "./pages/Register";
import MyProfile from "./pages/MyProfile";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products">
            <ProductsList />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route exact path="/register">
          <Register />
          </Route>
          <Route path="/login">
      
            <Login />
          </Route>

         
          {/* <Route path="/logout">
            <Logout />
            //!check again if the logout Page is important it has already handled on the NavBar
          </Route> */} 
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/pay">
            <Pay />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/users/myprofile/:id">
            <MyProfile />
          </Route>
          <Route path="/register/activation/:token">
            <AccountActivation />
          </Route>
          <Route path="/register/activationemailsent">
            <ActivationEmailSent />
          </Route>
          <Route path="/forgotpassword">
            <Forbidden />
          </Route>
          <Route path="/admin">
            {/* //!this is very helpfull but it keeps the isFetching state permanently true and can not login while is fetching */}
            {user ? user.isAdmin ? <Dashboard /> : <Login /> : <Forbidden />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
