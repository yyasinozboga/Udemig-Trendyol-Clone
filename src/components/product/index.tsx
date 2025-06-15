import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../theme/colors';
import {IProduct} from '../../types/products';
import FavoriteBtn from '../favoriteBtn';
import {width} from '../../constants/screenSize';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootNativeStackParamList, screens} from '../../constants/screens';
import {useNavigation} from '@react-navigation/native';
import {calculateStars} from '../../utils/calculateStars';
import Badges from '../badges';

type Props = {
  product: IProduct;
};

type ProductDetailScreenProp = NativeStackNavigationProp<
  RootNativeStackParamList,
  'productDetail'
>;

const Product: React.FC<Props> = ({product}) => {
  const navigation = useNavigation<ProductDetailScreenProp>();

  return (
    <Pressable
      style={styles.product}
      onPress={() =>
        navigation.navigate(screens.productDetail, {productId: product.id})
      }>
      <Image source={{uri: product.image}} style={styles.image} />

      <Text numberOfLines={2} style={styles.product_title}>
        {product.title}
      </Text>

      <Text style={styles.category}>{product.category}</Text>

      <View>
        <Text style={styles.rate}>{product.rating.rate}</Text>
        <View style={styles.stars}>{calculateStars(product.rating.rate)}</View>
      </View>

      <Text style={styles.price}>{product.price} TL</Text>

      <Badges />
      <FavoriteBtn product={product} />
    </Pressable>
  );
};

export default Product;

const styles = StyleSheet.create({
  product: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    padding: 5,
    width: width * 0.46,
    gap: 10,
  },

  image: {
    width: 120,
    height: 150,
    marginHorizontal: 'auto',
  },

  product_title: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  category: {
    color: Colors.GREEN,
  },

  rate: {
    fontWeight: 'bold',
  },

  stars: {
    flexDirection: 'row',
  },

  price: {
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
});
