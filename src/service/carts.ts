import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {ICart} from '../types/carts';
import {IProduct} from '../types/products';
import {addNotification} from './notifications';
import {INotification} from '../types/notification';

export const carts_services = {
  getAll: () => [],
  post: async (cart: IProduct) => cart,
  delete: async (cart: IProduct) => cart,
};

export const useGetCarts = () =>
  useQuery({
    queryKey: ['carts'],
    queryFn: () => carts_services.getAll(),
    staleTime: Infinity,
  });

export const addCart = () => {
  const queryClient = useQueryClient();
  const {mutate} = addNotification();

  return useMutation({
    mutationKey: ['carts'],
    mutationFn: (cart: IProduct) => carts_services.post(cart),
    onSuccess: (data, variables, context) => {
      const carts = (queryClient.getQueryData(['carts']) as ICart[]) || [];
      const index = carts.findIndex(({product: item}) => item.id === data.id);

      let newCarts: ICart[];

      if (index === -1) {
        const newCart: ICart = {product: data, amount: 1};
        newCarts = [...carts, newCart];
      } else {
        const found = carts[index];
        const updatedCart: ICart = {...found, amount: found.amount + 1};
        newCarts = [...carts]; // Yeni referans oluştu
        newCarts.splice(index, 1, updatedCart);
      }

      queryClient.setQueryData(['carts'], newCarts);

      const editTime = (param: string): string => {
        const calculated = param.length === 1 ? `0${param}` : param;

        return calculated;
      };

      const notification: Omit<INotification, 'id'> = {
        title: 'Sepete bir ürün eklendi',
        desc: data.title + 'ürün sepete eklendi',
        read: false,
        time: `${editTime(new Date().getHours().toString())}:${editTime(
          new Date().getMinutes().toString(),
        )}`,
      };

      mutate(notification);
    },
  });
};

export const deleteCart = () => {
  const queryClient = useQueryClient();
  const {mutate} = addNotification();

  return useMutation({
    mutationKey: ['carts'],
    mutationFn: (cart: IProduct) => carts_services.delete(cart),
    onSuccess: data => {
      const carts = (queryClient.getQueryData(['carts']) as ICart[]) || [];
      const index = carts.findIndex(({product: item}) => item.id === data.id);

      let newCarts: ICart[];
      const found = carts[index];

      if (found.amount === 1) {
        newCarts = carts.filter(({product}) => product.id !== data.id);
      } else {
        const updatedCart: ICart = {...found, amount: found.amount - 1};
        newCarts = [...carts];
        newCarts.splice(index, 1, updatedCart);
      }

      queryClient.setQueryData(['carts'], newCarts);

      const editTime = (param: string): string => {
        const calculated = param.length === 1 ? `0${param}` : param;

        return calculated;
      };

      const notification: Omit<INotification, 'id'> = {
        title: 'Sepetten bir ürün kaldırıldı',
        desc: data.title + 'ürün sepetten kaldırıldı',
        read: false,
        time: `${editTime(new Date().getHours().toString())}:${editTime(
          new Date().getMinutes().toString(),
        )}`,
      };

      mutate(notification);
    },
  });
};
