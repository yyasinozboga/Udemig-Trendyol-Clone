import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../theme/colors';
import {useAddFavorite, useGetFavorites} from '../../service/favorites';
import {IProduct} from '../../types/products';
import {useGetToken} from '../../service/auth';
import {useAlert} from '../../utils/alert';

type Props = {
  product: IProduct;
};

const FavoriteBtn: React.FC<Props> = ({product}) => {
  const {mutate} = useAddFavorite();
  const {data: favorites} = useGetFavorites();
  const {data: token} = useGetToken();
  const alert = useAlert();

  const handlePress = () => {
    if (!token) return alert('favorilere');

    mutate(product);
  };

  const found = (favorites as unknown as IProduct[])?.find(
    item => item.id === product.id,
  );

  const icon = found ? 'heart' : 'heart-outline';

  return (
    <Pressable style={styles.btn} onPress={() => handlePress()}>
      <Icon name={icon} size={20} color={Colors.PRIMARY} />
    </Pressable>
  );
};

export default FavoriteBtn;

const styles = StyleSheet.create({
  btn: {
    top: 5,
    end: 5,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 6,
  },
});
