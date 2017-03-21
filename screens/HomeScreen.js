import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import CTACard from '../components/CTACard';
import ProgramsList from '../components/ProgramsList';
import Colors from '../constants/Colors';
import PromoCard from '../components/PromoCard'

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: true,
      title: 'Dashboard',
    },
  };

  render() {
    return (
     <ScrollView>
       <CTACard />
       <Text style={styles.title}>Most Popular Programs</Text>
       <ProgramsList />
        <View style={styles.bgRectangular} />
        <PromoCard />
        <PromoCard />
      </ScrollView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#000000',
    letterSpacing: 0,
    marginVertical: 15,
    marginLeft: 15,
  },
   bgRectangular: {
    height: 300,
    width: 700,
    alignSelf: 'stretch',
    backgroundColor: Colors.tintColor,
    transform: [
      {skewY: '170deg'}
    ],
    zIndex: -1,
    marginVertical: 40,
    marginHorizontal: -100
  },
  
});