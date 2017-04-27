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
      uid: '',
      hasProgram: false
    }
  }
  static route = {
    navigationBar: {
      visible: true,
      title: 'Dashboard',
    },
  };
componentDidMount() {
    //let user = firebase.auth().currentUser;
    //console.log(user);
    this.retrieveUserId();
}
renderCard = () => {
  if (this.state.hasProgram) {
    return(
      <View>
        <HeroCard/>
      </View>
    );
  }
  else {
    return (
      <View>
        <CTACard/>
      </View>
    )
  }
}
retrieveUserId() {
  //let that = this;
      let renderAction = setInterval(() => {
        if ( firebase.auth().currentUser.uid !== null ) {
            clearInterval(renderAction);
            let uid = firebase.auth().currentUser.uid;
            this.setState({uid});
            let path = "/user/" + uid + "/ownProgram";
            firebase.database().ref(path).on('value', (snap) => {
              if (snap.val().hasProgram) { 
                console.log('Program found');
                this.setState({hasProgram: true});
                console.log(this.state);
                return true;
                actionCard = (
                  <Text>OH TIJ BOH TI MOI</Text>
                )
              }
              else {
                console.log('No program here')
                this.setState({hasProgram: false})
                return false};
            }, (e) => {console.log(e)})
            return firebase.auth().currentUser.uid;
        } else {
          console.log('Wait for it');
        }
      }, 700);

}
  render() {
    let actionCard = (<Text>Privet</Text>)
    return (
     <ScrollView>
       {this.renderCard()}
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