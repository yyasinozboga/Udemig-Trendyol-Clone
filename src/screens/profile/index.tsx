import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {defaultScreenStyle} from '../../styles/defaultScreenStyles';
import {useGetUser} from '../../service/user';
import {Colors} from '../../theme/colors';
import {height, width} from '../../constants/screenSize';
import Button from '../../components/button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {
  RootNativeStackParamList,
  RootTabNavigatorParamList,
} from '../../constants/screens';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {logout, useGetToken} from '../../service/auth';

type Props = CompositeScreenProps<
  NativeStackScreenProps<RootNativeStackParamList, 'login'>,
  BottomTabScreenProps<RootTabNavigatorParamList, 'profile'>
>;

const Profile: React.FC<Props> = ({navigation}) => {
  const {data, error, isPending} = useGetUser(1);
  const {data: token} = useGetToken();
  const {mutate} = logout();

  return (
    <View style={defaultScreenStyle.container}>
      {isPending ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error.message}</Text>
      ) : token ? (
        <View style={styles.container}>
          <View style={styles.image}>
            <Text style={styles.capital}>
              {data.name.firstname[0].toUpperCase()}
            </Text>
            <Text style={styles.capital}>
              {data.name.lastname[0].toUpperCase()}
            </Text>
          </View>

          <Text style={styles.name}>
            {data.name.firstname} {data.name.lastname}
          </Text>

          <Text style={styles.email}>{data.email}</Text>

          <Button text="Edit Profile" full />
          <Button text="Log out" full onPress={() => mutate()} />
        </View>
      ) : (
        <View style={styles.user_not_found}>
          <Text style={styles.title}>
            Henüz giriş yapmadıysanız devam etmek için giriş yapınız
          </Text>
          <Button
            text="Giriş Yap"
            full
            onPress={() => navigation.navigate('login')}
          />
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  image: {
    backgroundColor: Colors.GREEN,
    borderRadius: 30,
    padding: 40,
    width: width * 0.3,
    height: height * 0.14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  capital: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  container: {
    alignItems: 'center',
    gap: 20,
  },

  email: {
    fontSize: 16,
  },

  title: {
    fontWeight: 'medium',
    fontSize: 18,
    textAlign: 'center',
  },

  user_not_found: {
    gap: 10,
  },
});
