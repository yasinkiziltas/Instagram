import React, { Component } from 'react'
import { Button, View, TextInput, Image } from 'react-native'
import firebase from 'firebase'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name: '',
             email: '',
             password: '',            
        }

        this.onSignIn = this.onSignIn.bind(this)
    }

    onSignIn() {
        const {email, password, name} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {
            alert('Success')
            console.log('Successfull!', result)
        })
        .catch((error) => {
            console.log('Error: ', error)
        })
    }

    render() {
        return (
            <View style={{justifyContent: 'center',alignItems: 'center'}}>

                <Image
                    source={require('../../assets/images/logo.png')}
                    resizeMode="contain"
                    style={{width:200,  height:200}}
                />

              <TextInput
                 placeholder="E-Mail"
                 onChangeText={(email) => this.setState({email: email})}
                />

            <TextInput
                 placeholder="Password"
                 secureTextEntry={true}
                 onChangeText={(password) => this.setState({password: password})}
                />

                <Button title="Login" onPress={() => this.onSignIn()} />

            </View>
        )
    }
}
