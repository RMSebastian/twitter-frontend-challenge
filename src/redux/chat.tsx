import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  otherUserId: string;
};

const initial: InitialState = {
  otherUserId: "",
};

const chatSlice = createSlice({
  name: "post",
  initialState: initial,
  reducers: {
    updateUserId: (state, action) => {
      state.otherUserId = action.payload;
    },
  },
});

export const { updateUserId } = chatSlice.actions;

export default chatSlice.reducer;
