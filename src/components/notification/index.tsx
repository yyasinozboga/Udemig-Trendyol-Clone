import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {INotification} from '../../types/notification';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../../theme/colors';

type Props = {
  notification: INotification;
};

const Notification: React.FC<Props> = ({notification}) => {
  const {title, desc, read, time} = notification;

  const short_desc = desc.length <= 30 ? desc : `${desc.slice(0, 30)}...`;

  return (
    <Pressable style={styles.notification}>
      <View>
        <Icon name="bell-outline" size={30} />
        {!read && <View style={styles.circle} />}
      </View>

      <View style={styles.notification_info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{short_desc}</Text>
      </View>

      <Text style={styles.time}>{time}</Text>
    </Pressable>
  );
};

export default Notification;

const styles = StyleSheet.create({
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  time: {
    position: 'absolute',
    right: 0,
    top: 10,
    color: Colors.GRAY,
  },

  circle: {
    backgroundColor: 'red',
    borderRadius: 50,
    height: 12,
    width: 12,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  notification_info: {
    gap: 5,
  },

  desc: {
    fontWeight: '500',
  },
});
