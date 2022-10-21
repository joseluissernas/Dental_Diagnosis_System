import {FlatList, ScrollView, Text, View, SafeAreaView} from 'react-native';
import React, {Component} from 'react';
import ImagePicker from './ImagePicker';

export class Register_Diagnosis extends Component {
  render() {
    return (
      <View>
        <ImagePicker />
        <SafeAreaView>
          <FlatList data="hola" />
        </SafeAreaView>
      </View>
    );
  }
}

export default Register_Diagnosis;

const stylesSAV = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#f5f5f5',
  },
});
