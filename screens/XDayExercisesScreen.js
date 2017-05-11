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


  render() {
    return (
     <ScrollView>
       <Text>Most Popular Programs</Text>

        <Text>{this.props.route.params.dayNumber}</Text>
        <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.props.route.params.exercises)}
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