import { categoriesResource } from 'services/useGetCategories';
import type { Category } from 'store/slices/categories';

let categoriesPromise: Promise<Category[]> | null = null;

export const getCategoriesPromise = () => {
  if (!categoriesPromise) {
    categoriesPromise = categoriesResource();
  }
  return categoriesPromise;
};
