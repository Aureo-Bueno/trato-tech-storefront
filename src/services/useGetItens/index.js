import api from 'services';


export const useGetItens = () => { 
  const { data } = api.get('/itens');
  return data;
};