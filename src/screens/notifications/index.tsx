import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {defaultScreenStyle} from '../../styles/defaultScreenStyles';
import {useGetNotifications} from '../../service/notifications';
import Notification from '../../components/notification';
import {Colors} from '../../theme/colors';

const Notifications = () => {
  const {data, isPending, error} = useGetNotifications();

  return (
    <View style={defaultScreenStyle.container}>
      {isPending ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error.message}</Text>
      ) : data && data.length > 0 ? (
        <FlatList
          data={data}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => <Notification notification={item} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.title}>Hiç bildirim yok</Text>
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  separator: {
    backgroundColor: Colors.SOFTGRAY,
    height: 1,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
