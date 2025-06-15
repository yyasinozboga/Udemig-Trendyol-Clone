import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {height, width} from '../../constants/screenSize';
import Badges from '../badges';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../theme/colors';
import {ICart} from '../../types/carts';
import {addCart, deleteCart} from '../../service/carts';

type Props = {
  cart: ICart;
};

const Cart: React.FC<Props> = ({cart}) => {
  const {amount, product} = cart;
  const {image, price, title} = product;
  const {mutate: add} = addCart();
  const {mutate: del} = deleteCart();

  return (
    <Pressable style={styles.cart}>
      <Image source={{uri: image}} style={styles.image} />

      <View style={styles.cartInfo}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Badges />
        <View style={styles.cartInfoBottom}>
          <View style={styles.quantity}>
            <Pressable onPress={() => del(cart.product)}>
              {amount === 1 ? (
                <Ionicons name="trash" size={20} />
              ) : (
                <Icon name="minus" size={20} />
              )}
            </Pressable>

            <Text style={styles.amount}>{amount}</Text>

            <Pressable onPress={() => add(cart.product)}>
              <Icon name="plus" size={20} />
            </Pressable>
          </View>

          <Text style={styles.price}>{price} TL</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cart: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: width * 1,
    paddingVertical: 10,
  },

  image: {
    width: width * 0.22,
    height: height * 0.14,
  },

  cartInfo: {
    gap: 15,
    width: width * 0.7,
  },

  cartInfoBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 50,
    padding: 5,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },

  price: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
  },

  amount: {
    color: Colors.PRIMARY,
    fontWeight: 'bold',
  },
});
