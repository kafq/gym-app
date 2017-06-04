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
  AsyncStorage,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import CTACard from '../components/CTACard';
import ProgramsList from '../components/ProgramsList';
import Colors from '../constants/Colors';
import PromoCard from '../components/PromoCard';
import HeroCard from '../components/HeroCard';
import * as firebase from 'firebase';
import Database from '../api/database';
import Common from '../constants/common';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      hasProgram: false,
      ownProgram: ''
    }
  }
  static route = {
    navigationBar: {
      visible: true,
      title: 'Dashboard',
    },
  };
componentDidMount() {
    this.retrieveUserId();
    this.listenForExercises();
}
  listenForExercises() {
    firebase.database().ref().child('exercises').on('value', (snap) => {
      // get children as an array
      var exercises = [];
      
      snap.forEach((child) => {
        exercises.push({
          name: child.val().name,
          muscles: child.val().muscles,
          type: child.val().type || 'basic',
          photo: child.val().photo,
          video: child.val().video || 'https://',
          _key: child.key.slice(2),
        });
      });
      AsyncStorage.setItem('exercises', JSON.stringify(exercises));
    });
    
  }

renderCard = () => {
  if (this.state.hasProgram) {
    return(
      <View>
        <HeroCard program={this.state.ownProgram}/>
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
        if ( firebase.auth().currentUser !== null ) {
            clearInterval(renderAction);
            let user = firebase.auth().currentUser;
            let uid = user.uid;
            this.setState({uid});
            let path = "/user/" + uid + "/ownProgram";
            firebase.database().ref(path).on('value', (snap) => {
              if (snap.val().hasProgram) { 
                this.setState({hasProgram: true});
                this.setState({ownProgram: snap.val()});
                return true;
                
              }
              else {
                this.setState({hasProgram: false})
                return false
              };
            }, (e) => {console.log(e)})
            return firebase.auth().currentUser.uid;
        }
      }, 200);

}
  render() {
    let actionCard = (<Text>Privet</Text>)
    return (
     <ScrollView>
       {this.renderCard()}
       <TouchableOpacity onPress={() => {this.props.navigator.push('styles')}}>
         <Text style={{opacity: 0.3}}>View styles</Text>
       </TouchableOpacity>
        <View style={Common.containerLeft}>
            <Text style={Common.darkTitleH1}>Seasonal products</Text>
       </View>
       <ProgramsList style={Common.sectionBorder}/>

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