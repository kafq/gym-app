import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import Swiper from 'react-native-swiper';
import Layout from '../constants/Layout';
import {Slider, CheckBox} from 'react-native-elements';
import Database from '../api/database';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';


class QuestionsScreen extends Component {
  static route = {
    navigationBar: {
      visible: true,
      title: 'Browse Programs',
    },
  }

  constructor(props) {
        super(props);
        this.state = {
            level: 1,
            DaysPerWeek: 3,
            chest: false,
            back: false,
            shoulders: false,
            biceps: false,
            triceps: false,
            legs: false,
            abs: false,
            glutes: false,
        };
        this.sendAnswers = this.sendAnswers.bind(this)
  }

sendAnswers(){
   Database.addUserDetails(this.state.level, this.state.DaysPerWeek);
   this.props.navigator.push('programs');
}

onSelect(index, value){
  this.setState({
    level: value,
  })
}

  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons scrollEnabled={false} showsPagination={true}
  prevButton={<Text style={styles.buttonText}></Text>}
 nextButton={<View style={styles.button}><Text style={styles.buttonText}>Next</Text></View>}
  buttonWrapperStyle={styles.nextButton}
  loop={false}>
  <View style={styles.slide1}>
    <Text style={styles.staticText}>Our app will offer you program based on your gym experience level</Text>
    <View style={styles.divider}/>
    <Text style={styles.text}>What is your gym experience?{this.state.level}</Text>
    <View style={styles.Radio}>
    
    <RadioGroup
        size={20}
  thickness={2}
  color='#B2B2B2'
  onSelect = {(index, value) => this.onSelect(index, value)}
      >
        <RadioButton value={'1'} color='#B2B2B2'>
          <Text style={styles.labelText}>I never been in gym</Text>
        </RadioButton>

        <RadioButton value={'2'} color='#B2B2B2'>
          <Text style={styles.labelText}>I used to go to gym before</Text>
        </RadioButton>

        <RadioButton value={'3'} color='#B2B2B2'>
          <Text style={styles.labelText}>I regularly visit gym</Text>
        </RadioButton>

        <RadioButton value={'4'} color='#B2B2B2'>
          <Text style={styles.labelText}>I am gym professional</Text>
        </RadioButton>
      </RadioGroup>
  </View>
  </View>

  <View style={styles.slide2}>
    <Text style={styles.staticText}>Our app will offer you program based on your gym experience level</Text>
    <View style={styles.divider}/>
    <Text style={styles.text}>How many days per week you want to train?</Text>
    <View style={styles.Radio}>
      <View style={{flex: 1, width: Layout.window.width/2}}>
  <Slider
    value={this.state.DaysPerWeek}
    minimumValue={1}
    maximumValue={7}
    step={1}
    thumbTintColor={'#CE0707'}
    minimumTrackTintColor={'#B2B2B2'}
    onValueChange={(val) => this.setState({DaysPerWeek: val})} />
  <Text style={styles.staticText}>Value: {this.state.DaysPerWeek}</Text>
</View>
  </View>
  </View>

  <View style={styles.slide3}>
    <Text style={styles.staticText}>Our app will offer you program based on your gym experience level</Text>
    <View style={styles.divider}/>
    <Text style={styles.text}>Do you want to focus on specific muscles?</Text>
    <View style={{flexDirection: 'row', width: Layout.window.width, flexWrap: 'wrap', justifyContent: 'space-around'}}>
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Chest'
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.chest}
        onPress={() => this.setState({chest: !this.state.chest})}
      />
        <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Shoulders'
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.shoulders}
        onPress={() => this.setState({shoulders: !this.state.shoulders})}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-end', borderColor: 'transparent'}}
        title='Back '
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.back}
        onPress={() => this.setState({back: !this.state.back})}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Biceps'
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.biceps}
        onPress={() => this.setState({biceps: !this.state.biceps})}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Legs '
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.legs}
        onPress={() => this.setState({legs: !this.state.legs})}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Triceps'
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.triceps}
        onPress={() => this.setState({triceps: !this.state.triceps})}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Abs  '
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.abs}
        onPress={() => this.setState({abs: !this.state.abs})}
      />
      <CheckBox
        left
        containerStyle={{width: 135, backgroundColor: 'transparent', alignSelf: 'flex-start', borderColor: 'transparent'}}
        title='Glutes'
        iconLeft
        checkedIcon='dot-circle-o'
        uncheckedIcon='circle-o'
        checkedColor='#B2B2B2'
        checked={this.state.glutes}
        onPress={() => this.setState({glutes: !this.state.glutes})}
      />

        
  </View>
    <TouchableHighlight style={styles.doneButton} onPress={this.sendAnswers}>
    <View style={styles.button}><Text style={styles.buttonText}>Done</Text></View>
    </TouchableHighlight>
  </View>

</Swiper>

    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
 slide1: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  slide2: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  slide3: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  text: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    width: Layout.window.width * 0.8,
  },
  left: {
    marginRight: 200
  },
  right: {
    marginLeft: 200
  },
  labelText: {
    color: '#B2B2B2',
  },
  staticText: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
  },
  Radio: {
    marginTop: 50,
    alignSelf: 'center',
  },
  divider: {
    width: Layout.window.width,
    height: 1,
    backgroundColor: '#EBEBEB',
    marginBottom: 40,
  },
  nextButton: {
  flex: 1, 
  top: -200, 
  justifyContent: 'center', 
  alignItems: 'flex-end',
},
  doneButton: {
  backgroundColor: 'transparent', 
  flexDirection: 'column', 
  position: 'absolute', 
  top: 0,
  left: 0,
  right: 0, 
  bottom: 200,
  flex: 1,
  zIndex: -1, 
  paddingHorizontal: 10, 
  paddingVertical: 10, 
  justifyContent: 'flex-end', 
  alignItems: 'center',
},
button: {
  backgroundColor: '#CE0707',
  borderWidth: 5,
  borderRadius: 20,
  borderColor: '#CE0707',
  padding: 5,
  paddingHorizontal: 30,
},
buttonText: {
  fontSize: 24,
  color: '#FFFFFF'
}
  
});

export default QuestionsScreen;