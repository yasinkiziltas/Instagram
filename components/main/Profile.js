import React, { useState, useEffect } from 'react'
import { View, Button, Text, StyleSheet, FlatList, Image } from 'react-native'
import * as firebase from 'firebase'
require("firebase/firestore")

import { connect } from 'react-redux'

function Profile(props) {
    const [user, setUser] = useState(null)
    const [userPost, setUserPosts] = useState([])
    const { container, containerInfo, containerInfoText, containerGallery, image } = styles;

    useEffect(() => {
        const { currentUser, posts } = props;
        console.log(currentUser, posts)

        if (props.route.params.uid == firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
        }

        else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data())
                    }
                    else {
                        console.log('does not exist')
                    }
                })

            firebase.firestore()
                .collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return {
                            id,
                            ...data
                        }
                    })
                    setUserPosts(posts)
                })
        }
    }, [props.route.params.uid])



    function signOut() {
        try {
            firebase.auth().signOut();
            console.log('Logout success')
        } catch (error) {
            console.log(error)
        }
    }

    if (user === null) {
        return <View />
    }
    return (
        <View style={container}>
            <View style={containerInfo}>
                <Text>Welcome <Text style={containerInfoText}>{user.name}</Text></Text>
                <Text>Welcome <Text style={containerInfoText}>{user.email}</Text></Text>
            </View>

            <View style={containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPost}
                    renderItem={({ item }) => (
                        <View style={styles.containerImage}>
                            <Image
                                style={image}
                                source={{ uri: item.downloadURL }}
                            />
                        </View>

                    )}
                />
            </View>

            {/* <Button title="Logout" onPress={() => signOut()} /> */}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 20,
    },
    containerInfoText: {
        fontWeight: 'bold'
    },
    containerGallery: {
        flex: 1,
    },
    containerImage: {
        flex: 1 / 3
    },
    image: {
        width: 150,
        height: 150,
        flex: 1,
        aspectRatio: 1 / 1
    }
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts
})

export default connect(mapStateToProps, null)(Profile);