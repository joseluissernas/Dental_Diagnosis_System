import React, {Component} from 'react';
import {
  Button,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  style,
  Alert,
  Image,
  ScrollView,
} from 'react-native';

export default class Login extends Component {
  render() {
    //Function for the button to go to the Home screen
    const homeButton = () => {
      let _this = this;
      _this.props.navigation.navigate('Home');
      console.log('homeButton');
    };

    const new_Patient_Button = () => {
      let _this = this;
      _this.props.navigation.navigate('Register_Patient');
    };

    //Function for a separator for buttons
    const Separator = () => <View style={stylesSAV.separator} />;

    return (
      <ScrollView>
        <View style={stylesSAV.container}>
          <SafeAreaView style={stylesSAV.containerImg}>
            <Image
              style={stylesSAV.imge}
              source={require('./src/imgs/logod.png')}
            />
          </SafeAreaView>
          <View style={stylesSAV.vw}>
            <Separator />
            <View style={stylesSAV.containerBtn}>
              <Button
                onPress={new_Patient_Button}
                title="New Patient"
                color="#40e0d0"
              />
            </View>
            <Separator />
            <View style={stylesSAV.containerBtn}>
              <Button onPress={homeButton} title="Home" color="#40e0d0" />
            </View>
            <Separator />
            <Text style={stylesSAV.title}>Only authorized personnel</Text>
            <Separator />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const stylesSAV = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#f5f5f5',
  },
  containerImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vw: {
    backgroundColor: '#e6e6fa',
    marginTop: 10,
  },
  imge: {
    width: 140,
    height: 140,
    marginTop: 10,
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  containerBtn: {
    height: 50,
    marginLeft: '6%',
    marginRight: '6%',
    paddingTop: '2%',
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#000000',
  },
});
