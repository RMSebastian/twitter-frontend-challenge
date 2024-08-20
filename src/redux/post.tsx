import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  activeFirstPage: boolean;
};

const initial: InitialState = {
  activeFirstPage: true,
};

const postSlice = createSlice({
  name: "post",
  initialState: initial,
  reducers: {
    updatePage: (state, action) => {
      state.activeFirstPage = action.payload;
    },
  },
});

export const { updatePage } = postSlice.actions;

export default postSlice.reducer;
