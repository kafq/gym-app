import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Picker, AsyncStorage } from 'react-native';
import Layout from '../constants/Layout';
import Tag from '../components/Tag';
import ProgressController from "../components/ProgressController";
import * as firebase from 'firebase';
import Database from '../api/database';
import {Components} from 'expo';

import { NavigationStyles } from '@expo/ex-navigation';


export default class ExerciseScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      weight: '50',
      metric: 'kg',
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
    console.log('Workout log below');
    console.log(this.props.route.params.logs);
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
    Database.addExerciseStats(this.props.route.params.exercise._key, this.state.weight, this.state.metric);
  }
   
   renderNextButton = () => {
     goToNext = () => {
       if (!this.state.paused) {
       this.setState({paused: !this.state.paused})
       }
       Database.addExerciseStats(this.props.route.params.exercise._key, this.state.weight, this.state.metric, true);
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
         
         
         <Modal
          animationType={'slide'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <TouchableWithoutFeedback>
          <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <Text>Hello World!</Text>
            <View style={styles.pickers}>
              <Picker
                style={{width:150}}
                selectedValue={this.state.weight}
                onValueChange={(number) => this.setState({weight: number})}>
                  <Picker.Item style={{fontSize: 14}} label="50" value="50" />
                  <Picker.Item style={{fontSize: 14}} label="60" value="60" />
                  <Picker.Item style={{fontSize: 14}} label="70" value="70" />
                  <Picker.Item style={{fontSize: 14}} label="80" value="80" />
                  <Picker.Item style={{fontSize: 14}} label="90" value="90" />
                  <Picker.Item style={{fontSize: 14}} label="100" value="100" />
              </Picker>
              <Picker
                style={{width:150}}
                selectedValue={this.state.metric}
                onValueChange={(metric) => this.setState({metric})}>
                  <Picker.Item style={{fontSize: 14}} label="kg" value="kg" />
                  <Picker.Item style={{fontSize: 14}} label="lbs" value="lbs" />
              </Picker>
            </View>
            <TouchableOpacity onPress={ this.sendData.bind(this) }>
              <Text>SEND INFORMATION TO FIREBASE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableOpacity>
          </View>
          </View>
          </TouchableWithoutFeedback>
        </Modal>


        <View style={styles.videoContainer}>
          <TouchableWithoutFeedback onPress={() => {
            if (this.state.videoRate === 1.0) { this.setState({videoRate: 0})}
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
          style={{width: Layout.window.width, height: 200}}
          />
           
          </TouchableWithoutFeedback>
          <ProgressController duration={duration}
                                          currentTime={currentTime}
                                          percent={completedPercentage}
                                          onNewPercent={this.onProgressChanged.bind(this)}/>
        </View>
        <View style={styles.container}>
          <Text style={styles.heading1}>{this.props.route.params.exercise.name}</Text>
          <Text style={styles.heading1}>{this.props.route.params.exercise.video}</Text>
          <Tag title={'muscle group'} content={this.props.route.params.exercise.muscles} color={'#000'}/>
          <Text>You have passed: {this.props.route.params.exercise.type}</Text>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
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
