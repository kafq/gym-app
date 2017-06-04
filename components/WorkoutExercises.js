import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {withNavigation} from '@expo/ex-navigation';
import Layout from '../constants/Layout';
import Common from '../constants/common';
import BigTag from '../components/BigTag';

@withNavigation
class WorkoutExercises extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        numberOfExercises: ''
    } 
  }

goToAllExercises() {
    this.props.navigator.push('XDayExercises', {
        dayNumber: this.props.dayNumber,
        exercises: this.props.exercises,
        program: this.props.program
    })
}
getDayOrder() {
    switch(this.props.dayNumber) {
        case 1: return 'First'
        case 2: return 'Second'
        case 3: return 'Third'
        case 4: return 'Fourth'
        case 5: return 'Fifth'
        case 6: return 'Sixth'
    }
}
    
render() {
    const {dayNumber, exercises, program, numberOfExercises, muscles} = this.props;
    return (
        <View style={[Common.container, Common.sectionBorder]}>
            <TouchableOpacity onPress={() => {this.goToAllExercises()}}>
                <View>
                    <Text style={Common.darkTitleH2}>{this.getDayOrder()} day</Text>
                    <Text style={Common.darkBodyText}>{this.props.muscles}</Text>
                    <Text style={Common.darkBodyText}>{this.props.numberOfExercises} exercises</Text>
                </View>
                    </TouchableOpacity>
        </View> 
    );
  }
}

export default WorkoutExercises;

