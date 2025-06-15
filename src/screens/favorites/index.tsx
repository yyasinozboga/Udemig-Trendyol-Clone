import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {defaultScreenStyle} from '../../styles/defaultScreenStyles';
import {useGetFavorites} from '../../service/favorites';
import Product from '../../components/product';
import {useGetToken} from '../../service/auth';
import {useAlert} from '../../utils/alert';
import {useFocusEffect} from '@react-navigation/native';

const Favorites = () => {
  const {data: favorites, error, isPending} = useGetFavorites();
  const {data: token} = useGetToken();
  const alert = useAlert();

  useFocusEffect(
    useCallback(() => {
      if (!token) {
        alert('favorilere');
      }
    }, [token]),
  );

  return (
    <View style={defaultScreenStyle.container}>
      {isPending ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error!</Text>
      ) : favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={({item}) => <Product product={item} />}
          numColumns={2}
          columnWrapperStyle={styles.wrapper}
          contentContainerStyle={styles.favorites}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.title}>Favorilerde hiç ürün yok</Text>
      )}
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },

  favorites: {
    gap: 10,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
