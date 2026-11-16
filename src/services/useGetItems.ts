import api from 'services';
import type { Item } from 'store/slices/items';

export const useGetItems = async (): Promise<Item[]> => {
  const { data } = await api.get<Item[]>('/items');
  return data;
};
