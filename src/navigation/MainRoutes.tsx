import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from './types';

import LoadingJourneyScreen from '../screens/home/LoadingJourneyScreen';
import HomeScreen from '../screens/home/HomeScreen';

import ChildListScreen from '../screens/child/ChildListScreen';
import CreateChildScreen from '../screens/child/CreateChildScreen';
import EditChildScreen from '../screens/child/EditChildScreen';
import ChildDetailsScreen from '../screens/child/ChildDetailsScreen';

import RegisterOrthosisUsageScreen from '../screens/monitoring/RegisterOrthosisUsageScreen';
import DailyChecklistScreen from '../screens/monitoring/DailyChecklistScreen';
import SymptomsScreen from '../screens/monitoring/SymptomsScreen';
import HistoryScreen from '../screens/monitoring/HistoryScreen';

import ProgressScreen from '../screens/progress/ProgressScreen';
import PointsScreen from '../screens/progress/PointsScreen';
import RankingScreen from '../screens/progress/RankingScreen';
import LevelBonusScreen from '../screens/progress/LevelBonusScreen';

import RewardsScreen from '../screens/rewards/RewardsScreen';
import RewardDetailsScreen from '../screens/rewards/RewardDetailsScreen';

import ActivityListScreen from '../screens/activities/ActivityListScreen';
import CreateActivityScreen from '../screens/activities/CreateActivityScreen';

import WeeklyReportScreen from '../screens/reports/WeeklyReportScreen';

import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import ChangePasswordScreen from '../screens/profile/ChangePasswordScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoadingJourney" component={LoadingJourneyScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="ChildList" component={ChildListScreen} />
      <Stack.Screen name="CreateChild" component={CreateChildScreen} />
      <Stack.Screen name="EditChild" component={EditChildScreen} />
      <Stack.Screen name="ChildDetails" component={ChildDetailsScreen} />

      <Stack.Screen name="RegisterOrthosisUsage" component={RegisterOrthosisUsageScreen} />
      <Stack.Screen name="DailyChecklist" component={DailyChecklistScreen} />
      <Stack.Screen name="Symptoms" component={SymptomsScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />

      <Stack.Screen name="Progress" component={ProgressScreen} />
      <Stack.Screen name="Points" component={PointsScreen} />
      <Stack.Screen name="Ranking" component={RankingScreen} />
      <Stack.Screen name="LevelBonus" component={LevelBonusScreen} />

      <Stack.Screen name="Rewards" component={RewardsScreen} />
      <Stack.Screen name="RewardDetails" component={RewardDetailsScreen} />

      <Stack.Screen name="ActivityList" component={ActivityListScreen} />
      <Stack.Screen name="CreateActivity" component={CreateActivityScreen} />

      <Stack.Screen name="WeeklyReport" component={WeeklyReportScreen} />

      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </Stack.Navigator>
  );
}