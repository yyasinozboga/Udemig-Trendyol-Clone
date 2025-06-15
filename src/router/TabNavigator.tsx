import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  RootTabNavigatorParamList,
  screens,
  tabScreens,
} from '../constants/screens';
import Home from '../screens/home';
import Favorites from '../screens/favorites';
import Bag from '../screens/bag';
import Search from '../screens/search';
import {Colors} from '../theme/colors';
import TabIcon from '../components/tabIcon';
import Profile from '../screens/profile';
import Icon from 'react-native-vector-icons/Feather';
import {useGetCarts} from '../service/carts';
import {ICart} from '../types/carts';

const Tab = createBottomTabNavigator<RootTabNavigatorParamList>();

const TabNavigator = () => {
  const {data: carts} = useGetCarts();

  return (
    <Tab.Navigator
      screenOptions={({route, navigation}) => ({
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarInactiveTintColor: Colors.BLACK,
        tabBarLabel: ({focused}) => (
          <Text style={styles.label}>{focused && route.name}</Text>
        ),
        tabBarIcon: ({color, focused}) => (
          <TabIcon
            color={color}
            focused={focused}
            size={25}
            route={route.name}
          />
        ),
        headerRight: () => (
          <Pressable
            style={styles.headerRight}
            onPress={() => navigation.navigate(screens.notifications)}>
            <Icon name="bell" size={30} />
          </Pressable>
        ),
        headerShadowVisible: false,
      })}>
      <Tab.Screen
        name={tabScreens.home}
        component={Home}
        options={{
          headerTitle: 'Anasayfa',
        }}
      />
      <Tab.Screen
        name={tabScreens.search}
        component={Search}
        options={{
          headerTitle: 'Ara',
        }}
      />
      <Tab.Screen
        name={tabScreens.favorites}
        component={Favorites}
        options={{
          headerTitle: 'Favoriler',
        }}
      />
      <Tab.Screen
        name={tabScreens.bag}
        component={Bag}
        options={{
          headerTitle: 'Sepetim',
          tabBarBadge: carts?.reduce((a, b: ICart) => a + b.amount, 0),
        }}
      />
      <Tab.Screen
        name={tabScreens.profile}
        component={Profile}
        options={{
          headerTitle: 'Hesabım',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 10,
  },

  label: {
    color: Colors.PRIMARY,
    fontSize: 10,
  },
});
