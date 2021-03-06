import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from "react-native";
import { Button } from 'react-native-elements';
import { withNavigation } from '@expo/ex-navigation';
import Layout from '../constants/Layout';
import ExerciseItem from '../components/ExerciseItem';
import BigTag from '../components/BigTag';
import { Font } from 'expo';
import Database from '../api/database';
import Common from '../constants/common';

@withNavigation
export default class ProgramBadge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }
    componentDidMount() {
        this.loadProps().then((sequence) => {
            this.setState({
                isLoading: false
            })
        })
    }
    async loadProps() {
        let sequence = await this.props.sequence;
        return sequence;
    }
  render() {
      if (this.state.isLoading) {
          return (
              <View><Text>Is loading...</Text>
              </View>
          )
      }
 
    return (
        <View>
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
                    {this._displayEnrollButton()}
                </View>
            </Image>
        </View>
        {this.showContinueExercise()}
        </View>
    )
  }
  showContinueExercise() {

    switch (this.props.programName) { 
        case this.props.program._key:
            let index = 1;
            let dayNumber = '';
            let day = '';
            console.log('Program name is ' + this.props.programName + ' and program key is ' + this.props.program._key)
            console.log('About to trigger Database.js');
            Database.getCurrentExerciseIndex( (currentIndex) => {index = currentIndex});
            Database.getCurrentWorkoutDay( (currentDay) => { dayNumber = currentDay});
            day = 'day' + dayNumber;
            continueProgram = () => {
                this.props.handleContinueProgram();
            }
            return (
                <View style={[Common.container, Common.sectionBorder]}>
                    <Text style={Common.darkTitleH1}>Continue your workout</Text>
                    <ExerciseItem showSeparator={false} onPress={() => {continueProgram()}} item = {this.props.sequence[day][index]} own={false}/>
                </View>
            )
        default: return( <View/> )
    }
      
  }

_displayEnrollButton() {
    enrollProgram = () => {
        let emptyArr = [];
        Database.enrollIntoProgram(this.props.program);
        Database.saveExerciseSequence(this.props.sequence);
        AsyncStorage.setItem('ownProgram', JSON.stringify(this.props.program));
        AsyncStorage.setItem('logs', JSON.stringify(emptyArr));
        this.props.handleClick(true);
    }
    goToRoute = () => {
        this.props.navigator.push('editProgramDash', {
        program: this.props.program,
        uid: this.props.uid
        })
    }
    continueProgram = () => {
        this.props.handleContinueProgram();
    }
    switch (this.props.programName) {
        case '':
            return(
                    <TouchableOpacity style={Common.lightButtonRounded} onPress={enrollProgram}>
                        <Text style={Common.lightActionTitle}>Enroll into program</Text>
                    </TouchableOpacity>
            );
        case this.props.program._key:
            return(
                    <TouchableOpacity style={Common.lightButtonRounded} onPress={goToRoute}>
                        <Text style={Common.lightActionTitle}>Edit the program</Text>
                    </TouchableOpacity>
            );
        default: 
            return(
                <View>
                    {/*<TouchableOpacity style={styles.actionButton} onPress={() => {console.log('clicked')}}><Text style={styles.buttonTitle}>DEFAULT CASE</Text></TouchableOpacity>*/}
                </View>
            );
    }
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
      width: Layout.window.width * 0.5 + 50,
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