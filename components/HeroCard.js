import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from "react-native";
import { Button } from 'react-native-elements';
import { withNavigation } from '@expo/ex-navigation';
import Layout from '../constants/Layout';
import Common from '../constants/common';
import BigTag from '../components/BigTag';
import {Grid, Col, Row} from 'react-native-elements';

@withNavigation
class HeroCard extends Component {

  render() {
    return (

          <Image
            source={require('../assets/images/CTA.png')} 
            style={Common.imageCover}>
            <View style={[Common.container, Common.paddingVertical]}>
            <Grid>
              <Row size={1}>
               
                    <View>
                      <Text style={[Common.lightTitleH4, Common.removeMarginBetweenTitles]}>YOUR PROGRAM</Text>
                      <Text style={[Common.lightTitleH1, Common.removeMarginBetweenTitles]}>Basic shoulders gain  
                      </Text>
                    </View>
              </Row>
              <Row size={1}>

                      <Col>
                        <View style={{justifyContent: 'center'}}>
                        <BigTag
                        title={'Done this week'}
                        content={'3'}
                        color={'#fff'}
                        />
                        </View>
                      </Col>
                      <Col>
                      <View style={{justifyContent: 'center'}}>
                        <BigTag
                        title={'Exercises left'}
                        content={'12'}
                        color={'#fff'}
                        />
                        </View>
                      </Col>

                  </Row>
                  <Row size={1}>
                    <View style={{justifyContent: 'center'}}>
                      <TouchableOpacity
                        style={[Common.lightButtonRounded, Common.shadowMedium]}
                        onPress={() => {this.goToAllPrograms()}}>
                        <Text style={Common.lightActionTitle}>Continue Program</Text>
                      </TouchableOpacity>
                      {/*<TouchableOpacity style={styles.transparent} onPress={() => {this.goToAllPrograms()}}><Text style={styles.textWhite}>All programs</Text></TouchableOpacity>*/}
                    </View>
                    </Row>
                </Grid>
                </View>
     </Image>
    );
  }
  goToProgram = async () => {
    let ownProgram;
    let exercises;
    await AsyncStorage.getItem("exercises").then((json) => {
      try {
        exercises = JSON.parse(json);
      } catch(e) {

      }
    })
    await AsyncStorage.getItem("ownProgram").then(program => {
      ownProgram = JSON.parse(program);
    })
   
      this.props.navigator.push('programDashboard', {
        program: ownProgram,
        exercises: exercises,
      });
    }
  goToAllPrograms = () => {
    this.props.navigator.push('programs');
  }
  
}

export default HeroCard;