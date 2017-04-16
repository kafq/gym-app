import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Picker } from 'react-native';
import Layout from '../constants/Layout';
import Tag from '../components/Tag';
import Database from '../api/database';

export default class ExerciseScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      weight: '50',
      metric: 'kg'
    }
  }
  static route = {
    navigationBar: {
      title(params){
        return `Do ${params.exercise.name}`
      }
    },
  };


  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  sendData() {
    console.log(this.state.weight + ' ' + this.state.metric);
    Database.addExerciseStats(this.props.route.params.exercise._key, this.state.weight, this.state.metric);
  }

  render() {
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


        <View style={styles.videoContainer}><Text style={styles.textInVideo}>The video will go here</Text></View>
        <View style={styles.container}>
          <Text style={styles.heading1}>{this.props.route.params.exercise.name}</Text>
          <Tag title={'muscle group'} content={this.props.route.params.exercise.muscles} color={'#000'}/>
          <Text>You have passed: {this.props.route.params.exercise.type}</Text>
        </View>
        <TouchableOpacity onPress={() => {
          this.setModalVisible(true)
        }}>
        <View style={styles.button}>
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
