import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  RootNativeStackParamList,
  RootTabNavigatorParamList,
} from '../../constants/screens';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'products'>,
  BottomTabNavigationProp<RootTabNavigatorParamList, 'home'>
>;

const Hero = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <Pressable onPress={() => navigation.navigate('products')}>
      <Image
        source={require('../../assets/ramazan.jpg')}
        style={styles.image}
      />
    </Pressable>
  );
};

export default Hero;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});
