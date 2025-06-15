import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootNativeStackParamList, screens} from '../constants/screens';
import ProductDetail from '../screens/productDetail';
import Login from '../screens/login';
import TabNavigator from './TabNavigator';
import Products from '../screens/products';
import Notifications from '../screens/notifications';
import {Colors} from '../theme/colors';
import {useGetToken} from '../service/auth';

const Stack = createNativeStackNavigator<RootNativeStackParamList>();

const Router = () => {
  const {data, isLoading} = useGetToken();

  if (isLoading) return null;

  return (
    <Stack.Navigator
      initialRouteName={screens.main}
      screenOptions={{
        headerTintColor: Colors.BLACK,
        headerBackTitle: 'Geri',
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name={screens.main}
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={screens.productDetail}
        component={ProductDetail}
        options={{
          headerTitle: 'Ürün Detayı',
        }}
      />
      <Stack.Screen
        name={screens.login}
        component={Login}
        options={{
          headerTitle: 'Giriş Yap',
        }}
      />
      <Stack.Screen
        name={screens.products}
        component={Products}
        options={{
          headerTitle: 'Tüm Ürünler',
        }}
      />
      <Stack.Screen
        name={screens.notifications}
        component={Notifications}
        options={{
          headerTitle: 'Bildirimler',
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
