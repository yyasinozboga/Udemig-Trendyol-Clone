import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {IProduct} from '../types/products';
import {addNotification} from './notifications';
import {INotification} from '../types/notification';

export const favorties_services = {
  getAll: () => [],
  post: (product: IProduct) => Promise.resolve(product),
};

export const useGetFavorites = () =>
  useQuery({
    queryKey: ['favorites'],
    queryFn: () => favorties_services.getAll(),
    staleTime: Infinity,
  });

export const useAddFavorite = () => {
  const {mutate} = addNotification();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['favorites'],
    mutationFn: (product: IProduct) => favorties_services.post(product),
    onSuccess: data => {
      const oldFavorites =
        (queryClient.getQueryData(['favorites']) as IProduct[]) || [];

      const isAlreadyFavorite = oldFavorites.find(
        product => product.id === data.id,
      );

      let newFavorites: IProduct[];

      if (isAlreadyFavorite) {
        newFavorites = oldFavorites.filter(product => product.id !== data.id);
      } else {
        newFavorites = [...oldFavorites, data];
      }

      queryClient.setQueryData(['favorites'], newFavorites);

      const editTime = (param: string): string => {
        const calculated = param.length === 1 ? `0${param}` : param;

        return calculated;
      };

      const notification: Omit<INotification, 'id'> = {
        title: `${
          isAlreadyFavorite
            ? 'Favorilerden bir ürün kaldırıldı'
            : 'Favorilere bir ürün eklendi'
        }`,
        desc: `${
          isAlreadyFavorite
            ? data.title + 'ürün favorilerden kaldırıldı'
            : data.title + 'ürün favorilere eklendi'
        }`,
        read: false,
        time: `${editTime(new Date().getHours().toString())}:${editTime(
          new Date().getMinutes().toString(),
        )}`,
      };

      mutate(notification);
    },
  });
};
