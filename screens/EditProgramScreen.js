import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {CheckBox} from 'react-native-elements';
import Layout from '../constants/Layout';
import Tag from '../components/Tag';
import Database from '../api/database';

export default class EditProgramScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      chest: false,
      shoulders: false,
      back: true,
      biceps: false,
      triceps: false,
      legs: false,
      calves: false,
      glutes: false,
      abs: false
    }
  }
  static route = {
    navigationBar: {
      title(params){
        return `Edit ${params.program._key}`
      }
    },
  };
  componentWillMount() {
    this.getBoolMuscles();
  }
  getBoolMuscles = () => {
    const programRef = this.props.route.params.program;
    const muscles = (programRef.day1 || '') + ', '+ 
                  (programRef.day2 || '') + ', ' + 
                  (programRef.day3 || '') + ', ' +
                  (programRef.day4 || '') + ', ' +
                  (programRef.day5 || '') + ', ' +
                  (programRef.day6 || '');
    const musclesArr = muscles.split(', ').filter((elem, index, self) => {
      return (index == self.indexOf(elem) && elem !== '');
    });
    this.setState({
      chest: chest = (musclesArr.indexOf('chest') > -1) ? true : false,
      shoulders: shoulders = (musclesArr.indexOf('shoulders') > -1) ? true : false,
      back: back = (musclesArr.indexOf('back') > -1) ? true : false,
      biceps: biceps = (musclesArr.indexOf('biceps') > -1) ? true : false,
      triceps: triceps = (musclesArr.indexOf('triceps') > -1) ? true : false,
      legs: legs = (musclesArr.indexOf('legs') > -1) ? true : false,
      calves: calves = (musclesArr.indexOf('calves') > -1) ? true : false,
      glutes: glutes = (musclesArr.indexOf('glutes') > -1) ? true : false,
      abs: abs = (musclesArr.indexOf('abs') > -1) ? true : false,
    });
};
updateProgram = () => {
  getMuscles = () => {
    let muscles = [];
    if (this.state.chest) {muscles.push('chest');}
    if (this.state.shoulders) {muscles.push('shoulders');}
    if (this.state.back) {muscles.push('back');}
    if (this.state.biceps) {muscles.push('biceps');}
    if (this.state.triceps) {muscles.push('triceps');}
    if (this.state.legs) {muscles.push('legs');}
    if (this.state.calves) {muscles.push('calves');}
    if (this.state.glutes) {muscles.push('glutes');}
    muscles.join(', ');
    return muscles.join(', ');
};
  Database.updateProgram(getMuscles());
}
  render() {
    return (
      <ScrollView style={styles.container}>
         
<Text>{this.props.route.params.program._key}</Text>         
<Text>{this.props.route.params.program.days}</Text>
<Text>{this.props.route.params.program.gender}</Text>
<Text>{this.props.route.params.program.day1}</Text>
<Text>{this.props.route.params.program.days}</Text>
      <Text>Muscles in first day</Text>
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Chest'
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.chest}
        onPress={() => this.setState({chest: !this.state.chest})}
      />
        <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Shoulders'
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.shoulders}
        onPress={() => this.setState({shoulders: !this.state.shoulders})}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-end', borderColor: 'transparent'}}
        title='Back '
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.back}
        onPress={() => this.setState({back: !this.state.back})}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Biceps'
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.biceps}
        onPress={() => this.setState({biceps: !this.state.biceps})}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Legs '
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.legs}
        onPress={() => this.setState({legs: !this.state.legs})}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Triceps'
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.triceps}
        onPress={() => this.setState({triceps: !this.state.triceps})}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Abs  '
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.abs}
        onPress={() => this.setState({abs: !this.state.abs})}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Glutes'
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.glutes}
        onPress={() => this.setState({glutes: !this.state.glutes})}
      />
      <View>
      <TouchableOpacity onPress={this.updateProgram}><Text>UPDATE PROGRAM</Text></TouchableOpacity>
      </View>
      </ScrollView>
      
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
