import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {defaultScreenStyle} from '../../styles/defaultScreenStyles';
import Cart from '../../components/cart';
import {useGetCarts} from '../../service/carts';
import {Colors} from '../../theme/colors';
import {useGetToken} from '../../service/auth';
import {useAlert} from '../../utils/alert';
import {useFocusEffect} from '@react-navigation/native';
import Button from '../../components/button';
import {ICart} from '../../types/carts';

const Bag = () => {
  const {data: carts} = useGetCarts();
  const {data: token} = useGetToken();
  const alert = useAlert();

  useFocusEffect(
    useCallback(() => {
      if (!token) {
        alert('sepete');
      }
    }, [token]),
  );

  return (
    <View style={defaultScreenStyle.container}>
      {carts && carts.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={carts}
            renderItem={({item}) => <Cart cart={item} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.bottom}>
            <View style={styles.bottomLeft}>
              <Text>Toplam</Text>
              <View>
                <Text style={styles.price}>
                  {carts
                    .reduce((a, b: ICart) => a + b.amount * b.product.price, 0)
                    .toFixed(2)}{' '}
                  TL
                </Text>
                <Text style={styles.freeCargo}>Kargo Bedava</Text>
              </View>
            </View>

            <Button text="Sepeti Onayla" />
          </View>
        </View>
      ) : (
        <Text style={styles.title}>Sepette hiç ürün yok</Text>
      )}
    </View>
  );
};

export default Bag;

const styles = StyleSheet.create({
  separator: {
    backgroundColor: Colors.GRAY,
    height: 1,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },

  bottom: {
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },

  container: {
    flex: 1,
  },

  bottomLeft: {
    gap: 5,
  },

  price: {
    fontWeight: 'bold',
  },

  freeCargo: {
    color: Colors.GREEN,
  },
});
