import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {Provider} from "react-redux";
import {store,persistor} from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  //Wrraping the whole app with Provider enables as to access our store all over our app 
  <Provider store={store}>
    {/* //! the persist gate inables us to keep data persisted in the memory throughout a given session */}
    <PersistGate loading={null} persistor={persistor}></PersistGate> 

    <App />
  </Provider>,

  document.getElementById("root")
);
