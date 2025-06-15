import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../theme/colors';
import {width} from '../../constants/screenSize';

type Props = {
  text: string;
  onPress?: () => void;
  full?: boolean;
};

const Button: React.FC<Props> = ({text, onPress, full}) => {
  return (
    <Pressable
      style={[styles.button, {width: full ? '100%' : width * 0.6}]}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    padding: 10,
  },

  text: {
    color: Colors.WHITE,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 15,
  },
});
