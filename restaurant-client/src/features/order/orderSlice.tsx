import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../components/store";

interface orderState {
  dishes: {
    name: string;
    amount: number;
    price: number;
    ingredients: string[];
  }[];
  total: number;
  email: string;
}

const initialState: orderState = {
  dishes: [],
  total: 0,
  email: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addEmail: (state, action: PayloadAction<{ email: string }>) => {
      const { email } = action.payload;
      state.email = email;
    },
    addDish: (
      state,
      action: PayloadAction<{
        name: string;
        amount: number;
        price: number;
        ingredients: string[];
      }>
    ) => {
      const { name, amount, price, ingredients } = action.payload;
      const existingDish = state.dishes.find((dish) => dish.name === name);
      if (existingDish) {
        existingDish.amount += amount;
      } else {
        state.dishes.push({ name, amount, price, ingredients });
      }
      state.total += price;
    },
    removeDish: (state, action: PayloadAction<{ name: string }>) => {
      const { name } = action.payload;
      const existingDish = state.dishes.find((dish) => dish.name === name);
      if (existingDish && existingDish.amount > 1) {
        state.total -= existingDish.price;
        existingDish.amount -= 1;
      } else if (existingDish && existingDish.amount <= 1) {
        state.total -= existingDish.price;
        state.dishes = state.dishes.filter((dish) => dish.name !== name);
      }
    },
  },
});

export const { addEmail, addDish, removeDish } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order.dishes;

export default orderSlice.reducer;
