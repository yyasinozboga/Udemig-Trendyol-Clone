import {ScrollView, View} from 'react-native';
import React from 'react';
import {defaultScreenStyle} from '../../styles/defaultScreenStyles';
import Categories from '../../components/categories/Categories';
import Hero from './Hero';
import Products from './Products';

const Home = () => {
  return (
    <View style={defaultScreenStyle.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <Hero />
        <Products category="best_seller" />
        <Products category="popular" />
      </ScrollView>
    </View>
  );
};

export default Home;
