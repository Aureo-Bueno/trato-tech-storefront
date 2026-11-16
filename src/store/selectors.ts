import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';

export const selectSearch = (state: RootState) => state.search;
export const selectCategories = (state: RootState) => state.categories;
export const selectItems = (state: RootState) => state.items;
export const selectCart = (state: RootState) => state.cart;

export const makeSelectCategoryById = (categoryId?: string) =>
  createSelector([selectCategories], (categories) =>
    categories.find((category) => category.id === categoryId) || null
  );

export const makeSelectItemsByCategory = (categoryId?: string) =>
  createSelector([selectItems], (items) =>
    items.filter((item) => item.category === categoryId)
  );

export const makeSelectFilteredItems = (categoryId?: string) =>
  createSelector(
    [makeSelectItemsByCategory(categoryId), selectSearch],
    (items, search) => {
      const regexp = new RegExp(search, 'i');
      return items.filter((item) => regexp.test(item.title));
    }
  );

export const selectCartDetails = createSelector(
  [selectCart, selectItems],
  (cart, items) => {
    let total = 0;
    const cartItems = cart.reduce<
      Array<(typeof items)[number] & { quantity: number }>
    >((acc, cartItem) => {
      const item = items.find((i) => i.id === cartItem.id);
      if (!item) return acc;
      total += item.price * cartItem.quantity;
      acc.push({ ...item, quantity: cartItem.quantity });
      return acc;
    }, []);
    return { cartItems, total };
  }
);

export const makeSelectFilteredCartItems = () =>
  createSelector([selectCartDetails, selectSearch], ({ cartItems, total }, search) => {
    const regexp = new RegExp(search, 'i');
    return {
      items: cartItems.filter((item) => regexp.test(item.title)),
      total,
    };
  });

export const makeSelectIsInCart = (id: string) =>
  createSelector([selectCart], (cart) => cart.some((item) => item.id === id));
