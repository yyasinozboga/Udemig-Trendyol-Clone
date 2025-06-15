import {AxiosError} from 'axios';
import {api} from './instance';
import {auth_url} from './urls';
import {IAuthBody} from '../types/auth';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const auth_services = {
  get: async () => {
    const token = await AsyncStorage.getItem('token');
    return token;
  },

  post: async (body: IAuthBody) => {
    try {
      const {data} = await api.post(auth_url, body);
      await AsyncStorage.setItem('token', data.token);

      return data.token;
    } catch (error) {
      throw (error as AxiosError).message;
    }
  },

  delete: async () => {
    await AsyncStorage.removeItem('token');
    return 'Log outed';
  },
};

export const useGetToken = () =>
  useQuery({
    queryKey: ['auth'],
    queryFn: () => auth_services.get(),
  });

export const login = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['auth'],
    mutationFn: (body: IAuthBody) => auth_services.post(body),
    onSuccess: data => {
      // queryClient.fetchQuery({queryKey: ['auth']});
      queryClient.invalidateQueries({queryKey: ['auth']});
    },
  });
};

export const logout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['auth'],
    mutationFn: () => auth_services.delete(),
    onSuccess: () => {
      // queryClient.fetchQuery({queryKey: ['auth']});
      queryClient.invalidateQueries({queryKey: ['auth']});
    },
  });
};
