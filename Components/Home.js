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
  RefreshControl,
} from 'react-native';
//import {TextInput} from 'react-native-paper';

export default class Home extends Component {
  //variables
  state = {
    username: '',
    password: '',
    enable: true,
  };
  render() {
    //Function to reset values to initial state
    const resetValues = () => {
      this.setState({username: ''});
      this.setState({password: ''});
      this.setState({enable: true});
      console.log('Clear all');
    };

    //Function for the button to go to the Log In screen
    const logButton = () => {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          if (xhttp.responseText == 0) {
            Alert.alert('Datos erroneos, intentalo nuevamente');
          } else {
            var data = xhttp.responseText;
            var separateData = data.split(',');
            var name = separateData[0];
            var lastname = separateData[1];
            var email = separateData[2];
            var checkuser = name + ' ' + lastname;
            console.log(checkuser);
            if (email == _this.state.username) {
              Alert.alert('Welcome' + ' ' + checkuser);
              _this.props.navigation.navigate('Log In');
              console.log('logButton');
            }
          }
        }
      };
      xhttp.open(
        'GET',
        'https://dentaldiagsystem.000webhostapp.com/phpScripts/login_user.php?email=' +
          _this.state.username +
          '&contrasena=' +
          _this.state.password,
        true,
      );
      xhttp.send();
    };

    //Function for the button to go to the Sign In screen
    const signButton = () => {
      let _this = this;
      _this.props.navigation.navigate('Sign In');
      console.log('signButton');
    };

    //Function to handle the state of the Sign In button
    const handleEnableState = () => {
      this.setState({enable: false});
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
            <View style={stylesSAV.containerTxtInput}>
              <TextInput
                placeholder="Username"
                placeholderTextColor="gray"
                onChangeText={username => this.setState({username})}
                value={this.state.username}
              />
            </View>
            <Separator />
            <View style={stylesSAV.containerTxtInput}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="gray"
                onChangeText={password => this.setState({password})}
                value={this.state.password}
                secureTextEntry={true}
              />
            </View>
            <Separator />
            <View style={stylesSAV.containerBtn}>
              <Button onPress={logButton} title="Log In" color="#40e0d0" />
            </View>
            <Separator />
            <View style={stylesSAV.containerRegister}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Don't have an account?
                <Text
                  onPress={handleEnableState}
                  style={{color: '#00008b', fontWeight: 'bold'}}>
                  {' '}
                  Register now!
                </Text>
              </Text>
            </View>
            <View style={stylesSAV.containerBtn}>
              <Button
                disabled={this.state.enable}
                onPress={signButton}
                title="Sign In"
                color="#40e0d0"
              />
            </View>
            <Separator />
            <Text style={stylesSAV.title}>
              AI system for timely dental diagnosis
            </Text>
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
  title: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#000000',
    fontWeight: 'bold',
  },
  containerTxtInput: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginLeft: '10%',
    marginRight: '10%',
  },
  containerBtn: {
    height: 50,
    marginLeft: '10%',
    marginRight: '10%',
    paddingTop: '2%',
  },
  containerRegister: {
    height: 50,
    marginLeft: '6%',
    marginRight: '6%',
    alignItems: 'center',
  },
});
