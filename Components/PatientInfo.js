import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import PatDiagInfo from './PatDiagInfo';

export default class PatientInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Object
      patientInfo: this.props.route.params.item,
      diagnostic: 0,
      medicInfo: 0,
    };
  }

  componentDidMount() {
    this.getPatientDiag();
    this.getMedicInfo();
  }

  getPatientDiag() {
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      // console.log(xhttp.responseText);
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        if (xhttp.responseText == 'QueryError') {
          Alert.alert('Something went wrong, try again');
        } else if (xhttp.responseText != '0') {
          _this.setState({diagnostic: JSON.parse(xhttp.responseText)[0]});
        }
      }
    };
    xhttp.open(
      'GET',
      'https://dentaldiagsystem.000webhostapp.com/phpScripts/patient_diag.php?id=' +
        this.state.patientInfo.idPaciente,
      true,
    );
    xhttp.send();
  }

  getMedicInfo() {
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      // console.log(xhttp.responseText);
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        if (xhttp.responseText == 'QueryError') {
          Alert.alert('Something went wrong, try again');
        } else if (xhttp.responseText != 0) {
          _this.setState({medicInfo: JSON.parse(xhttp.responseText)[0]});
        }
      }
    };
    xhttp.open(
      'GET',
      'https://dentaldiagsystem.000webhostapp.com/phpScripts/diag_author.php?id=' +
        global.medicId,
      true,
    );
    xhttp.send();
  }

  render() {
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
                onPress={() => this.props.navigation.goBack()}
                title="Go Back"
                color="#40e0d0"
              />
            </View>
            <Separator />
            <View style={stylesSAV.containerBtn}>
              <Button
                onPress={() => this.props.navigation.navigate('Log In')}
                title="Main Menu"
                color="#40e0d0"
              />
            </View>
            <Separator />
            <Text style={stylesSAV.title}>Only authorized personnel</Text>

            <Separator />

            <Text style={stylesSAV.textTitle}> PATIENT DATA {'\n'}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>ID: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.patientInfo['idPaciente']}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Nombre: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.patientInfo['nombre']}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Apellidos: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.patientInfo['apellido']}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Fecha nacimiento: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.patientInfo['fecha_nacimiento']}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Telefono: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.patientInfo['telefono']}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Email: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.patientInfo['email']}
              </Text>
            </View>

            <Separator />

            <View>
              <Text style={stylesSAV.textTitle}>
                PATIENT DIAGNOSIS {'\n'} RECORD
              </Text>
              <View style={stylesSAV.containerBtn}>
                <Button
                  onPress={() => {
                    /*this.props.navigation.navigate('Log In')*/
                    // console.log('Modificar diagnostico');
                    this.props.navigation.navigate('ImagePicker', {
                      idPaciente: this.state.patientInfo.idPaciente,
                      nombre: this.state.patientInfo.nombre,
                      apellido: this.state.patientInfo.apellido,
                      fecha_nacimiento: this.state.patientInfo.fecha_nacimiento,
                      telefono: this.state.patientInfo.telefono,
                      email: this.state.patientInfo.email,
                    });
                  }}
                  title={
                    this.state.diagnostic == 0
                      ? 'Make Diagnosis'
                      : 'Modify Diagnosis'
                  }
                  color="#40e0d0"
                />
              </View>
              {this.state.diagnostic == 0 ? (
                <Text style={stylesSAV.textTitle}>
                  {'\n\n[¡]'} No Diag Record Found
                </Text>
              ) : (
                <PatDiagInfo
                  diagInfo={this.state.diagnostic}
                  medicInfo={this.state.medicInfo}
                />
              )}
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
    alignItems: 'stretch',
    backgroundColor: '#f5f5f5',
  },
  containerImg: {
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
  textTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'serif',
    textAlign: 'center',
    color: 'black',
  },
  txtAttrib: {
    fontSize: 16,
    color: 'black',
  },
  txtValue: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});
