import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { authApi } from "../services/authApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

setupListeners(store.dispatch);
