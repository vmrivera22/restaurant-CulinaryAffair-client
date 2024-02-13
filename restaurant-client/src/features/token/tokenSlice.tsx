import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../components/store";

interface tokenState {
  token: string;
}

const initialState: tokenState = {
  token: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      state.token = token;
    },
  },
});

export const { addToken } = tokenSlice.actions;

export const selectOrder = (state: RootState) => state.token.token;

export default tokenSlice.reducer;
