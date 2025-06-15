import {useQuery} from '@tanstack/react-query';
import {api} from './instance';
import {products_urls} from './urls';
import {AxiosError} from 'axios';
import {IProduct} from '../types/products';

export const best_seller_services = {
  getAll: async () => {
    try {
      const {data} = await api.get(products_urls.best_seller_products);

      return data;
    } catch (error) {
      return error as AxiosError;
    }
  },
};

export const useGetBestSeller = () =>
  useQuery({
    queryKey: ['best_seller'],
    queryFn: (): Promise<IProduct[]> => best_seller_services.getAll(),
  });
