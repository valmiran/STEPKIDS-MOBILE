import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme';

export default function LoadingJourneyScreen({ navigation }: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>STEPKIDS</Text>
      <ActivityIndicator size="large" color={colors.blueDark} />
      <Text style={styles.text}>Estamos preparando sua jornada...</Text>
      <Text style={styles.subtext}>Aguarde um instante</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 30,
  },
  text: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtext: {
    marginTop: 6,
    fontSize: 14,
    color: colors.textLight,
  },
});