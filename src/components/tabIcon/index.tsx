import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import {tabScreens} from '../../constants/screens';

type Props = {
  route: string;
  focused: boolean;
  size: number;
  color: string;
};

const TabIcon: React.FC<Props> = ({route, focused, size, color}) => {
  switch (route) {
    case tabScreens.home:
      return (
        <Icon
          name={focused ? 'home' : 'home-outline'}
          size={size}
          color={color}
        />
      );

    default:
      return;
  }
};

export default TabIcon;

const styles = StyleSheet.create({});
