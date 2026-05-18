import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { childService } from '../../services/api/childService';
import { Child } from '../../types/child';
import { colors } from '../../theme';

type Props = {
  selectedChildId: string;
  onSelect: (childId: string, child?: Child) => void;
};

export default function ChildSelect({ selectedChildId, onSelect }: Props) {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChildren() {
      try {
        setLoading(true);
        const data = await childService.getChildren();
        setChildren(data);
      } finally {
        setLoading(false);
      }
    }

    loadChildren();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator color={colors.lilacDark} />
        <Text style={styles.loadingText}>Carregando crianças...</Text>
      </View>
    );
  }

  if (children.length === 0) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyTitle}>Nenhuma criança cadastrada</Text>
        <Text style={styles.emptyText}>
          Cadastre uma criança antes de registrar informações.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {children.map((child) => {
        const selected = selectedChildId === child.id;

        return (
          <TouchableOpacity
            key={child.id}
            style={[styles.childCard, selected && styles.childCardSelected]}
            onPress={() => onSelect(child.id, child)}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {child.name?.charAt(0)?.toUpperCase() || 'C'}
              </Text>
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{child.name}</Text>
              <Text style={styles.details}>
                Nível {child.level || 1} • {child.totalPoints || 0} pts
              </Text>
            </View>

            <Text style={styles.check}>{selected ? '✓' : '○'}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 14,
  },
  loadingBox: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    marginBottom: 14,
  },
  loadingText: {
    marginTop: 6,
    fontWeight: '700',
    color: colors.textLight,
  },
  emptyBox: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: {
    fontWeight: '900',
    marginBottom: 4,
  },
  emptyText: {
    color: colors.textLight,
    fontWeight: '600',
    lineHeight: 19,
  },
  childCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  childCardSelected: {
    borderWidth: 2,
    borderColor: colors.lilacDark,
    backgroundColor: '#F7F2FF',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.lilac,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 18,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: '900',
    fontSize: 15,
  },
  details: {
    color: colors.textLight,
    fontWeight: '600',
    fontSize: 12,
    marginTop: 2,
  },
  check: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.lilacDark,
  },
});