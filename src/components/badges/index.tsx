import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {width} from '../../constants/screenSize';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../theme/colors';

const Badges = () => {
  return (
    <View style={styles.badges}>
      <View style={[styles.badge, {backgroundColor: '#BDE8CA'}]}>
        <Icon name="paper-plane" color={Colors.GREEN} size={18} />
        <Text style={styles.text}>Hızlı Teslimat</Text>
      </View>

      <View style={[styles.badge, {backgroundColor: '#FFE3E3'}]}>
        <Icon name="pricetag" color={Colors.PRIMARY} size={18} />
        <Text style={styles.text}>2. Ürün İndirim</Text>
      </View>

      <View style={[styles.badge, {backgroundColor: '#f0f8ff'}]}>
        <Icon name="cube-sharp" color={Colors.GRAY} size={18} />
        <Text style={styles.text}>Kargo Bedava</Text>
      </View>
    </View>
  );
};

export default Badges;

const styles = StyleSheet.create({
  badges: {
    flexDirection: 'row',
    gap: 5,
  },

  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.12,
    paddingVertical: 5,
    borderRadius: 5,
    gap: 5,
  },

  text: {
    fontSize: 8,
    textAlign: 'center',
  },
});
