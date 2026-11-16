import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useGetItems } from 'services/useGetItems';

export interface Item {
  title: string;
  description: string;
  photo: string;
  favorite: boolean;
  price: number;
  id: string;
  category: string;
}

const initialState: Item[] = [];

export const fetchItems = createAsyncThunk<Item[]>('items/fetch', useGetItems);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    toggleFavorite: (state, { payload }: PayloadAction<string>) => {
      const item = state.find((i) => i.id === payload);
      if (item) item.favorite = !item.favorite;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (_state, { payload }) => {
        return payload;
      })
      .addCase(fetchItems.pending, () => {})
      .addCase(fetchItems.rejected, () => {});
  },
});

export const { toggleFavorite } = itemsSlice.actions;

export default itemsSlice.reducer;
