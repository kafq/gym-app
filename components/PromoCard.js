import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from 'react-native-elements';

export default function PromoCard({onPress}) {
    
    return (
      <View style={styles.container}>
      <Image source={require('../assets/images/CTA2.png')} 
        resizeMode={Image.resizeMode.fill} style={styles.header}>
       	 <View>
            <Text style={styles.title}>Gain Faster with Diary</Text>
            <Text style={styles.paragraph}>Calories Tracker, Statistics, Calendar and More!
            </Text>
            <Button
            buttonStyle={styles.ActionButton}
            onPress={onPress}
  title='Choose Program' />

  		</View>

        </Image>
        </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    marginTop: -350,
    marginBottom: 400,
    width: 350,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
        
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
    lineHeight: 18,
    opacity: 0.8,
    textAlign: 'center'
  },
  ActionButton: {
      width: 200,
      borderRadius: 100,
      borderColor: '#FFFFFF',
      borderWidth: 1,
      alignSelf: 'center',
      marginTop: 30,
      backgroundColor: 'transparent'
  },
  header: {
    borderRadius: 6,
  }
  
});