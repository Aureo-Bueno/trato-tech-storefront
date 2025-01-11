import api from 'services';

export const useGetCategories = async () => { 
  const { data } = await api.get('/categorias');
  return data;
};