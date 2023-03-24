/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Home from './Components/Home';
import Login from './Components/Login';
import SignIn from './Components/SignIn';
import Register_Patient from './Components/Register_Patient';
import ImagePicker from './Components/ImagePicker';
import Search_Patient from './Components/Search_Patient';
import PatientInfo from './Components/PatientInfo';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Appbar, Menu} from 'react-native-paper';

const CustomNavigationBar = (navigation, back) => {
  return (
    <Appbar.Header style={{backgroundColor: '#40e0d0'}}>
      <Appbar.Content title="Dental Diagnosis" />
    </Appbar.Header>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: props => <CustomNavigationBar {...props} />,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Log In" component={Login} />
        <Stack.Screen name="Sign In" component={SignIn} />
        <Stack.Screen name="Register_Patient" component={Register_Patient} />
        <Stack.Screen name="ImagePicker" component={ImagePicker} />
        <Stack.Screen name="Search_Patient" component={Search_Patient} />
        <Stack.Screen name="PatientInfo" component={PatientInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
