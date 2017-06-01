import React, {Component} from 'react';
import ReactNative from 'react-native';
import {StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {withNavigation} from '@expo/ex-navigation';
import Common from '../constants/common';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
const { View, TouchableHighlight, Text, Image, TouchableOpacity } = ReactNative;

@withNavigation
class ExerciseItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uriLink: 'not empty string',
      videoLink: 'not empty string',
    }
  }
  componentDidMount() {
    var storageRef = firebase.storage().ref(`exercises/${this.props.item.photo}.png`);
    storageRef.getDownloadURL().then((url) => {
      this.setState({
        uriLink: url
      })
    }, function(error) {
      console.log(error);
    });
  }

  displayAlternativeButton = () => {
    if (this.props.item.own) {
      return (
      <TouchableOpacity onPress={this.props.onReplace}>

          <Ionicons
        name={'ios-repeat-outline'}
        size={32}
        color={'#B3B3B3'}
      />

      </TouchableOpacity>)
    }
  }
  
  render() {
    return (
      <TouchableHighlight 
        underlayColor={'#920707'}
        onPress={this.props.onPress}>
        <View style={[Common.inlineContainer, Common.paddingVertical, Common.sectionBorder]}>
          <View style={[Common.exerciseThumbnail, Common.shadowMedium]}>
            <Image source={{uri: this.state.uriLink || require('../assets/images/CTA.png')}} style={Common.imageStyle}/>
          </View>
          <View style={[Common.inlineContainer]}>
            <View style={Common.containerText}>
              <Text style={Common.darkTitleH3}>{this.props.item.name || ''}</Text>
              <Text style={Common.darkNameTag}>{this.props.item.muscles}</Text>
              <Text style={Common.darkNameTag}>{this.props.item.type}</Text>
            </View>
            <View style={Common.buttonContainer}>
              {this.displayAlternativeButton()}
            </View>
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
  imageStyle: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 3,
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
module.exports = ExerciseItem;