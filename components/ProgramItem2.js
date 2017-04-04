import React, {Component} from 'react';
import ReactNative from 'react-native';
import {StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {withNavigation} from '@expo/ex-navigation';
import ListItem from '../components/ListItem';

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
class ProgramItem2 extends Component {
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
    this.itemsRef = this.getRef().child('exercises');
  }
  
  componentWillMount() {
        this.listenForItems(this.itemsRef);
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

  getRef() {
    return firebase.database().ref();
  }
  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      // get children as an array
      var exercises = [];
      
      snap.forEach((child) => {
        //if (this.props.item.day1muscles.arms && child.val().arms) {
        exercises.push({
          name: child.val().name,
          muscles: child.val().muscles,
          type: child.val().type,
          photo: child.val().photo,
          checked: child.val().checked,
          _key: child.key
        });
      });
      this.setState({
        exercises,
        dataSource: this.state.dataSource.cloneWithRows(exercises)
      });
    });
    
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
            <Text style={styles.title}>Program key: {this.props.item._key}</Text>
            <Text>Amount of days: {this.props.item.days}</Text>
            {this.showExercises()}
            <Text>{ this.props.item.legs}</Text>
            <Text>Day 1 exercises: </Text>
             <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderItem.bind(this)}
              enableEmptySections={true}
              style={styles.listview}/>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

    _renderItem(item) {

    const onPress = () => {
      AlertIOS.alert(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ]
      );
    };

    return (
      <ListItem item={item} imageLink={item.photo} onPress={onPress} />
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