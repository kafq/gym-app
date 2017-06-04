import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {Grid, Col, Row} from 'react-native-elements';
import Common from '../constants/common';

export default function PromoCard({onPress}) {
    
    return (
      
        <Image source={require('../assets/images/CTA2.png')} 
        style={[Common.promotionCard, Common.centered, Common.imageCover, Common.shadowMedium]}>

<View style={Common.shadowMedium}>
              <Text style={Common.lightTitleH2}>Gain Faster with Diary</Text>
           
              <Text style={Common.lightBodyText}>Calories Tracker, Statistics, Calendar and More!
              </Text>

              <TouchableOpacity onPress={onPress} style={Common.lightButtonRounded}>
                <Text style={Common.lightActionTitle}>Choose Program</Text>
              </TouchableOpacity>
              </View>
          </Image>
          
    );
  }


const styles = StyleSheet.create({
//   container: {
//     marginBottom: 40,
//     width: 350,
//     alignSelf: 'center',
//     backgroundColor: 'transparent',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
        
//  },
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