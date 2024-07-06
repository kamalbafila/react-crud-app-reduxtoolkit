import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../api/UserSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
