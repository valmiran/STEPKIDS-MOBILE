import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Baby,
  ClipboardCheck,
  Gamepad2,
  Home,
  Sparkles,
  UserRound,
} from 'lucide-react-native';

import { colors } from '../../../theme';

type AreaType = 'parent' | 'child';

type BottomNavProps = {
  navigation: any;
  area?: AreaType;
  active?: string;
  visible?: boolean;
};

type NavItemProps = {
  label: string;
  active: boolean;
  icon: React.ReactNode;
  onPress: () => void;
};

export default function BottomNav({
  navigation,
  area = 'parent',
  active = 'home',
  visible = true,
}: BottomNavProps) {
  if (!visible) {
    return null;
  }

  const isParentArea = area === 'parent';

  return (
    <View style={styles.container}>
      <NavItem
        label="Início"
        active={active === 'home'}
        icon={
          <Home
            size={21}
            color={active === 'home' ? colors.primary : colors.muted}
          />
        }
        onPress={() =>
          navigation.navigate(isParentArea ? 'ParentArea' : 'ChildArea')
        }
      />

      {isParentArea ? (
        <>
          <NavItem
            label="Monitorar"
            active={active === 'monitoring'}
            icon={
              <ClipboardCheck
                size={21}
                color={active === 'monitoring' ? colors.primary : colors.muted}
              />
            }
            onPress={() => navigation.navigate('DailyChecklist')}
          />

          <TouchableOpacity
            style={styles.centerButton}
            activeOpacity={0.86}
            onPress={() => navigation.navigate('ChildList')}
          >
            <Baby size={27} color={colors.white} strokeWidth={2.5} />
          </TouchableOpacity>

          <NavItem
            label="Crianças"
            active={active === 'children'}
            icon={
              <Baby
                size={21}
                color={active === 'children' ? colors.primary : colors.muted}
              />
            }
            onPress={() => navigation.navigate('ChildList')}
          />

          <NavItem
            label="Perfil"
            active={active === 'profile'}
            icon={
              <UserRound
                size={21}
                color={active === 'profile' ? colors.primary : colors.muted}
              />
            }
            onPress={() => navigation.navigate('Profile')}
          />
        </>
      ) : (
        <>
          <NavItem
            label="Missões"
            active={active === 'missions'}
            icon={
              <Sparkles
                size={21}
                color={active === 'missions' ? colors.primary : colors.muted}
              />
            }
            onPress={() => navigation.navigate('ChildMissions')}
          />

          <TouchableOpacity
            style={styles.centerButton}
            activeOpacity={0.86}
            onPress={() => navigation.navigate('SelectChildForGame')}
          >
            <Gamepad2 size={27} color={colors.white} strokeWidth={2.5} />
          </TouchableOpacity>

          <NavItem
            label="Herói"
            active={active === 'hero'}
            icon={
              <Gamepad2
                size={21}
                color={active === 'hero' ? colors.primary : colors.muted}
              />
            }
            onPress={() => navigation.navigate('SelectChildForGame')}
          />

          <NavItem
            label="Perfil"
            active={active === 'profile'}
            icon={
              <UserRound
                size={21}
                color={active === 'profile' ? colors.primary : colors.muted}
              />
            }
            onPress={() => navigation.navigate('Profile')}
          />
        </>
      )}
    </View>
  );
}

function NavItem({ label, active, icon, onPress }: NavItemProps) {
  return (
    <TouchableOpacity
      style={styles.navItem}
      onPress={onPress}
      activeOpacity={0.78}
    >
      {icon}
      <Text style={[styles.label, active && styles.labelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 76,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 10,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    fontSize: 10,
    color: colors.muted,
    fontWeight: '800',
  },
  labelActive: {
    color: colors.primary,
  },
  centerButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -34,
    borderWidth: 5,
    borderColor: colors.background,
  },
});