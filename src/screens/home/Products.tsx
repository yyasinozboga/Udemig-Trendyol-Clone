import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useGetBestSeller} from '../../service/bestSeller';
import {useGetPopular} from '../../service/popular';
import Product from '../../components/product';

type Props = {
  category: string;
};

const Products: React.FC<Props> = ({category}) => {
  const {data, error, isPending} =
    category === 'best_seller' ? useGetBestSeller() : useGetPopular();

  const title =
    category === 'best_seller' ? 'Çok Satan Ürünler' : 'Popüler Ürünler';

  return (
    <View style={styles.list}>
      <Text style={styles.title}>{title}</Text>

      {isPending ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error!</Text>
      ) : (
        data && (
          <FlatList
            data={data}
            renderItem={({item}) => <Product product={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.product_container}
          />
        )
      )}
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },

  list: {
    marginTop: 10,
  },

  product_container: {
    gap: 10,
    marginTop: 10,
  },
});
