import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: {
    _id: "",
  },
  status: "idle",
  orders: {
    list: [] as OrderType[],
    message: "",
  }
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.info._id = "";
    },
    setUser: (state, action) => {
      
      state.info = action.payload;
    },
    setUserOrder: (state, action) => {
      state.orders.list = action.payload;
    }
  }
})

export const { logOut, setUser, setUserOrder } = userSlice.actions;

export default userSlice.reducer;