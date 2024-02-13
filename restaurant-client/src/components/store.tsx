import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "../features/order/orderSlice";
import tokenReducer from "../features/token/tokenSlice";

// Store for the Redux state (reducers).
export const store = configureStore({
  reducer: {
    order: orderReducer,
    token: tokenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
