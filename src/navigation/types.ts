import { Child } from '../types/child';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  ChildList: undefined;
  CreateChild: undefined;
  EditChild: { child: Child };
  ChildDetails: { child: Child };
  RegisterOrthosisUsage: undefined;
  DailyChecklist: undefined;
  Symptoms: undefined;
  History: undefined;
  Progress: undefined;
  Points: undefined;
  Ranking: undefined;
  Rewards: undefined;
  RewardDetails: undefined;
  Profile: undefined;
  Settings: undefined;
};