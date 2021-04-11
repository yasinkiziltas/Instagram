import React, { Component } from 'react'
import { Button, View, TextInput, Image, Dimensions, StyleSheet, TouchableOpacity, Text} from 'react-native'
import firebase from 'firebase'

const width =  Dimensions.get('window').width
const height = Dimensions.get('window').height


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
            <View style={{flex:1, justifyContent: 'center',alignItems: 'center'}}>

                <Image                 
                    source={require('../../assets/images/logo.png')}
                    resizeMode="contain"
                    style={{width:200, height:200}}
                />

<View style={styles.inputContainer}>
                <TextInput
                 style={styles.input}
                 placeholder="E-Mail"
                 onChangeText={(email) => this.setState({email: email})}
                />           
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                 style={styles.input}
                 placeholder="Password"
                 secureTextEntry={true}
                 onChangeText={(password) => this.setState({password: password})}
                />
            </View>

            <TouchableOpacity style={styles.btnLogin} onPress={() => this.onSignIn()}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>            
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: '90%',
        height: height / 15,
        borderColor: '#ccc',
        borderWidth:1, 
        borderRadius: 3,
        borderBottomWidth: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        width: 50,
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: width / 1.5,
        height: height / 15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
    },
    btnLogin:{
        width: '90%',
        height: height / 15,
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    btnText:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
    }
});
