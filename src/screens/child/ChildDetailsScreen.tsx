import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import AppHeader from '../../components/common/AppHeader';
import BottomNav from '../../components/common/BottomNav';
import Button from '../../components/common/Button';
import { colors } from '../../theme';

export default function ChildDetailsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const { child } = route.params;

  return (
    <View style={styles.container}>
      <AppHeader navigation={navigation} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {child.name?.charAt(0)?.toUpperCase() || 'C'}
            </Text>
          </View>

          <Text style={styles.title}>{child.name}</Text>
          <Text style={styles.subtitle}>
            {child.diagnosis || 'Diagnóstico não informado'}
          </Text>
        </View>

              <View style={styles.grid}>
        <View style={styles.statCardBlue}>
          <Text style={styles.statNumber}>{child.age}</Text>
          <Text style={styles.statLabel}>Idade</Text>
        </View>

        <View style={styles.statCardYellow}>
          <Text style={styles.statNumber}>{child.level || 1}</Text>
          <Text style={styles.statLabel}>Nível</Text>
        </View>

        <View style={styles.statCardWhite}>
          <Text style={styles.statNumber}>
            {child.totalPoints || 0}
          </Text>
          <Text style={styles.statLabel}>Pontos</Text>
        </View>

        <View style={styles.statCardWhite}>
          <Text style={styles.statNumber}>
            {child.totalOrthosisHours || 0}h
          </Text>
          <Text style={styles.statLabel}>Órtese</Text>
        </View>

        <View style={styles.statCardYellow}>
          <Text style={styles.statNumber}>
            {child.goldCoins || 0}
          </Text>
          <Text style={styles.statLabel}>Moedas</Text>
        </View>

        <View style={styles.statCardWhite}>
          <Text style={styles.statNumber}>
            {child.totalExp || child.totalPoints || 0}
          </Text>
          <Text style={styles.statLabel}>EXP</Text>
        </View>
      </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo de acompanhamento</Text>

          <Text style={styles.item}>
            Missões concluídas: {child.completedMissions || 0}
          </Text>

          <Text style={styles.item}>
            Atividades concluídas: {child.completedActivities || 0}
          </Text>

          <Text style={styles.item}>
            Médico vinculado:{' '}
            {child.doctorUid ? child.doctorUid : 'Não vinculado'}
          </Text>
        </View>

        <Button
          title="Editar dados"
          onPress={() => navigation.navigate('EditChild', { child })}
        />

        <Button
          title="Ver progresso"
          variant="secondary"
          onPress={() => navigation.navigate('LevelBonus')}
        />

        <Button
          title="Voltar"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
      </ScrollView>

      <BottomNav navigation={navigation} active="children" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 18,
    paddingBottom: 90,
  },
  profileCard: {
    backgroundColor: colors.lilac,
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    marginBottom: 14,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarText: {
    fontSize: 38,
    fontWeight: '900',
    color: colors.lilacDark,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 6,
    color: colors.textLight,
    fontWeight: '700',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 14,
  },
  statCardBlue: {
    width: '47%',
    backgroundColor: colors.blue,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statCardYellow: {
    width: '47%',
    backgroundColor: colors.yellow,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statCardWhite: {
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    marginTop: 4,
    color: colors.textLight,
    fontWeight: '700',
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
  },
  item: {
    color: colors.textLight,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 20,
  },
});