import {AxiosError} from 'axios';
import {api} from './instance';
import {useQuery} from '@tanstack/react-query';
import {user_url} from './urls';
import {IUser} from '../types/user';

export const user_services = {
  getOne: async (id: number) => {
    try {
      const {data} = await api.get(`${user_url}/${id}`);

      return data;
    } catch (error) {
      throw (error as AxiosError).message;
    }
  },
};

export const useGetUser = (id: number) =>
  useQuery({
    queryKey: ['user'],
    queryFn: (): Promise<IUser> => user_services.getOne(id),
  });
