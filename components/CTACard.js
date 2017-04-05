import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from 'react-native-elements';
import { withNavigation } from '@expo/ex-navigation';

@withNavigation
class CTACard extends Component {
  render() {
    return (
        <View style={styles.container}>
      <Image source={require('../assets/images/CTA.png')} 
        style={styles.header}>
       	 <View>
            <Text style={styles.title}>Why not start rightnow?</Text>
            <Text style={styles.paragraph}>We will select programs adjusted to your personal parameters, needs and timetable.
                All Programs made by professionals
            </Text>
            <Button
            buttonStyle={styles.ActionButton}
            onPress={this.goToSomewhere}
  title='Choose Program' />

  		</View>

        </Image>
        </View>
    );
  }
  goToSomewhere = () => {
    this.props.navigator.push('programs');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0
 },
  title: {
    marginVertical: 30,
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 24,
  },
  paragraph: {
    marginHorizontal: 50, 
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 14,
    letterSpacing: 0,
    //lineHeight: 18,
    opacity: 0.8,
    textAlign: 'center'
  },
  header: {
    resizeMode: 'cover'
  },
  ActionButton: {
      width: 200,
      borderRadius: 100,
      borderColor: '#FFFFFF',
      borderWidth: 1,
      alignSelf: 'center',
      marginTop: 30,
      backgroundColor: 'transparent'
  }
  
});

export default CTACard;


