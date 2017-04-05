import { createRouter } from '@expo/ex-navigation';

import RootNavigation from './RootNavigation';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import LoginScreen from '../screens/LoginScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import ProgramDashboardScreen from '../screens/ProgramDashboardScreen';
import LogedInDash from '../screens/LogedInDash'

export default createRouter(() => ({
  home: () => HomeScreen,
  links: () => LinksScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
  login:() => LoginScreen,
  exercise: () => ExerciseScreen,
  programs: () => ProgramsScreen,
  programDashboard: () => ProgramDashboardScreen,
  logedInDash: () => LogedInDash

}));
