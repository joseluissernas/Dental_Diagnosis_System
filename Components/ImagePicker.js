import {View, Button, Image, StyleSheet, Alert, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';

const ImagePicker = ({route, navigation: {navigate, goBack}}) => {
  const [patientId, setPatientId] = useState(route.params.idPaciente);
  const [estadoDiag, setEstadoDiag] = useState('');
  const [coment, setComent] = useState('');
  const [diagnostic, setDiagnostic] = useState('');

  console.log(patientId, global.medicId);

  const [image, setImage] = useState('https://via.placeholder.com/224');
  //method to select an image of the gallery

  const selectImage = () => {
    const options = {
      title: 'Select an image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.errorCode) {
        console.log(response.errorMessage);
      } else if (response.didCancel) {
        console.log('User did cancel the selection');
      } else {
        const path = response.assets[0].uri;
        setImage(path);
      }
    });
  };

  //method to access to the camera and take a picture
  const takePicture = () => {
    const options = {
      title: 'Take a picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
    };
    launchCamera(options, response => {
      if (response.errorCode) {
        console.log(response.errorMessage);
      } else if (response.didCancel) {
        console.log('User did cancel the picture');
      } else {
        const uri = response.assets[0].uri;
        setImage(uri);
        console.log(uri);
      }
    });
  };

  //method to upload the image to the server
  const generateDiagnosis = async () => {
    //take on local variable the uri of the image
    let localUri = image;
    if (localUri == null) {
      Alert.alert('You should take a picture or select an image');
    } else {
      //divide th parts of the uri to the form data
      let filename = localUri.split('/').pop();
      let compare = /\.(\w+)$/.exec(filename);
      let type = compare ? `image/${compare[1]}` : `image`;
      //create the form data
      const formData = new FormData();
      formData.append('file', {
        uri: localUri,
        type: type,
        name: filename,
      });
      console.log(formData);
      //only to make sure that the data is correct
      console.log(localUri);
      console.log(filename);
      console.log(type);
      //fetch to post the image to the server
      let res = await fetch('http://192.168.1.72:4000/predict', {
        method: 'POST',
        header: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      let responseJson = await res.json();
      console.log(responseJson);
      if (responseJson.message == '0') {
        Alert.alert('Posible gingivitis' + responseJson.message);
        setEstadoDiag('Posible gingivitis');
      } else if (responseJson.message == '1') {
        Alert.alert('Posible gingivitis y sarro' + responseJson.message);
        setEstadoDiag('Posible gingivitis y sarro');
      } else if (responseJson.message == '2') {
        Alert.alert('Posible dentadura sana' + responseJson.message);
        setEstadoDiag('Posible dentadura sana');
      } else if (responseJson.message == '3') {
        Alert.alert('Posible dentadura con sarro' + responseJson.message);
        setEstadoDiag('Posible dentadura con sarro');
      } else {
        Alert.alert('Something went wrong ' + responseJson.message);
      }
    }
  };

  const saveResults = () => {
    getPatientDiag();
    const today = new Date();
    var date = (`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);
    console.log('date:' + date);
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      console.log('ImagePicker_SaveResults:' + xhttp.responseText);
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        if (xhttp.responseText == '1') {
          Alert.alert('Diagnosis succesfully saved');
        } else if (xhttp.responseText != '1') {
          Alert.alert('Something went wrong, try again');
        }
      }
    };
    xhttp.open(
      'GET',
      'https://dentaldiagsystem.000webhostapp.com/phpScripts/register_diagnosis.php?fecha_diagnostico=' + date +
        '&id_paciente=' + patientId +
        '&id_medico=' + global.medicId +
        '&estado=' + estadoDiag +
        '&descripcion=' + coment,
      true,
    );
    xhttp.send();
  }

  const getPatientDiag = () => {
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      console.log('ImagePicker_getPatientDiag: ' + xhttp.responseText);
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        if (xhttp.responseText != '0') {
          setDiagnostic(JSON.parse(xhttp.responseText)[0]);
          setComent(diagnostic.estado);
        }
      }
    };
    xhttp.open(
      'GET',
      'https://dentaldiagsystem.000webhostapp.com/phpScripts/patient_diag.php?id=' +
        patientId,
      true,
    );
    xhttp.send();
  }

  //Function for a separator for buttons
  const Separator = () => <View style={stylesSAV.separator} />;

  //Function temporary to go back
  const go_Back = () => {
    navigate('Register_Patient');
  };

  return (
    <ScrollView>
      <View style={stylesSAV.container}>
        <SafeAreaView style={stylesSAV.containerImg}>
          <Image style={stylesSAV.imge} source={{uri: image}} />
        </SafeAreaView>
        <View style={stylesSAV.vw}>
          <Separator />
          <View style={stylesSAV.containerBtn}>
            <Button
              title="Select Image"
              onPress={selectImage}
              color="#40e0d0"
            />
          </View>
          <Separator />
          <View style={stylesSAV.containerBtn}>
            <Button
              title="Take Picture"
              onPress={takePicture}
              color="#40e0d0"
            />
          </View>
          <Separator />
          <View style={stylesSAV.containerBtn}>
            <Button
              title="Generate Diagnosis"
              onPress={generateDiagnosis}
              color="#40e0d0"
            />
          </View>
          <Separator />
          <View style={stylesSAV.containerBtn}>
            <Button
              title="Save Results"
              onPress={saveResults}
              color="#40e0d0"
            />
          </View>
          <Separator />
          <View style={stylesSAV.containerBtn}>
            <Button title="Go Back" onPress={() => goBack()} color="#40e0d0" />
          </View>
          <Separator />
        </View>
      </View>
    </ScrollView>
  );
};

export default ImagePicker;

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
    width: 200,
    height: 200,
    marginTop: 10,
  },
  separator: {
    marginVertical: 10,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  containerBtn: {
    height: 50,
    marginLeft: '10%',
    marginRight: '10%',
    paddingTop: '2%',
  },
});
