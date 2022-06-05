import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardPayment: {
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  },
  note: "",
  userInfo: {
    username: "",
    phone: "",  
    email: "",
    address: "",
  },
  loading: false,
  error: false,
  success: false,
}

const orderInfoSlice = createSlice({
  name: "orderInfo",
  initialState,
  reducers: {
    editCardInfo: (state, action) => {
      state.cardPayment = action.payload;
    },
    editNote: (state, action) => {
      state.note = action.payload;
    },
    editUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  }
})

export const { editCardInfo, editNote, editUserInfo } = orderInfoSlice.actions;

export default orderInfoSlice.reducer;