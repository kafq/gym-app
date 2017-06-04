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
import ExerciseItem from '../components/ExerciseItem';
import Common from '../constants/common';

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

async componentDidMount() {
  await this.setState({
    dataSource: this.state.dataSource.cloneWithRows(this.props.route.params.exercises)
  })
}
  render() {
    return (
     <ScrollView>
       <View style={[Common.container]}>
       <Text style={Common.darkTitleH1}>Most Popular Programs</Text>
       <Text style={Common.darkBodyText}>Exercises for {this.props.route.params.dayNumber} day. Lorem ipsum dolor sit amet consecutur</Text>
        <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}/>
                    </View>
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
      <ExerciseItem item={item} imageLink={item.photo} onPress={goToRoute} onReplace={goToReplace}/>
    );
  }
}