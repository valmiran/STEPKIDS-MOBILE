import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: ButtonVariant;
};

export default function Button({
  title,
  variant = 'primary',
  style,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.primary : styles.secondary,
        style,
      ]}
      activeOpacity={0.8}
      {...rest}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  primary: {
    backgroundColor: '#9FD4E6',
  },
  secondary: {
    backgroundColor: '#E6F2F8',
  },
  text: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
});