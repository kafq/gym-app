import { createRouter } from '@expo/ex-navigation';

import RootNavigation from './RootNavigation';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import LoginScreen from '../screens/LoginScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import ProgramDashboardScreen from '../screens/ProgramDashboardScreen';
import LogedInDash from '../screens/LogedInDash';
import EditProgramScreen from '../screens/EditProgramScreen';
import EditProgramDashboard from '../screens/EditProgramDashboard';
import QuestionsScreen from '../screens/QuestionsScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  links: () => LinksScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
  login:() => LoginScreen,
  exercise: () => ExerciseScreen,
  programs: () => ProgramsScreen,
  programDashboard: () => ProgramDashboardScreen,
  logedInDash: () => LogedInDash,
  editProgramDash: () => EditProgramDashboard,
  editProgram: () => EditProgramScreen,
  questions: () => QuestionsScreen,
}));
