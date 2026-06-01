import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Baby,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react-native';

import { colors } from '../../theme';

type Props = {
  navigation: any;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroCard}>
        <View style={styles.heroBadge}>
          <Sparkles
            size={16}
            color={colors.primary}
          />
          <Text style={styles.heroBadgeText}>
            Jornada Gamificada
          </Text>
        </View>

        <Text style={styles.heroTitle}>
          Bem-vindo ao {'\n'}
          Pé de Herói
        </Text>

        <Text style={styles.heroSubtitle}>
          Acompanhe evolução clínica,
          desafios, progresso da órtese
          e atividades educativas.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Escolha sua área
      </Text>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.88}
        onPress={() =>
          navigation.navigate('ParentArea')
        }
      >
        <View style={styles.iconParent}>
          <ShieldCheck
            size={30}
            color={colors.primaryDark}
          />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            Área dos Pais
          </Text>

          <Text style={styles.cardDescription}>
            Monitoramento diário,
            checklists, sintomas,
            acompanhamento clínico,
            conteúdos educativos
            e gestão da criança.
          </Text>
        </View>

        <ChevronRight
          size={22}
          color={colors.textLight}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.88}
        onPress={() =>
          navigation.navigate('ChildArea')
        }
      >
        <View style={styles.iconChild}>
          <Baby
            size={30}
            color={colors.secondary}
          />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            Área da Criança
          </Text>

          <Text style={styles.cardDescription}>
            Missões, moedas, XP,
            atividades gamificadas,
            desafios diários
            e evolução do herói.
          </Text>
        </View>

        <ChevronRight
          size={22}
          color={colors.textLight}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:colors.background,
  },

  content:{
    padding:20,
    paddingBottom:40,
  },

  heroCard:{
    backgroundColor:colors.surface,
    borderRadius:26,
    padding:24,
    marginBottom:28,
    borderWidth:1,
    borderColor:colors.border,
  },

  heroBadge:{
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'flex-start',
    backgroundColor:colors.primarySoft,
    paddingHorizontal:12,
    paddingVertical:8,
    borderRadius:999,
    marginBottom:18,
  },

  heroBadgeText:{
    marginLeft:8,
    color:colors.primaryDark,
    fontWeight:'800',
    fontSize:12,
  },

  heroTitle:{
    fontSize:32,
    lineHeight:39,
    fontWeight:'900',
    color:colors.text,
  },

  heroSubtitle:{
    marginTop:14,
    lineHeight:24,
    color:colors.textLight,
    fontSize:15,
  },

  sectionTitle:{
    fontSize:18,
    fontWeight:'900',
    color:colors.text,
    marginBottom:16,
  },

  card:{
    backgroundColor:colors.surface,
    borderRadius:24,
    padding:22,
    marginBottom:18,
    flexDirection:'row',
    alignItems:'center',
    borderWidth:1,
    borderColor:colors.border,
  },

  iconParent:{
    width:62,
    height:62,
    borderRadius:20,
    backgroundColor:colors.primarySoft,
    justifyContent:'center',
    alignItems:'center',
  },

  iconChild:{
    width:62,
    height:62,
    borderRadius:20,
    backgroundColor:colors.secondarySoft,
    justifyContent:'center',
    alignItems:'center',
  },

  cardContent:{
    flex:1,
    marginHorizontal:18,
  },

  cardTitle:{
    fontSize:18,
    fontWeight:'900',
    color:colors.text,
    marginBottom:8,
  },

  cardDescription:{
    color:colors.textLight,
    lineHeight:22,
    fontSize:14,
  },

});