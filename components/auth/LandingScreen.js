import React from 'react'
import { View, Button } from 'react-native'

export default function LandingScreen({navigation}) {
    return (
        <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
              <Button title="Login" onPress={() => navigation.navigate('Login')}/>
              <Button title="Register" onPress={() => navigation.navigate('Register')}/>       
        </View>
    )
}
