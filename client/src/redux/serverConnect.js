import {
    loginStart,
    loginSuccess,
    loginFailure,
    logedout,
    getUserStart,
    getUserSuccess,
    getUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    createUserStart,
    createUserSuccess,
    createUserFailure,
  } from "./userRedux";
  import {
    getProductStart,
    getProductSuccess,
    getProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,
  } from "./productRedux";
  
  import {authRequest} from "../requestMethods";
  import {publicRequest} from "../requestMethods";
  
  //Login
  export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await publicRequest.post("users/login", user);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  };
  //Logout
  export const logout = async (dispatch, user) => {
    dispatch(logedout());
    try {
      const res = await publicRequest.post("users/logout"); //!thrawing an error Cannot set headers after they are sent to the client
      dispatch(logedout(res.data));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  //Get Products
  export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
      const res = await publicRequest.get("products");
      dispatch(getProductSuccess(res.data));
    } catch (err) {
      dispatch(getProductFailure());
    }
  };
  
  //Delete Products
  export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
      const res = await authRequest.delete(`products/${id}`); //! this works well but need to make a confirmation system before deleting the item from database
      console.log(res.data);
      dispatch(deleteProductSuccess(res.data));
    } catch (err) {
      dispatch(deleteProductFailure());
    }
  };
  
  //Update Products
  export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
      const res = await authRequest.put(`products/${id}`, product);
      console.log(res.data);
      dispatch(updateProductSuccess(res.data));
    } catch (err) {
      dispatch(updateProductFailure());
    }
  };
  
  //Add Products
  export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
      const res = await authRequest.post("/products/add", product);
      console.log(res.data);
      dispatch(addProductSuccess(res.data));
    } catch (err) {
      dispatch(addProductFailure());
    }
  };
  
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  //Get Users
  export const getUsers = async (dispatch) => {
    dispatch(getUserStart());
    try {
      const res = await authRequest.get("users");
      dispatch(getUserSuccess(res.data));
    } catch (err) {
      dispatch(getUserFailure());
    }
  };
  
  //Delete Users
  export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
      const res = await authRequest.delete(`users/${id}`); //! this works well but need to make a confirmation system before deleting the item from database
      console.log(res.data);
      dispatch(deleteUserSuccess(res.data));
    } catch (err) {
      dispatch(deleteUserFailure());
    }
  };
  
  //Update user
  export const updateUser = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try {
      const res = await authRequest.put(`users/${id}`, user);
      console.log(res.data);
      dispatch(updateUserSuccess(res.data));
    } catch (err) {
      dispatch(updateUserFailure());
    }
  };
  
  //Create User
  export const createUser = async (user, dispatch) => {
    dispatch(createUserStart());
    try {
      const res = await authRequest.post("/users/register", user);
      console.log(res.data);
      dispatch(createUserSuccess(res.data));
    } catch (err) {
      dispatch(createUserFailure());
    }
  };
  