import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from './types';

import HomeScreen from '../screens/home/HomeScreen';
import ChildListScreen from '../screens/child/ChildListScreen';
import CreateChildScreen from '../screens/child/CreateChildScreen';
import EditChildScreen from '../screens/child/EditChildScreen';
import RegisterOrthosisUsageScreen from '../screens/monitoring/RegisterOrthosisUsageScreen';
import DailyChecklistScreen from '../screens/monitoring/DailyChecklistScreen';
import SymptomsScreen from '../screens/monitoring/SymptomsScreen';
import ProgressScreen from '../screens/progress/ProgressScreen';
import RewardsScreen from '../screens/rewards/RewardsScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'StepKids' }}
      />
      <Stack.Screen
        name="ChildList"
        component={ChildListScreen}
        options={{ title: 'Crianças' }}
      />
      <Stack.Screen
        name="CreateChild"
        component={CreateChildScreen}
        options={{ title: 'Nova Criança' }}
      />
      <Stack.Screen
        name="EditChild"
        component={EditChildScreen}
        options={{ title: 'Editar Criança' }}
      />
      <Stack.Screen
        name="RegisterOrthosisUsage"
        component={RegisterOrthosisUsageScreen}
        options={{ title: 'Uso da Órtese' }}
      />
      <Stack.Screen
        name="DailyChecklist"
        component={DailyChecklistScreen}
        options={{ title: 'Checklist Diário' }}
      />
      <Stack.Screen
        name="Symptoms"
        component={SymptomsScreen}
        options={{ title: 'Sintomas' }}
      />
      <Stack.Screen
        name="Progress"
        component={ProgressScreen}
        options={{ title: 'Progresso' }}
      />
      <Stack.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{ title: 'Recompensas' }}
      />
    </Stack.Navigator>
  );
}