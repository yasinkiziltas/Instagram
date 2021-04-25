import React from 'react'
import { View, Button, Text, StyleSheet, FlatList,Image} from 'react-native'
import * as firebase from 'firebase'

import {connect} from 'react-redux'

function Profile(props) {
    const {currentUser, posts} = props;
    const {container, containerInfo, containerInfoText, containerGallery, image} = styles;

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
        <View style={container}>
           <View style={containerInfo}>
                 <Text>Welcome <Text style={containerInfoText}>{currentUser.name}</Text></Text>
                 <Text>Welcome <Text style={containerInfoText}>{currentUser.email}</Text></Text>
           </View>

           <View style={containerGallery}>
                <FlatList 
                    numColumns={3}
                    horizontal={false}
                    data={posts}
                    renderItem={({item}) => (
                        <View>
                            <Image 
                            style={image}
                            source={{uri: item.downloadURL}}
                        />
                        </View>
                        
                    )}
                />
           </View>

           <Button title="Logout" onPress={() => signOut()}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 40
    },
    containerInfo:{
        margin: 20,  
    },
    containerInfoText:{
        fontWeight:'bold'
    },
    containerGallery:{

    },
    image:{
        flex: 1,
        aspectRatio: 1/1
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
})

export default connect(mapStateToProps, null)(Profile);