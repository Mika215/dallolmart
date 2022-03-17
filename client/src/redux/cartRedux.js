import {createSlice} from "@reduxjs/toolkit";
//creating our Slices and reducers
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.totalAmount += action.payload.price * action.payload.quantity;
    },
  },
});
//should be then exported to later access them in other components of our app
export const {addProduct} = cartSlice.actions;
export default cartSlice.reducer;
