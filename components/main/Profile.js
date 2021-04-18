import React from 'react'
import { View, Button, Text } from 'react-native'
import * as firebase from 'firebase'
import {fetchUser} from '../../redux/actions/index'

export default function Profile() {

    const signOut = () => {
        try {
           firebase.auth().signOut();
            console.log('Logout success')
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        fetchUser()
    }, [])

    const {currentUser} = fetchUser.name

    return (
        <View style={{flex:1, justifyContent:'center', alignItems: 'center',}}>
            <Text>Welcome! {currentUser}</Text>
            <Button title="Sign Out" onPress={() => signOut()} />
     </View>
    )
}
