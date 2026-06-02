import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

import { colors } from '../../../theme';

type Props = {
  navigation: any;
  title?: string;
  subtitle?: string;
  fallbackRoute?: string;
};

export default function AppHeader({
  navigation,
  title = 'Voltar',
  subtitle,
  fallbackRoute = 'Home',
}: Props) {
  function handleBack() {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
      return;
    }

    navigation.navigate(fallbackRoute);
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.82}
        onPress={handleBack}
      >
        <ArrowLeft size={22} color={colors.primaryDark} strokeWidth={2.5} />
      </TouchableOpacity>

      <View style={styles.textArea}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        {!!subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.surface,
    paddingTop: 46,
    paddingBottom: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textArea: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text,
  },
  subtitle: {
    marginTop: 2,
    color: colors.textLight,
    fontSize: 12,
    fontWeight: '700',
  },
});