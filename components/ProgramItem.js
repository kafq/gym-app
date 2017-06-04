import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import Common from '../constants/common';
export default function ProgramItem({ title, description, id, onPress }) {
  return (
    <TouchableOpacity style={[Common.promotionProgramContainer, Common.shadowLight, (id == 0 ? Common.marginFirst : '')]} onPress={onPress}>
      <Text style={Common.darkTitleH3}>{title}</Text>
      <View style={[Common.sectionBorder]}/>
      <Text style={Common.darkBodyText}>{description}</Text>
    </TouchableOpacity>
  );
}