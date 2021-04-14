import React, { Component } from 'react'
import { Button, View, TextInput } from 'react-native'
import firebase from 'firebase'

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name } = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email
                    })
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <TextInput
                    placeholder="Name"
                    onChangeText={(name) => this.setState({ name: name })}
                />

                <TextInput
                    placeholder="E-Mail"
                    onChangeText={(email) => this.setState({ email: email })}
                />

                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password: password })}
                />

                <Button title="Register" onPress={() => this.onSignUp()} />

            </View>
        )
    }
}
