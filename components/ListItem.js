import React, {Component} from 'react';
import ReactNative from 'react-native';
import {StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {withNavigation} from '@expo/ex-navigation';


const { View, TouchableHighlight, Text, Image } = ReactNative;

@withNavigation
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uriLink: ""
    }
  }
  componentWillMount() {
    var storageRef = firebase.storage().ref(`exercises/${this.props.imageLink}.png`);
    console.log('Images reference: ' + storageRef);
    storageRef.getDownloadURL().then((url) => {
      this.setState({
        uriLink: url
      })
      console.log(url);
    }, function(error) {
      console.log(error);
    });
  }
  goToRoute = () => {
    this.props.navigator.push('links')
  }
  render() {
    return (
      <TouchableHighlight 
        underlayColor={'#920707'}
        onPress={this.goToRoute}>
        <View style={styles.exerciseContainer}>
          <View style={styles.imageContainer}>
            <Image source={{uri: this.state.uriLink}} style={{flex: 1, resizeMode: 'cover'}}></Image>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{this.props.item.name}</Text>
            <Text>{this.props.item.muscles}</Text>
            <Text>{this.props.item.type}</Text>
          </View>
        </View>
      </TouchableHighlight>
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
module.exports = ListItem;