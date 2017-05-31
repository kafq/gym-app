import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import Common from "../constants/common";

export default class StyleScreen extends React.Component {
  
  constructor(props) {
    super(props);
  }
  static route = {
    navigationBar: {
      title: 'Styles Screen',
    },
  };
  
  render() {
    return (
      <ScrollView>  
        <Text style={Common.darkTitleDisplay}>Typography</Text>
        <View style={Common.sectionContainer}>
            <Text style={Common.darkTitleH1}>H1 heading for section titles</Text>
            <Text style={Common.darkTitleH2}>H2 heading for exercise titles</Text>
            <Text style={Common.darkTitleH3}>H3 heading for questions</Text>
            <Text style={Common.darkBodyText}>This is body text for exercises descriptions, instructions, copy, helplines and comments.</Text>
        </View>
        <Text style={Common.darkTitleDisplay}>Containers</Text>
        <View style={Common.sectionContainer}>
            <Text style={Common.darkTitleH1}>Inline container</Text>
            <Text style={Common.darkBodyText}>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</Text>
            <Text style={Common.darkBodyText}>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.</Text>
        </View>
        <View style={[Common.sectionContainer, Common.centered]}>
            <Text style={Common.darkTitleH1}>Centered container</Text>

            <Text style={[Common.darkBodyText, Common.centeredText]}>Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.</Text>
        </View>
        
        <View>
        </View>
      </ScrollView>
    );
  }
}