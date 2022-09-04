import {View, Button, Image, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';

const ImagePicker = ({navigation: {navigate}}) => {
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
  const uploadImage = async () => {
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
      formData.append('photo', {uri: localUri, name: filename, type});
      //only to make sure that the data is correct
      console.log(localUri);
      console.log(filename);
      console.log(type);
      //fetch to post the image to the server
      // return await fetch('server', {
      //   method: 'POST',
      //   body: formData,
      //   header: {
      //     'content-type': 'multipart/form-data',
      //   },
      // })
      //   .then(res => res.json())
      //   .catch(error => console.error('Error', error))
      //   .then(response => {
      //     if (response.status == 1) {
      //       Alert.alert('Succesful image uploaded');
      //     } else {
      //       Alert.alert('Something went wrong uploading the image');
      //     }
      //   });
    }
  };

  //Function for a separator for buttons
  const Separator = () => <View style={stylesSAV.separator} />;

  //Function temporary to go back
  const go_Back = () => {
    navigate('Register_Patient');
  };

  return (
    <View style={stylesSAV.container}>
      <SafeAreaView style={stylesSAV.containerImg}>
        <Image style={stylesSAV.imge} source={{uri: image}} />
      </SafeAreaView>
      <View style={stylesSAV.vw}>
        <Separator />
        <View style={stylesSAV.containerBtn}>
          <Button title="Select Image" onPress={selectImage} color="#40e0d0" />
        </View>
        <Separator />
        <View style={stylesSAV.containerBtn}>
          <Button title="Take Picture" onPress={takePicture} color="#40e0d0" />
        </View>
        <Separator />
        <View style={stylesSAV.containerBtn}>
          <Button title="Upload Image" onPress={uploadImage} color="#40e0d0" />
        </View>
        <Separator />
        <View style={stylesSAV.containerBtn}>
          <Button title="Go Back" onPress={go_Back} color="#40e0d0" />
        </View>
        <Separator />
      </View>
    </View>
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
