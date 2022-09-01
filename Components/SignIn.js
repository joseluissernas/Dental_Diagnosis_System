import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  style,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import DatePicker from './DatePicker';

export default class SignIn extends Component {
  //variables
  state = {
    name: '',
    lastname: '',
    birthday: '',
    ocupation: '',
    phone: '',
    email: '',
    password: '',
    idcard: '',
  };
  render() {
    //Appbar
    const MyAppbar = () => (
      <Appbar style={stylesSAV.bottom}>
        <Appbar.Action
          icon="archive"
          onPress={() => console.log('Pressed archive')}
        />
      </Appbar>
    );

    //Function for the button to register user
    const registerButton = () => {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          if (xhttp.responseText == 0) {
            Alert.alert('Algo salió mal, intentalo nuevamente');
          } else if (xhttp.responseText == 2) {
            Alert.alert('El usuario que intenta registrar ya existe');
          } else if (xhttp.responseText == 1) {
            Alert.alert('Registered user succesfully, please log in');
            _this.props.navigation.navigate('Home');
            console.log('Home');
          }
        }
      };
      xhttp.open(
        'GET',
        'https://dentaldiagsystem.000webhostapp.com/phpScripts/register_user.php?nombre=' +
          _this.state.name +
          '&apellido=' +
          _this.state.lastname +
          '&fecha_nacimiento=' +
          _this.state.birthday +
          '&ocupacion=' +
          _this.state.ocupation +
          '&telefono=' +
          _this.state.phone +
          '&email=' +
          _this.state.email +
          '&contrasena=' +
          _this.state.password +
          '&cedula=' +
          _this.state.idcard,
        true,
      );
      xhttp.send();
    };

    //Function to Button Home
    const go_Back_Home = () => {
      let _this = this;
      _this.props.navigation.navigate('Home');
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
                placeholder="Name"
                placeholderTextColor="gray"
                onChangeText={name => this.setState({name})}
                value={this.state.name}
              />
            </View>
            <Separator />
            <View style={stylesSAV.containerTxtInput}>
              <TextInput
                placeholder="Lastname"
                placeholderTextColor="gray"
                onChangeText={lastname => this.setState({lastname})}
                value={this.state.lastname}
              />
            </View>
            <Separator />
            <View style={stylesSAV.containerTxtInput}>
              <TextInput
                placeholder="Date of Birth"
                placeholderTextColor="gray"
                onChangeText={birthday => this.setState({birthday})}
                value={this.state.birthday}
              />
            </View>
            <Separator />
            <View style={stylesSAV.containerTxtInput}>
              <TextInput
                placeholder="Ocupation"
                placeholderTextColor="gray"
                onChangeText={ocupation => this.setState({ocupation})}
                value={this.state.ocupation}
              />
            </View>
            <Separator />
            <View style={stylesSAV.containerTxtInput}>
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="gray"
                onChangeText={phone => this.setState({phone})}
                value={this.state.phone}
              />
            </View>
            <Separator />
            <View style={stylesSAV.containerTxtInput}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="gray"
                onChangeText={email => this.setState({email})}
                value={this.state.email}
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
            <View style={stylesSAV.containerTxtInput}>
              <TextInput
                placeholder="ID number"
                placeholderTextColor="gray"
                onChangeText={idcard => this.setState({idcard})}
                value={this.state.idcard}
              />
            </View>
            <Separator />
            <View style={stylesSAV.containerBtn}>
              <Button
                onPress={registerButton}
                title="Register"
                color="#40e0d0"
              />
            </View>
            <Separator />
            <View style={stylesSAV.containerBtn}>
              <Button onPress={go_Back_Home} title="Home" color="#40e0d0" />
            </View>
            <Separator />
            <View style={stylesSAV.containerTxt}>
              <Text style={stylesSAV.title}>Only authorized personnel</Text>
            </View>
            <Separator />
            <View style={stylesSAV.containerBottom}>
              <MyAppbar />
            </View>
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
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0000ff',
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
  containerTxt: {
    height: 50,
    marginLeft: '6%',
    marginRight: '6%',
    paddingTop: '2%',
  },
  containerBottom: {
    height: 50,
    marginLeft: '6%',
    marginRight: '6%',
    paddingTop: '2%',
  },
});
