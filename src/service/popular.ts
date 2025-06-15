import {AxiosError} from 'axios';
import {api} from './instance';
import {products_urls} from './urls';
import {useQuery} from '@tanstack/react-query';

export const popular_services = {
  getAll: async () => {
    try {
      const {data} = await api.get(products_urls.popular_products);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.request);
      return err;
    }
  },
};

export const useGetPopular = () =>
  useQuery({
    queryKey: ['popular'],
    queryFn: () => popular_services.getAll(),
  });
