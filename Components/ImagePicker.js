import {
  View,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';

const ImagePicker = ({route, navigation: {navigate, goBack}}) => {
  const [patientId, setPatientId] = useState(route.params.idPaciente);
  const [patientName, setPatientName] = useState(route.params.nombre);
  const [patientLastName, setPatientLastName] = useState(route.params.apellido);
  const [patientBirth, setPatientBirth] = useState(
    route.params.fecha_nacimiento,
  );
  const [patientPhone, setPatientPhone] = useState(route.params.telefono);
  const [patientEmail, setPatientEmail] = useState(route.params.email);
  const [estadoDiag, setEstadoDiag] = useState('');
  const [coment, setComent] = useState('');
  const [diagnostic, setDiagnostic] = useState('');
  const [enable, setEnable] = useState(true);

  //Function to reset values to initial state
  const resetValues = () => {
    setPatientId(' ');
    setPatientName(' ');
    setPatientLastName(' ');
    setPatientBirth(' ');
    setPatientPhone(' ');
    setPatientEmail(' ');
    setEstadoDiag(' ');
    setComent(' ');
    setEnable(true);
    navigate('Log In');
    console.log('ImagePicker: resetValues');
  };

  //Function to handle the state of the Save Results button
  const handleEnableState = () => {
    setEnable(false);
  };

  console.log(
    'ImagePicker: ' + patientId,
    patientName,
    patientLastName,
    patientBirth,
    patientPhone,
    patientEmail,
    global.medicId,
  );

  //To show a default image
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
      let res = await fetch('http://saulcz.pythonanywhere.com/predict', {
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
        handleEnableState();
      } else if (responseJson.message == '1') {
        Alert.alert('Posible gingivitis y sarro' + responseJson.message);
        setEstadoDiag('Posible gingivitis y sarro');
        handleEnableState();
      } else if (responseJson.message == '2') {
        Alert.alert('Posible dentadura sana' + responseJson.message);
        setEstadoDiag('Posible dentadura sana');
        handleEnableState();
      } else if (responseJson.message == '3') {
        Alert.alert('Posible dentadura con sarro' + responseJson.message);
        setEstadoDiag('Posible dentadura con sarro');
        handleEnableState();
      } else {
        Alert.alert('Something went wrong ' + responseJson.message);
      }
    }
  };

  const saveResults = () => {
    const today = new Date();
    var date = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    console.log(date, patientId, global.medicId, estadoDiag, coment);
    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      console.log('ImagePicker_SaveResults:' + xhttp.responseText);
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        if (xhttp.responseText == '1') {
          Alert.alert('Diagnosis succesfully saved');
          resetValues();
        } else if (xhttp.responseText != '1') {
          Alert.alert('Something went wrong, try again');
        }
      }
    };
    xhttp.open(
      'GET',
      'https://dentaldiagsystem.000webhostapp.com/phpScripts/register_diagnosis.php?fecha_diagnostico=' +
        date +
        '&id_paciente=' +
        patientId +
        '&id_medico=' +
        global.medicId +
        '&estado=' +
        estadoDiag +
        '&descripcion=' +
        coment,
      true,
    );
    xhttp.send();
  };

  //Function for a separator for buttons
  const Separator = () => <View style={stylesSAV.separator} />;

  return (
    <ScrollView>
      <View style={stylesSAV.container}>
        <SafeAreaView style={stylesSAV.containerImg}>
          <Image style={stylesSAV.imge} source={{uri: image}} />
        </SafeAreaView>
        <View style={{flexDirection: 'row'}}>
          <Text style={stylesSAV.txtAttrib}>ID: </Text>
          <Text style={stylesSAV.txtValue}>{patientId}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={stylesSAV.txtAttrib}>Nombre: </Text>
          <Text style={stylesSAV.txtValue}>{patientName}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={stylesSAV.txtAttrib}>Apellidos: </Text>
          <Text style={stylesSAV.txtValue}>{patientLastName}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={stylesSAV.txtAttrib}>Fecha nacimiento: </Text>
          <Text style={stylesSAV.txtValue}>{patientBirth}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={stylesSAV.txtAttrib}>Telefono: </Text>
          <Text style={stylesSAV.txtValue}>{patientPhone}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={stylesSAV.txtAttrib}>Email: </Text>
          <Text style={stylesSAV.txtValue}>{patientEmail}</Text>
        </View>
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
          <View style={stylesSAV.containerTxtInput}>
            <TextInput
              placeholder="Description of Diagnosis"
              editable
              multiline
              numberOfLines={4}
              maxLength={300}
              onChangeText={text => setComent(text)}
              value={coment}
            />
          </View>
          <Separator />
          <View style={stylesSAV.containerBtn}>
            <Button
              disabled={enable}
              title="Save Results"
              onPress={saveResults}
              color="#40e0d0"
            />
          </View>
          <Separator />
          <View style={stylesSAV.containerBtn}>
            <Button
              title="Main menu"
              onPress={() => navigate('Log In')}
              color="#40e0d0"
            />
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
  txtAttrib: {
    fontSize: 16,
    color: 'black',
  },
  containerTxtInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginLeft: '10%',
    marginRight: '10%',
  },
});
