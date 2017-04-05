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
import HeroCard from '../components/HeroCard';
import ProgramsList from '../components/ProgramsList';
import Colors from '../constants/Colors';
import PromoCard from '../components/PromoCard';
import ExThumbnail from '../components/ExThumbnail';
import Stats from '../components/Stats';


export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: true,
      title: 'Dashboard',
    },
  };

  render() {
    return (
     <ScrollView style={styles.container}>
       <HeroCard />
       <ExThumbnail />
       <Text style={styles.title}>Your Progress</Text>
       <Stats />
       <PromoCard style={styles.PromoCard} onPress={this.goToSomewhere}/>
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
    marginTop: -20,
    backgroundColor: 'transparent',
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
  PromoCard: {
    marginTop: 350,
  }
  
});