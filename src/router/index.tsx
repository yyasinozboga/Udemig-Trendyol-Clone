import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootNativeStackParamList, screens} from '../constants/screens';
import ProductDetail from '../screens/productDetail';
import Login from '../screens/login';
import Signup from '../screens/signup';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<RootNativeStackParamList>();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screens.main}
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name={screens.productDetail} component={ProductDetail} />
      <Stack.Screen name={screens.login} component={Login} />
      <Stack.Screen name={screens.signup} component={Signup} />
    </Stack.Navigator>
  );
};

export default Router;
