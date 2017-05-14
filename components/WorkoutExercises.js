import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {withNavigation} from '@expo/ex-navigation';

@withNavigation
class WorkoutExercises extends Component {

    constructor(props) {
    super(props);
   
}
goToAllExercises() {
    console.log('EXERCISES PUSHED TO THE SCREEN');
    console.log(this.props.exercises)
    this.props.navigator.push('XDayExercises', {
        dayNumber: this.props.dayNumber,
        exercises: this.props.exercises,
        program: this.props.program
    })
}
    
  render() {
    const {dayNumber, exercises, program} = this.props;
    return (
        <View>
            <Text>{this.props.dayNumber}</Text>
        <TouchableOpacity onPress={() => this.goToAllExercises()}><Text>X Day exercises</Text></TouchableOpacity>
        </View> 
    );
  }
}

const styles = StyleSheet.create({
   newsScroll: {
    backgroundColor: 'transparent',
  },
  });

export default WorkoutExercises;

