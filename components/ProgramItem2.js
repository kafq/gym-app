import React, {Component} from 'react';
import ReactNative from 'react-native';
import {StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {withNavigation} from '@expo/ex-navigation';
import ListItem from '../components/ListItem';
import Layout from '../constants/Layout';

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
      programName: this.props.item._key,
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
    const { exercises } = this.props;
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
              <View style={styles.tagContainer}>
                <Text style={styles.tag}>days overall</Text>
                <Text style={styles.text}>30 days</Text>
              </View>
              <View style={styles.tagContainer}>
                <Text style={styles.tag}>per week</Text>
                <Text style={styles.text}>{this.props.item.days}</Text>
              </View>
              <View style={styles.tagContainer}>
                <Text style={styles.tag}>gender</Text>
                <Text style={styles.text}>Both</Text>
              </View> 
              <View style={styles.tagContainer}>
                <Text style={styles.tag}>level</Text>
                <Text style={styles.text}>Beginner</Text>
              </View>
            </View>
          </View>
        </Image>
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
  tag: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '600',
  },
  tagContainer: {
    marginBottom: 5
  }
})
module.exports = ProgramItem2;