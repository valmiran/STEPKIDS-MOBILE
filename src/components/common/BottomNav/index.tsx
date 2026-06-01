import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ClipboardList, Home, Settings, ShieldCheck, Sparkles } from 'lucide-react-native';

import { colors } from '../../../theme';

type Props = {
  navigation: any;
  active?: 'home' | 'children' | 'add' | 'tasks' | 'settings';
};

type NavItemProps = {
  label: string;
  active: boolean;
  icon: React.ReactNode;
  onPress: () => void;
};

export default function BottomNav({ navigation, active = 'home' }: Props) {
  return (
    <View style={styles.container}>
      <NavItem
        label="Início"
        active={active === 'home'}
        icon={<Home size={20} color={active === 'home' ? colors.primary : colors.muted} />}
        onPress={() => navigation.navigate('Home')}
      />

      <NavItem
        label="Pais"
        active={active === 'children'}
        icon={<ShieldCheck size={20} color={active === 'children' ? colors.primary : colors.muted} />}
        onPress={() => navigation.navigate('ParentArea')}
      />

      <TouchableOpacity
        style={styles.heroButton}
        onPress={() => navigation.navigate('ChildArea')}
        activeOpacity={0.86}
      >
        <Sparkles size={24} color={colors.white} strokeWidth={2.4} />
      </TouchableOpacity>

      <NavItem
        label="Missões"
        active={active === 'tasks'}
        icon={<ClipboardList size={20} color={active === 'tasks' ? colors.primary : colors.muted} />}
        onPress={() => navigation.navigate('ActivityList')}
      />

      <NavItem
        label="Ajustes"
        active={active === 'settings'}
        icon={<Settings size={20} color={active === 'settings' ? colors.primary : colors.muted} />}
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

function NavItem({ label, active, icon, onPress }: NavItemProps) {
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress} activeOpacity={0.78}>
      {icon}
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 72,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  label: {
    fontSize: 10,
    color: colors.muted,
    fontWeight: '800',
  },
  labelActive: {
    color: colors.primary,
  },
  heroButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    borderWidth: 5,
    borderColor: colors.background,
  },
});