import {useQuery} from '@tanstack/react-query';
import {api} from './instance';
import {products_urls} from './urls';
import {AxiosError} from 'axios';
import {IProduct} from '../types/products';

export const products_service = {
  getAll: async (category: string) => {
    try {
      const url = category
        ? `${products_urls.products}/category/${category}`
        : products_urls.products;

      const {data} = await api.get(url);

      return data;
    } catch (error) {
      return (error as AxiosError).message;
    }
  },
  getOne: async (id: string) => {
    try {
      const {data} = await api.get(`${products_urls.products}/${id}`);

      return data;
    } catch (error) {
      return (error as AxiosError).message;
    }
  },
};

export const useGetAllProducts = (category: string) =>
  useQuery({
    queryKey: ['products', category],
    queryFn: () => products_service.getAll(category),
  });

export const useGetProduct = (id: string) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: (): Promise<IProduct> => products_service.getOne(id),
  });
