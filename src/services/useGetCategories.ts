import api from 'services';
import type { Category } from 'store/slices/categories';

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<Category[]>('/categories');
  return data;
};

export const categoriesResource = () => getCategories();
