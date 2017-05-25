import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import Tag from '../components/Tag';
import Database from '../api/database';

export default class FinishWorkoutScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        ownProgram: {},
        exercises: {},
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
      //Database.finishWorkout();
      this.props.navigator.pop(2);
  }
  calculateWorkoutTime(){
    let workoutTime = (this.props.route.params.workoutFinished - this.props.route.params.workoutStarted)/60/60;
    console.log('Time is ' + workoutTime);
    return workoutTime;
  }
  render() {
    return (
      <View>
        <Text>Workout is finished</Text>
        <TouchableOpacity onPress={() => {this.finishWorkout()}}><Text>Finish the Workout</Text></TouchableOpacity>
        <Text>Please, rate workout difficulty, so that we make it more suitable for you</Text>
        <Text>{this.calculateWorkoutTime()}</Text>
        <TouchableOpacity onPress={() => {console.log(1); Database.rateWorkout(1)}}><Text>Bad</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {console.log(2); Database.rateWorkout(2)}}><Text>Fine</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {console.log(3); Database.rateWorkout(3)}}><Text>Very nice</Text></TouchableOpacity>
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
