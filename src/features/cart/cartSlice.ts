import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [] as CartItem[],
  total: 0,
  quantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (state.products.find((product) => product._id === action.payload._id)) return;

      state.products.push({ ...action.payload, quantity: 1 });
      state.quantity += 1;
      let temp = state.products
        .reduce((acc, product) => acc + product.price, 0)
        .toFixed(2);
      state.total = Number(temp);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.quantity = state.products.length;
      let temp = state.products
        .reduce((acc, product) => acc + product.price, 0)
        .toFixed(2);
      state.total = Number(temp);
    },
    increaseQuantity: (state, action) => {
      const productNeedToUpdate = state.products.find(
        (product) => product._id === action.payload
      );
      if (productNeedToUpdate) {
        productNeedToUpdate.quantity += 1;
      }
      state.quantity += 1;
      let temp = state.products
        .reduce((acc, product) => acc + product.price * product.quantity, 0)
        .toFixed(2);
      state.total = Number(temp);
    },
    decreaseQuantity: (state, action) => {
      const productNeedToUpdate = state.products.find(
        (product) => product._id === action.payload
      );
      if (productNeedToUpdate && productNeedToUpdate.quantity > 1) {
        productNeedToUpdate.quantity -= 1;
      }
      state.quantity -= 1;
      let temp = state.products
        .reduce((acc, product) => acc + product.price * product.quantity, 0)
        .toFixed(2);
      state.total = Number(temp);
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    }
  },
});

export const {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  reset
} = cartSlice.actions;

export default cartSlice.reducer;
