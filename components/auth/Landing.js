import React from 'react'
import { View, Text, Button } from 'react-native'

export default function Landing({navigation}) {
    return (
        <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
            <Button title="Register" onClick={() => navigation.navigate('Register')}/>
            <Button title="Login" onClick={() => navigation.navigate('Login')}/>
        </View>
    )
}
