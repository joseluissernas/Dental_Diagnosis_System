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

export default class PatDiagInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Object
      diagInfo: this.props.route.params.item,
      medicInfo: {},
    };
  }

  componentDidMount() {
    this.getMedicInfo();
  }

  getMedicInfo() {
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      console.log(xhttp.responseText);
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
        this.state.diagInfo.id_medico,
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
                onPress={() => this.props.navigation.navigate('Search_Patient')}
                title="Go to Search Patient"
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

            <Text style={stylesSAV.textTitle}>DIAGNOSIS DATA {'\n'}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Diagnostico ID: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.diagInfo.idDiagnostico}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Paciente ID: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.diagInfo.id_paciente}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Medico ID: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.diagInfo.id_medico}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Fecha de diagnostico: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.diagInfo.fecha_diagnostico}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Estado: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.diagInfo.estado}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Descripción: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.diagInfo.descripcion}
              </Text>
            </View>

            <Separator />

            <Text style={stylesSAV.textTitle}>
              DIAGNOSTIC AUTHOR DATA {'\n'}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Medico ID: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.medicInfo.idUsuario}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Nombre: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.medicInfo.nombre}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Apellido: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.medicInfo.apellido}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Fecha de nacimiento: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.medicInfo.fecha_nacimiento}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Ocupación: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.medicInfo.ocupacion}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Telefono: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.medicInfo.telefono}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Email: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.medicInfo.email}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={stylesSAV.txtAttrib}>Cedula: </Text>
              <Text style={stylesSAV.txtValue}>
                {this.state.medicInfo.cedula}
              </Text>
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
