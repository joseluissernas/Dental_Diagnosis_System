import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default class Register_Patient extends Component {
  state = {
    // name: 'Juan',
    // lastname: 'Flores Perez',
    // birthday: '1988-12-06',
    // phone: '3324398321',
    // email: 'Jon12@gmail.com',
    name: '',
    lastname: '',
    birthday: '',
    phone: '',
    email: '',
    patData: '',
  };

  render() {
    //Function for the button to register patient

    const register_Patient_Button = () => {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          if (xhttp.responseText == 0) {
            Alert.alert('Something went wrong, try again');
            // _this.props.navigation.navigate('ImagePicker');
          } else if (xhttp.responseText == 2) {
            Alert.alert('The patient already exists');
          } else if (xhttp.responseText == 1) {
            Alert.alert('Succesfully registered patient');
            console.log('Paciente registrado exitosamente');
            retrieve_Patient_id();
            _this.props.navigation.navigate('ImagePicker', {
              idPaciente: _this.state.patData.idPaciente,
              // nombre: this.state.patData.nombre,
              // apellido: this.state.patData.apellido,
              // fecha_nacimiento: this.state.patData.fecha_nacimiento,
              // telefono: this.state.patData.telefono,
              // email: this.state.patData.email,
            });
          }
        }
      };
      xhttp.open(
        'GET',
        'https://dentaldiagsystem.000webhostapp.com/phpScripts/register_patient.php?nombre=' +
          _this.state.name +
          '&apellido=' +
          _this.state.lastname +
          '&fecha_nacimiento=' +
          _this.state.birthday +
          '&telefono=' +
          _this.state.phone +
          '&email=' +
          _this.state.email,
        true,
      );
      xhttp.send();
    };

    const retrieve_Patient_id = () => {
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        // console.log(xhttp.responseText);
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          if (xhttp.responseText == 0) {
            Alert.alert('Something went wrong, try again');
            // _this.props.navigation.navigate('ImagePicker');
          } else {
            // console.log('retrieve: '+xhttp.responseText);
            _this.setState({patData: JSON.parse(xhttp.responseText)});
            // console.log(_this.state.patData.idPaciente);
          }
        }
      };
      xhttp.open(
        'GET',
        'https://dentaldiagsystem.000webhostapp.com/phpScripts/search_patient.php?nombre=' +
          _this.state.name +
          '&apellido=' +
          _this.state.lastname +
          '&fecha_nacimiento=' +
          _this.state.birthday +
          '&telefono=' +
          _this.state.phone +
          '&email=' +
          _this.state.email,
        true,
      );
      xhttp.send();
    };

    // const register_Patient_Button = () => {
    //   retrieve_Patient_id();
    //   this.props.navigation.navigate('ImagePicker', {idPaciente: this.state.patData.idPaciente,
    //             idMedico: this.props.route.params.medicId});
    // }

    //Function to go back
    const go_Back = () => {
      let _this = this;
      _this.props.navigation.navigate('Log In');
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
                placeholder="Patient Name"
                placeholderTextColor="gray"
                onChangeText={name => this.setState({name})}
                value={this.state.name}
              />
            </View>
            <Separator />
            <View style={stylesSAV.containerTxtInput}>
              <TextInput
                placeholder="Last Name"
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
            <View style={stylesSAV.containerBtn}>
              <Button
                onPress={register_Patient_Button}
                title="Register Patient"
                color="#40e0d0"
              />
            </View>
            <Separator />
            <View style={stylesSAV.containerBtn}>
              <Button
                onPress={() => this.props.navigation.goBack()}
                title="Go Back"
                color="#40e0d0"
              />
            </View>
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
