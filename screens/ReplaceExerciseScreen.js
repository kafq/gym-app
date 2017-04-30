import React, { Component } from 'react';

import {
 Text,
 View,
 Image,
 TouchableOpacity,
 AsyncStorage,
 ListView,
 ScrollView,
} from 'react-native';

import { MonoText } from '../components/StyledText';

const ListItem = require('../components/ListItem');

export default class ReplaceExerciseScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      exercises: []
    }
  }
    static route = {
      navigationBar: {
      visible: true,
      title: 'Replace exercise',
    },
  };

  componentWillMount() {
    AsyncStorage.getItem("exercises").then((json) => {
      try {
        const exercises = JSON.parse(json);
        this.setState({exercises, dataSource: this.state.dataSource.cloneWithRows(exercises)});
      } catch(e) {

      }
    })
  }
  replaceExerciseWithAlternative =  (replaceId, replaceWithId) => {
    var replacePosition = sequence.map( (e) => { e.id }).indexOf(replaceId);
    var replaceWithPosition = library.map( (e) => { e.id }).indexOf(replaceWithId);
    sequence[replacePosition] = library[replaceWithPosition];
    }
  setSource(exercises, itemsDatasource, otherState = {}){
    this.setState({
      exercises,
      dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
      ... otherState
    });
  }

  render() {
   
    return (
      <ScrollView>
      <View>

          <ListItem
            item = {this.props.route.params.item}
          />
      </View>

        <ListView
          dataSource={this.state.dataSource}
          initialListSize = {4}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
/>
         
      </ScrollView>
    )
  }
  
  _renderItem(item) {
    return (
      <ListItem item={item} imageLink={item.photo} videoLink={item.video} />
    );
  }
}