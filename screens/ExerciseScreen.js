import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Picker, AsyncStorage } from 'react-native';
import Layout from '../constants/Layout';
import Tag from '../components/Tag';
import ProgressController from "../components/ProgressController";
import * as firebase from 'firebase';
import Database from '../api/database';
import {Components} from 'expo';
import Common from '../constants/common';

import { NavigationStyles } from '@expo/ex-navigation';


export default class ExerciseScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      weight: '70',
      metric: 'kg',
      sets: '3',
      reps: '3',
      videoLink: 'https://',
      videoRate: 1.0
    }
  }
  static route = {
    navigationBar: {
      title(params){
        return `Do ${params.exercise.name}`
      }
    },
    styles: {
      ...NavigationStyles.SlideHorizontal,
    },
  };


  componentWillMount() {
    var storageRef = firebase.storage().ref(`videos/${this.props.route.params.exercise.video || 'id1'}.mp4`);
    storageRef.getDownloadURL().then((url) => {
      
      this.setState({
        videoLink: url
      })
    }, function(error) {
      console.log(error);
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  sendData() {
    Database.addExerciseStats(this.props.route.params.exercise._key, this.state.weight, this.state.sets, this.state.reps, this.state.metric);
  }
   
   renderNextButton = () => {
     goToNext = () => {
       if (!this.state.paused) {
       this.setState({paused: !this.state.paused})
       }
       Database.addExerciseStats(this.props.route.params.exercise._key, this.state.weight, this.state.sets, this.state.reps, this.state.metric, true);
       let index = 0;
       Database.getCurrentExerciseIndex( (currentIndex) => {index = currentIndex});
       let oldLog = this.props.route.params.logs
       oldLog.push({
         id: this.props.route.params.exercise._key,
         weight: this.state.weight,
         metric: this.state.metric,
       })
       AsyncStorage.setItem('logs', JSON.stringify(oldLog));
       if (index >= this.props.route.params.sequence.length) {
         console.log('Pushed if');
         let emptyArr = []
         AsyncStorage.setItem('logs', JSON.stringify(emptyArr))
         Database.finishWorkout();
         Database.pushWorkoutLog(oldLog);
         this.props.navigator.push('finishWorkout', {
           logs: oldLog,
           workoutStarted: this.props.route.params.workoutStarted,
           workoutFinished: Date.now()
         });
       }
       else {
          console.log('Pushed else');
        
          this.props.navigator.replace('exercise', {
            exercise: this.props.route.params.sequence[index],
            insideWorkout: true,
            sequence: this.props.route.params.sequence,
            logs: oldLog,
            workoutStarted: this.props.route.params.workoutStarted
          });
       }
     }
     
     if (this.props.route.params.insideWorkout) {
       return(
         <TouchableOpacity
          onPress={goToNext}>
           <Text>
             Go to next exercise
           </Text>
         </TouchableOpacity>
       )
     }
   }

   onVideoEnd() {
        this.videoPlayer.seek(0);
        this.setState({key: new Date(), currentTime: 0, paused: true});
    }

    onVideoLoad(e) {
        this.setState({currentTime: e.currentTime, duration: e.duration});
    }

    onProgress(e) {
        this.setState({currentTime: e.currentTime});
    }

    playOrPauseVideo(paused) {
        this.setState({paused: !paused});
    }

    onBackward(currentTime) {
        let newTime = Math.max(currentTime - FORWARD_DURATION, 0);
        this.videoPlayer.seek(newTime);
        this.setState({currentTime: newTime})
    }

    onForward(currentTime, duration) {
        if (currentTime + FORWARD_DURATION > duration) {
            this.onVideoEnd();
        } else {
            let newTime = currentTime + FORWARD_DURATION;
            this.videoPlayer.seek(newTime);
            this.setState({currentTime: newTime});
        }
    }

    getCurrentTimePercentage(currentTime, duration) {
        if (currentTime > 0) {
            return parseFloat(currentTime) / parseFloat(duration);
        } else {
            return 0;
        }
    }

    onProgressChanged(newPercent, paused) {
        let {duration} = this.state;
        let newTime = newPercent * duration / 100;
        this.setState({currentTime: newTime, paused: paused});
        this.videoPlayer.seek(newTime);
    }

  render() {
            let {onClosePressed, video, volume} = this.props;
        let {currentTime, duration, paused} = this.state;
        const completedPercentage = this.getCurrentTimePercentage(currentTime, duration) * 100;
    return (
      <ScrollView>
         
        <View style={styles.videoContainer}>
          <TouchableWithoutFeedback 
            onPress={() => {
              if (this.state.videoRate === 1.0) { 
                this.setState({videoRate: 0})}
              else {this.setState({videoRate: 1.0})}
            }}>
            <Components.Video
              ref={videoPlayer => this.videoPlayer = videoPlayer}
              source={{ uri: this.state.videoLink }}
              isNetwork = {true}
              rate={this.state.videoRate}
              volume={1.0}
              muted={false}
              onEnd={this.onVideoEnd.bind(this)}
                          onLoad={this.onVideoLoad.bind(this)}
              onProgress={this.onProgress.bind(this)}
              resizeMode="cover"
              repeat
              useNativeControls
              style={{width: Layout.window.width, height: Layout.window.width * 0.56}}
            />
          </TouchableWithoutFeedback>

        </View>

        <View style={[Common.container, Common.sectionBorder]}>
          <Text style={Common.darkTitleH1}>{this.props.route.params.exercise.name}</Text>
          <View style = {Common.inlineContainer}>
            <Tag
              title={'muscle group'}
              content={this.props.route.params.exercise.muscles}
              color={'#000'}/>
            <Tag 
              title={'exercise type'}
              content={this.props.route.params.exercise.type}
              color={'#000'}/>
          </View>
        </View>
        <View style={Common.inlineContainer}>
              <Picker
                itemStyle={{fontSize: 16}}
                style={{flex: 1}}
                selectedValue={this.state.weight}
                onValueChange={(number) => this.setState({weight: number})}>
                  <Picker.Item label="50kg" value="50" />
                  <Picker.Item label="60kg" value="60" />
                  <Picker.Item label="70kg" value="70" />
                  <Picker.Item label="80kg" value="80" />
                  <Picker.Item label="90kg" value="90" />
                  <Picker.Item label="100kg" value="100" />
              </Picker>
              <Picker
                itemStyle={{fontSize: 16}}
                style={{flex: 1}}
                selectedValue={this.state.sets}
                onValueChange={(sets) => this.setState({sets})}>
                  <Picker.Item label="1 rep" value="1" />
                  <Picker.Item label="2 reps" value="2" />
                  <Picker.Item label="3 reps" value="3" />
                  <Picker.Item label="4 reps" value="4" />
                  <Picker.Item label="5 reps" value="5" />
              </Picker>
              <Picker
                itemStyle={{fontSize: 16}}
                style={{flex: 1}}
                selectedValue={this.state.reps}
                onValueChange={(reps) => this.setState({reps})}>
                  <Picker.Item label="1 set" value="1" />
                  <Picker.Item label="2 sets" value="2" />
                  <Picker.Item label="3 sets" value="3" />
                  <Picker.Item label="4 sets" value="4" />
                  <Picker.Item label="5 sets" value="5" />
              </Picker>
            </View>
            <TouchableOpacity onPress={ this.sendData.bind(this) }>
              <Text>SEND INFORMATION TO FIREBASE</Text>
            </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.setModalVisible(true)
        }}>
        <View style={styles.button}>
          {this.renderNextButton()}
        <Text style={styles.textWhite}>Input data</Text>
        </View>
        </TouchableOpacity>
       
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 15
  },
  videoContainer: {
    height: Layout.window.height * 0.35,
    backgroundColor: '#920707'
  },
  textInVideo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff'
  },
  heading1: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  button: {
    width: Layout.window.width,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#920707',
  },
  textWhite: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    width: Layout.window.width * 0.8,
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  pickers: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
