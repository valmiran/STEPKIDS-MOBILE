import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../theme';

type Props = {
  navigation: any;
};

export default function AppHeader({ navigation }: Props) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>STEPKIDS</Text>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.profileIcon}>⚙</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.lilac,
    paddingTop: 42,
    paddingBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 17,
    color: colors.text,
  },
  profileButton: {
    position: 'absolute',
    right: 18,
    top: 38,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E9D6F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 18,
  },
});