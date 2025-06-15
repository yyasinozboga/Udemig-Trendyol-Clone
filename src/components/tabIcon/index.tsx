import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {tabScreens} from '../../constants/screens';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  route: string;
  focused: boolean;
  size: number;
  color: string;
};

const TabIcon: React.FC<Props> = ({route, focused, size, color}) => {
  return route === tabScreens.home ? (
    <Icon name={focused ? 'home' : 'home-outline'} size={size} color={color} />
  ) : route === tabScreens.search ? (
    <Icon
      name={focused ? 'search' : 'search-outline'}
      size={size}
      color={color}
    />
  ) : route === tabScreens.favorites ? (
    <Icon
      name={focused ? 'heart' : 'heart-outline'}
      size={size}
      color={color}
    />
  ) : route === tabScreens.bag ? (
    <Icon name={focused ? 'bag' : 'bag-outline'} size={size} color={color} />
  ) : (
    <Icon
      name={focused ? 'person' : 'person-outline'}
      size={size}
      color={color}
    />
  );
};

export default TabIcon;

const styles = StyleSheet.create({});
