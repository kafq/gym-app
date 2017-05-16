import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import Tag from '../components/Tag';
import Database from '../api/database';

export default class FinishWorkoutScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        ownProgram: {},
        exercises: {}
    }
  }
  static route = {
    navigationBar: {
      title(params){
        return `Congratulations!`
      }
    },
  };

 async finishWorkout() {
      
      await AsyncStorage.getItem("ownProgram").then((json) => {
        try {
            const ownProgram = JSON.parse(json);
            this.setState({ownProgram})
        } catch(e) {
            console.log(e)
        }
      })
      Database.emptyWorkout();
      Database.finishWorkout();
      this.props.navigator.push('programDashboard', {
          program: this.state.ownProgram,
          exercises: [{id: 1}, {id: 2}]
      })
  }
  render() {
    return (
      <View>
        <Text>Workout is finished</Text>
        <TouchableOpacity onPress={() => {this.finishWorkout()}}><Text>Finish the Workout</Text></TouchableOpacity>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 15
  },

});
