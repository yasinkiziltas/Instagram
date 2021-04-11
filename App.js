import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as firebase from 'firebase'
import LandingScreen from './components/auth/LandingScreen'
import LoginScreen from './components/auth/LoginScreen'
import RegisterScreen from './components/auth/RegisterScreen'

const firebaseConfig = {
  apiKey: "AIzaSyA0tcowI6jIUNF9sdQH5JAYBToNReLjZ0w",
  authDomain: "instagramapp-faa6a.firebaseapp.com",
  projectId: "instagramapp-faa6a",
  storageBucket: "instagramapp-faa6a.appspot.com",
  messagingSenderId: "251805637885",
  appId: "1:251805637885:web:2affad0683a355e12e7294",
  measurementId: "G-E8066ZQV8T"
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

