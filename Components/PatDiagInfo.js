import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class PatDiagInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
  const Separator = () => <View style={stylesSAV.separator} />;

  return (
    <>
      <Separator />

      <Text style={stylesSAV.textTitle}>DIAGNOSIS DATA {'\n'}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={stylesSAV.txtAttrib}>Diagnostico ID: </Text>
        <Text style={stylesSAV.txtValue}>
          {this.props.diagInfo.idDiagnostico}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={stylesSAV.txtAttrib}>Paciente ID: </Text>
        <Text style={stylesSAV.txtValue}>
          {this.props.diagInfo.id_paciente}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={stylesSAV.txtAttrib}>Medico ID: </Text>
        <Text style={stylesSAV.txtValue}>{this.props.diagInfo.id_medico}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={stylesSAV.txtAttrib}>Fecha de diagnostico: </Text>
        <Text style={stylesSAV.txtValue}>
          {this.props.diagInfo.fecha_diagnostico}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={stylesSAV.txtAttrib}>Estado: </Text>
        <Text style={stylesSAV.txtValue}>{this.props.diagInfo.estado}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={stylesSAV.txtAttrib}>Descripción: </Text>
        <Text style={stylesSAV.txtValue}>
          {this.props.diagInfo.descripcion}
        </Text>
      </View>

      <Separator />

      <Text style={stylesSAV.textTitle}>DIAGNOSTIC AUTHOR DATA {'\n'}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={stylesSAV.txtAttrib}>Medico ID: </Text>
        <Text style={stylesSAV.txtValue}>{this.props.medicInfo.idUsuario}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={stylesSAV.txtAttrib}>Nombre: </Text>
        <Text style={stylesSAV.txtValue}>{this.props.medicInfo.nombre}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={stylesSAV.txtAttrib}>Apellido: </Text>
        <Text style={stylesSAV.txtValue}>{this.props.medicInfo.apellido}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={stylesSAV.txtAttrib}>Fecha de nacimiento: </Text>
        <Text style={stylesSAV.txtValue}>
          {this.props.medicInfo.fecha_nacimiento}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={stylesSAV.txtAttrib}>Ocupación: </Text>
        <Text style={stylesSAV.txtValue}>{this.props.medicInfo.ocupacion}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={stylesSAV.txtAttrib}>Telefono: </Text>
        <Text style={stylesSAV.txtValue}>{this.props.medicInfo.telefono}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={stylesSAV.txtAttrib}>Email: </Text>
        <Text style={stylesSAV.txtValue}>{this.props.medicInfo.email}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={stylesSAV.txtAttrib}>Cedula: </Text>
        <Text style={stylesSAV.txtValue}>{this.props.medicInfo.cedula}</Text>
      </View>
    </>
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
