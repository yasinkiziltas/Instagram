import React from 'react'
import { View, Image, TextInput, Button } from 'react-native'

import firebase from 'firebase'
import "firebase/firestore"
import "firebase/firebase-storage"


export default function Save(props) {
    const [caption, setCaption] = React.useState("")
    const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
    console.log(childPath)

    const uploadImage = async () => {
        const uri = props.route.params.image;

        const response = await fetch(uri)
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob)

        const taskProgress = (snapshot) => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot => {
                savePostData(snapshot);
                console.log(snapshot)
            }))
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted)
    }

    const savePostData = (downloadURL) => {
        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then(function () {
                props.navigation.popToPop()
            })
    }

    return (
        <View style={{ flex: 1, justifyContent:'center', alignItems:'center'}}>
            <Image source={{ uri: props.route.params.image }} />
            <TextInput
                placeholder="Write a caption.."
                onChangeText={(caption) => setCaption(caption)}
            />

            <Button title="Save" onPress={() => uploadImage()} />
        </View>
    )
}
