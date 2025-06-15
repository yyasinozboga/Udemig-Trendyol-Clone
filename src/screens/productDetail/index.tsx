import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {defaultScreenStyle} from '../../styles/defaultScreenStyles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNativeStackParamList} from '../../constants/screens';
import {useGetProduct} from '../../service/products';
import {height, width} from '../../constants/screenSize';
import {Colors} from '../../theme/colors';
import {calculateStars} from '../../utils/calculateStars';
import Button from '../../components/button';
import Badges from '../../components/badges';
import FavoriteBtn from '../../components/favoriteBtn';
import {addCart} from '../../service/carts';
import {useGetToken} from '../../service/auth';
import {useAlert} from '../../utils/alert';
import {IProduct} from '../../types/products';

type Props = NativeStackScreenProps<RootNativeStackParamList, 'productDetail'>;

const ProductDetail: React.FC<Props> = ({route}) => {
  const {productId} = route.params;
  const {data: product, error, isPending} = useGetProduct(productId);
  const {mutate} = addCart();
  const {data: token} = useGetToken();
  const alert = useAlert();

  const handlePress = (product: IProduct) => {
    if (!token) return alert('sepete');

    mutate(product);
  };

  return (
    <View style={defaultScreenStyle.container}>
      {isPending ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error!</Text>
      ) : (
        product && (
          <View style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Image source={{uri: product.image}} style={styles.image} />

              <View style={styles.info}>
                <Text style={styles.category}>{product.category}</Text>
                <Text style={styles.title}>{product.title}</Text>

                <View style={styles.rating}>
                  <Text style={styles.rate}>{product.rating.rate}</Text>
                  <View style={styles.stars}>
                    {calculateStars(product.rating.rate)}
                  </View>
                </View>

                <Text style={styles.description}>{product.description}</Text>

                <Badges />
              </View>

              <FavoriteBtn product={product} />
            </ScrollView>

            <View style={styles.bottom}>
              <View>
                <Text style={styles.price}>{product.price} TL</Text>
                <Text style={styles.freeCargo}>Kargo Bedava</Text>
              </View>

              <Button text="Sepete Ekle" onPress={() => handlePress(product)} />
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  image: {
    height: height * 0.3,
    width: width * 0.5,
    marginHorizontal: 'auto',
  },

  category: {
    color: Colors.PRIMARY,
    fontWeight: '600',
    fontSize: 15,
    textDecorationLine: 'underline',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  info: {
    gap: 10,
    marginTop: 30,
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  rate: {
    fontWeight: 'bold',
    fontSize: 15,
  },

  stars: {
    flexDirection: 'row',
  },

  description: {
    fontWeight: '600',
    fontSize: 15,
  },

  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    bottom: 0,
    width: width * 1,
    height: height * 0.07,
    paddingHorizontal: 20,
  },

  price: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
    fontSize: 15,
  },

  freeCargo: {
    color: Colors.GREEN,
  },

  screen: {
    flex: 1,
  },
});
