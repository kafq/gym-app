import React, {Component} from 'react';
import ReactNative from 'react-native';
import {StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {withNavigation} from '@expo/ex-navigation';
import ExerciseItem from '../components/ExerciseItem';
import Layout from '../constants/Layout';
import Tag from '../components/Tag';

const { View, TouchableHighlight, Text, Image, ListView, TouchableOpacity } = ReactNative;

const filterExercises = (filter, exercises) => {
return exercises.filter((item) => {
  if (filter === 'ALL') return true;
  if (filter === 'ISOLATION') return item.type === 'isolating';
  if (filter === 'ARMS') return item.arms;
  if (filter === 'SHOULDERS') return item.shoulders;
  if (filter === 'CHEST') return item.chest;
  if (filter === 'BACK') return item.back;
  if (filter === 'LEGS') return item.legs;
})
}

@withNavigation
class ProgramCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      uriLink: "",
      filter: "ARMS",
      exercises: []
    }
    this.handleFilter = this.handleFilter.bind(this);
 
  }
  
  handleFilter(filter) {
    this.setSource(this.state.exercises, filterExercises(filter, this.state.exercises), { filter })
  }
  
  setSource(exercises, itemsDatasource, otherState = {}){
    this.setState({
      exercises,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ... otherState
    })
  }
  
  goToRoute = () => {
    this.props.navigator.push('programDashboard', {
      program: this.props.item,
      exercises: this.props.exercises,
      uid: this.props.uid
    })
  }

  render() {
    const { exercises } = this.props;
    const { uid } = this.props;
    return (
      
      <TouchableHighlight 
        underlayColor={'#920707'}
        onPress={this.goToRoute}
        style={styles.container}>
        <Image 
          source={require('../assets/images/program_background.png')}
          resizeMode={Image.resizeMode.cover}
          style={{flex: 1, width: null, height: null, borderRadius: 6}}
        >
          <View style={styles.textContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Program key: {this.props.item._key}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Tag title={'days overall'} content={'30 days'} color='#fff'/>
              <Tag title={'per week'} content={this.props.item.days} color='#fff'/>
              <Tag title={'muscles'} content={this._getMuscles()} color='#fff'/>
              <Tag title={'gender'} content={'Both'} color='#fff'/>
              <Tag title={'level'} content={'Beginner'} color='#fff'/>
            </View>
          </View>
        </Image>
      </TouchableHighlight>
    );
  }
_getMuscles() {
  const muscles = (this.props.item.day1 || '') + ', '+ 
                  (this.props.item.day2 || '') + ', ' + 
                  (this.props.item.day3 || '');

  const filteredMuscles = muscles.split(', ').filter((elem, index, self) => {
    return (index == self.indexOf(elem) && elem !== '');
  })
  return filteredMuscles.join(', ');

}

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Layout.window.width * 0.8,
    marginHorizontal: 20,
    borderRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  textContainer: {
    alignItems: 'flex-start',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'flex-start'
  },
  infoContainer: {
    flex: 3,
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '500',
    color: '#fff',
    fontSize: 24
  },
  text: {
    color: '#fff'
  },
})
module.exports = ProgramCard;