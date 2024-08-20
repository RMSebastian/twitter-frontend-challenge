import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import post from "./post";
import chat from "./chat";

export const store = configureStore({
  reducer: { user, post, chat },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
