import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modal: {
      isOpen: false,
      modalType: "",
    }
  },
  reducers: {
    openModal: (state) => {
      state.modal = {
        isOpen: !state.modal.isOpen,
        modalType: "",
      }
    }
  }
})

export const { openModal } = modalSlice.actions;

export default modalSlice.reducer;