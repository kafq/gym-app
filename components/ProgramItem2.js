import React, {Component} from 'react';
import ReactNative from 'react-native';
import {StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {withNavigation} from '@expo/ex-navigation';


const { View, TouchableHighlight, Text, Image } = ReactNative;

@withNavigation
class ProgramItem2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uriLink: ""
    }
  }

  goToRoute = () => {
    this.props.navigator.push('exercise', {
      exerciseName: this.props.item.name,
      exerciseType: this.props.item.type
    })
  }
  showExercises = () => {
      return(
          <Text>Privet</Text>
          /**
           * 1) take all 'true' muscles
           * 2) take all exercises
           * 3) filter all exercises, which have 'true' muscles
           * 4) render exercises with 'true' muscles within ListItem
           */
      )
  }
  render() {
    return (
      <TouchableHighlight 
        underlayColor={'#920707'}
        onPress={this.goToRoute}>
        <View style={styles.exerciseContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Exercise key: {this.props.item._key}</Text>
            <Text>Amount of days: {this.props.item.days}</Text>
            {this.showExercises()}
            <Text>{ this.props.item.legs}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    width: 107,
    height: 73,
    backgroundColor: '#CFCFCF',
    margin: 12,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    borderRadius: 6
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '500'
  },
  tag: {
    fontSize: 14,
    marginVertical: 1
  }
})
module.exports = ProgramItem2;