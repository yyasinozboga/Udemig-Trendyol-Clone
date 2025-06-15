import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Alert} from 'react-native';
import {
  RootNativeStackParamList,
  RootTabNavigatorParamList,
  screens,
} from '../constants/screens';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type LoginScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'login'>,
  BottomTabNavigationProp<RootTabNavigatorParamList>
>;

type CombinedRouteProp =
  | RouteProp<RootTabNavigatorParamList, keyof RootTabNavigatorParamList>
  | RouteProp<RootNativeStackParamList, keyof RootNativeStackParamList>;

export const useAlert = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const route = useRoute<CombinedRouteProp>().name;

  return (text: string) =>
    Alert.alert('Giriş Yap', `Lütfen ${text} eklemeden önce giriş yapınız`, [
      {
        text: 'İptal',
        style: 'cancel',
        onPress: () => {
          if (route === 'bag' || route === 'favorites') {
            navigation.navigate('home');
          }
        },
      },
      {
        text: 'Giriş Yap',
        onPress: () => navigation.navigate(screens.login),
      },
    ]);
};
