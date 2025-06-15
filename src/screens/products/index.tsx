import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {defaultScreenStyle} from '../../styles/defaultScreenStyles';
import Categories from '../../components/categories/Categories';
import {useGetAllProducts} from '../../service/products';
import {useSelectedCategory} from '../../service/categories';
import Product from '../../components/product';

const Products = () => {
  const {data: category} = useSelectedCategory();
  const {
    data: products,
    error,
    isPending,
  } = useGetAllProducts(category as unknown as string);

  return (
    <View style={defaultScreenStyle.container}>
      <Categories />
      {isPending ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error!</Text>
      ) : (
        products && (
          <FlatList
            data={products}
            renderItem={({item}) => <Product product={item} />}
            numColumns={2}
            contentContainerStyle={styles.products}
            columnWrapperStyle={styles.wrapper}
            showsVerticalScrollIndicator={false}
          />
        )
      )}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  products: {
    gap: 10,
  },

  wrapper: {
    gap: 10,
  },
});
