import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootTabNavigatorParamList, tabScreens} from '../constants/screens';
import Home from '../screens/home';
import Products from '../screens/products';
import Favorites from '../screens/favorites';
import Bag from '../screens/bag';
import Search from '../screens/search';
import {Colors} from '../theme/colors';
import TabIcon from '../components/tabIcon';

const Tab = createBottomTabNavigator<RootTabNavigatorParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.GRAY,
      }}>
      <Tab.Screen
        name={tabScreens.home}
        component={Home}
        options={({route}) => ({
          headerTitle: 'Anasayfa',
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              color={color}
              focused={focused}
              size={25}
              route={route.name}
            />
          ),
        })}
      />
      <Tab.Screen name={tabScreens.products} component={Products} />
      <Tab.Screen name={tabScreens.favorites} component={Favorites} />
      <Tab.Screen name={tabScreens.bag} component={Bag} />
      <Tab.Screen name={tabScreens.search} component={Search} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
