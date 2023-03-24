import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';

export default class Search_Patient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientList: [],
    };
  }

  componentDidMount() {
    this.getPatientList();
  }

  getPatientList() {
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      // console.log(xhttp.responseText);
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        if (xhttp.responseText == 0) {
          Alert.alert('Something went wrong, try again');
        } else {
          _this.setState({patientList: JSON.parse(xhttp.responseText)});
        }
      }
    };
    xhttp.open(
      'GET',
      'https://dentaldiagsystem.000webhostapp.com/phpScripts/show_patients.php',
      true,
    );
    xhttp.send();
  }

  render() {
    const Separator = () => <View style={stylesSAV.separator} />;

    return (
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
              title="Go back"
              color="#40e0d0"
            />
          </View>
          <Separator />

          <FlatList
            data={this.state.patientList}
            ItemSeparatorComponent={Separator}
            renderItem={({item}) => (
              <View style={stylesSAV.containerBtn}>
                <Button
                  title={item.apellido + ' ' + item.nombre}
                  color="#40e0d0"
                  onPress={() => {
                    this.props.navigation.navigate('PatientInfo', {item})
                  }}
                />
              </View>
            )}
          />

          <Separator />
          <Text style={stylesSAV.title}>Only authorized personnel</Text>
          <Separator />
        </View>
      </View>
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
    flex: 1,
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
