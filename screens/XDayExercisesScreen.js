import React, { Component } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  ScrollView,
} from 'react-native';

import Database from '../api/database';
import ListItem from '../components/ListItem';

export default class XDAYExercisesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      ownProgram: '',
      dataSource: new ListView.DataSource({
              rowHasChanged: (r1, r2) => r1 !== r2
          }),
    }
  }
  static route = {
    navigationBar: {
      visible: true,
      title(params){ 
        return `Day ${params.dayNumber} exercises`
      }
    },
  };

compare = (property) => {
    return (a, b) => {
        if (a[property] < b[property]) return -1;
        if (a[property] > b[property]) return 1;
        return 0;
    }
}
componentDidMount() {
  console.log(this.props.route.params.exercises);
  this._retrieveFilteredItems();
}
  _retrieveFilteredItems() {

    let newArr = this.props.route.params.exercises.sort(this.compare('muscles'));

        let day = 'day' + this.props.route.params.dayNumber;
        let ref = this.props.route.params.program[day];
        console.log('Ref is: ' + ref)

        const filteredByDay = this.props.route.params.exercises.filter((item) => {
            return ref.split(', ').includes(item.muscles);
        })

        const filteredByNumber = this.filterByNumber(filteredByDay, 2);
        
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.props.route.params.exercises),
            exercises: filteredByNumber,
        })
  //  }
}
filterByNumber = (arrayToFilter, n) => {
  let muscleToCompareWith = 'brain';
  let counter = 1;
  let filtered = [];
  arrayToFilter.forEach((item) => {
    if ((item.muscles !== muscleToCompareWith)) {
      
      counter = 1;
      muscleToCompareWith = item.muscles;
      filtered.push(item);
      
    }
    else if ((item.muscles === muscleToCompareWith) && (counter < n)) {
      filtered.push(item);
      counter++;
    }
  });
  console.log(filtered);
  return filtered;
}
  render() {
    return (
     <ScrollView>
       <Text>Most Popular Programs</Text>

        <Text>{this.props.route.params.dayNumber}</Text>
        <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}/>
      </ScrollView>
    );
  }
  _renderItem(item) {
    goToReplace = () => {
      this.props.navigator.push('replaceExercise', {
        item: item,
        sequence: this.state.sequence
      })
    }
    goToRoute = () => {
      this.props.navigator.push('exercise', {
        exercise: item,
      })
    }
    return (
      <ListItem item={item} imageLink={item.photo} onPress={goToRoute} onReplace={goToReplace}/>
    );
  }
}