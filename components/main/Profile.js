import React from 'react'
import { View, Button, Text, StyleSheet} from 'react-native'
import * as firebase from 'firebase'

import {connect} from 'react-redux'

function Profile(props) {
    const {currentUser, posts} = props;
    console.log(currentUser, posts)

    function signOut() {
        try {
            firebase.auth().signOut();
            console.log('Logout success')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>Welcome {currentUser.name}</Text>
            <Button title="Sign Out" onPress={() => signOut()} />
        </View>
    )
}

const stlyes = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 40
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
})

export default connect(mapStateToProps, null)(Profile);