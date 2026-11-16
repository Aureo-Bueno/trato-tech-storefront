import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  quantity: number;
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    changeCart: (state, { payload }: PayloadAction<string>) => {
      const hasItem = state.some((item) => item.id === payload);
      if (!hasItem)
        return [
          ...state,
          {
            id: payload,
            quantity: 1,
          },
        ];
      return state.filter((item) => item.id !== payload);
    },
    changeQuantity: (state, { payload }: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.find((cartItem) => cartItem.id === payload.id);
      if (item) item.quantity += payload.quantity;
    },
    resetCart: () => initialState,
  },
});

export const { changeCart, changeQuantity, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
