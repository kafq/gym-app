import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from 'react-native-elements';
import { withNavigation } from '@expo/ex-navigation';
import Layout from '../constants/Layout';




@withNavigation
class HeroCard extends Component {


  render() {
    return (
        <View style={styles.container}>
      <Image source={require('../assets/images/CTA.png')} 
        style={styles.header}>
       	 <View style={styles.HeroContainer}>
            <Text style={styles.title}>YOUR PROGRAM</Text>
            <Text style={styles.title}>No Pain - No Gain 
            </Text>
            
            <Text style={styles.paragraph}>done this week{"\n"}props.days
            </Text>
            <Text style={styles.paragraph}>this.props.programmname
            </Text>
            <Button
            buttonStyle={styles.ActionButton}
            onPress={this.goToSomewhere}
  title='Continue Program' />
  <Text style={styles.paragraphRight}>Next Exercise:
            </Text>
            <Text style={styles.paragraphRight}>View Program
            </Text>

  		</View>

        </Image>
        </View>
    );
  }
  goToSomewhere = () => {
    this.props.navigator.push('links');
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
  HeroContainer: {
    marginHorizontal: 30,
    marginTop: 13,
    flex: 3,
    justifyContent: 'flex-start',
  },
  title: {
    marginBottom: 20,
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    fontSize: 24,
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
  paragraphRight: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    marginTop: -90,
    marginBottom: 0,
  },
  header: {
    resizeMode: 'cover',
    width: Layout.window.width,
  },
  ActionButton: {
      width: 200,
      borderRadius: 100,
      borderColor: '#FFFFFF',
      borderWidth: 1,
      alignSelf: 'flex-start',
      marginTop: 30,
      marginLeft: 0,
      paddingLeft: 0,
      backgroundColor: 'transparent'
  }
  
});

export default HeroCard;


/* Mask: */
// background: #FFFFFF;
// box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
// border-radius: 6px;
/* Bitmap: */