import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {api} from './instance';
import {products_urls} from './urls';
import {AxiosError} from 'axios';

export const categories_services = {
  getAll: async () => {
    try {
      const {data} = await api.get(products_urls.categories);

      return data;
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.request);
      return err;
    }
  },
  getOne: () => null,
  update: (category: string) => Promise.resolve(category),
};

export const useGetCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: (): Promise<string[]> => categories_services.getAll(),
  });

export const useSelectedCategory = () =>
  useQuery({
    queryKey: ['category'],
    queryFn: () => categories_services.getOne(),
    staleTime: Infinity, // sürekli olarak cache'te tut
  });

export const setCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['category'],
    mutationFn: (category: string) => categories_services.update(category),
    onSuccess: data => {
      // Cache'e yaz
      queryClient.setQueryData(['category'], data);
    },
  });
};
