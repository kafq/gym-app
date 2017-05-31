import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Layout from '../constants/Layout'
import {Grid, Col, Row} from 'react-native-elements';

class LogItem extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Grid>
            <Col>
                <Row size={1}><Text style={styles.title}>{this.props.titleText} Weight</Text></Row>
                <Row size={3}><Text style={styles.number}>{this.props.title} kg</Text></Row>
            </Col>
            <Col>
                <Row size={1}><Text style={styles.title}>{this.props.titleText} Reps</Text></Row>
                <Row size={3}><Text style={styles.number}>{this.props.weight}</Text></Row>
            </Col>
            <Col>
                <Row size={1}><Text style={styles.title}>{this.props.titleText} Sets</Text></Row>
                <Row size={3}><Text style={styles.number}>{this.props.title}</Text></Row>
            </Col>
        </Grid>

      {/*<Text style={styles.title}>{this.props.title}</Text>
      <Text style={styles.title}>{this.props.weight}</Text>
      <Text style={styles.title}>{this.props.metric}</Text>
      <Text style={styles.title}>{this.props.date}</Text>*/}
      
    </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#CE0707',
    borderWidth: 0,
    borderRadius: 5,
    paddingHorizontal: 14,
    width: Layout.window.width * 0.9,
    paddingTop: 15,
    paddingBottom: 20,
    marginHorizontal: 15,
    shadowColor: "#CE0707",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      height: 3,
      width: 0
    },
    marginBottom: 20,
  },

  title: {
    fontSize: 12,
    color: '#FFFFFF',
    margin: 2,
  },

  number: {
    fontSize: 25,
    color: '#FFFFFF',
    margin: 2,
  },
});

export default LogItem;


