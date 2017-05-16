import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from 'react-native-elements';
import { withNavigation } from '@expo/ex-navigation';
import Layout from '../constants/Layout';
import BigTag from '../components/BigTag';
import { Font } from 'expo';

export default class ProgramBadge extends Component {


  render() {
    return (
        <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/program_dashboard.png')}
              style={{flex: 1, width: null, height: null}}>
                <View style={styles.heroContainer}>
                    <Text style={styles.programState}>YOUR PROGRAM</Text>
                    <View style={styles.inlineTagContainer}>
                        <BigTag title={'days per week'} content={this.props.days}/>
                        <BigTag title={'days overall'} content={'30'}/>
                    </View>
                    <TouchableOpacity style={styles.actionButton} onPress={() => {console.log('clicked')}}><Text style={styles.buttonTitle}>Continue</Text></TouchableOpacity>
                </View>
            </Image>
        </View>
    )
  }
  
}

const styles = StyleSheet.create({
imageContainer: {
      height: 200,
      backgroundColor: 'transparent',
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowRadius: 4,
      shadowOpacity: 0.5,
      marginBottom: 10
  },
  programState: {
    fontWeight: '600',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    fontSize: 16,
  },
  actionButton: {
      width: Layout.window.width * 0.5,
      borderRadius: 100,
      borderColor: '#FFFFFF',
      borderWidth: 1,
      alignSelf: 'flex-start',
      marginLeft: 0,
      paddingLeft: 0,
      backgroundColor: 'transparent'
  },
  heroContainer: {
    marginVertical: Layout.window.width * 0.06,
    flex: 3,
    justifyContent: 'space-between',
    marginHorizontal: Layout.window.width * 0.08,
  },
   title: {
    marginBottom: 20,
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    fontSize: 20,
  },
  paragraph: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    fontSize: 14,
    letterSpacing: 0,
    //lineHeight: 18,
    opacity: 0.8,
  },
  buttonTitle: {
    fontSize: 16,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    marginVertical: 7,
  },
  inlineTagContainer: {
      flexDirection: 'row'
  }
})