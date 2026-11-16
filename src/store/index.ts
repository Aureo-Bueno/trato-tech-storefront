import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from './slices/categories';
import itemsSlice from './slices/items';
import cartSlice from './slices/cart';
import searchSlice from './slices/search';

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    items: itemsSlice,
    cart: cartSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
