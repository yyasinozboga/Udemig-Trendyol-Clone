import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {defaultScreenStyle} from '../../styles/defaultScreenStyles';
import {Formik} from 'formik';
import Button from '../../components/button';
import {Colors} from '../../theme/colors';
import {IAuthBody} from '../../types/auth';
import {login} from '../../service/auth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  RootNativeStackParamList,
  RootTabNavigatorParamList,
  screens,
} from '../../constants/screens';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

type Props = CompositeScreenProps<
  NativeStackScreenProps<RootNativeStackParamList, 'login'>,
  BottomTabScreenProps<RootTabNavigatorParamList, 'home'>
>;

const Login: React.FC<Props> = ({navigation}) => {
  const {mutate} = login();

  const initialValues: IAuthBody = {
    username: 'johnd',
    password: 'm38rmF$',
  };

  const handleSubmit = (values: IAuthBody) => {
    mutate(values);
    navigation.navigate('home');
  };

  return (
    <View style={defaultScreenStyle.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={values => handleSubmit(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={styles.form}>
            <View style={styles.box}>
              <Text style={styles.label}>Kullanıcı adı</Text>

              <TextInput
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                style={styles.input}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.box}>
              <Text style={styles.label}>Şifre</Text>

              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={styles.input}
                secureTextEntry
              />
            </View>

            <Text style={styles.forgotPassword}>Şifremi Unuttum</Text>

            <Button onPress={handleSubmit} text="Giriş Yap" full />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  box: {
    gap: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    padding: 10,
  },

  form: {
    gap: 5,
  },

  forgotPassword: {
    color: Colors.PRIMARY,
    marginTop: 10,
    marginBottom: 40,
    textAlign: 'right',
  },

  label: {
    fontSize: 15,
  },
});
