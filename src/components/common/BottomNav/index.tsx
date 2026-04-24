import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../theme';

type Props = {
  navigation: any;
  active?: 'home' | 'children' | 'add' | 'tasks' | 'settings';
};

export default function BottomNav({ navigation, active = 'home' }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={[styles.icon, active === 'home' && styles.active]}>⌂</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ChildList')}>
        <Text style={[styles.icon, active === 'children' && styles.active]}>♙</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.plus}>＋</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CreateActivity')}>
        <Text style={[styles.icon, active === 'tasks' && styles.active]}>✎</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('WeeklyReport')}>
        <Text style={[styles.icon, active === 'settings' && styles.active]}>⚙</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 58,
    backgroundColor: colors.lilac,
    borderTopWidth: 1,
    borderTopColor: '#B892CC',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  icon: {
    fontSize: 20,
    color: '#222',
  },
  active: {
    fontWeight: '900',
  },
  plusButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -26,
    borderWidth: 3,
    borderColor: colors.background,
  },
  plus: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
  },
});