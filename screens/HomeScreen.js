import React, { Component } from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';

import { MonoText } from '../components/StyledText';
import CTACard from '../components/CTACard';
import ProgramsList from '../components/ProgramsList';
import Colors from '../constants/Colors';
import PromoCard from '../components/PromoCard';
import HeroCard from '../components/HeroCard';
import * as firebase from 'firebase';
import Database from '../api/database';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: ''
    }
  }
  static route = {
    navigationBar: {
      visible: true,
      title: 'Dashboard',
    },
  };
  componentWillMount() {
    let id = '';
    AsyncStorage.getItem("uid").then((json) => {
      try {
        const uid = json;
        this.setState({uid})
      } catch(e) {

      }
    })
  }
  componentDidMount() {
    this.getId();
  }
  async getId() {
    try {
      let uid = await Database.getId();
      AsyncStorage.setItem("uid", '');
    } catch(e) {

    }
  }

  render() {
    return (
     <ScrollView>
       <CTACard/>
       <TouchableOpacity onPress={this.getId}><Text>Press me</Text></TouchableOpacity>
       <Text>{this.state.uid}</Text>
       <Text style={styles.title}>Most Popular Programs</Text>
       <ProgramsList />
        <View style={styles.bgRectangular} />
        <PromoCard onPress={this.goToSomewhere}/>
        <PromoCard onPress={this.goToSomewhere}/>
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
    marginBottom: -300,
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