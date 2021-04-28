import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')

export default function Search(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
            .collection('users')
            .where('name', '>=', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return {
                        id,
                        ...data
                    }
                })
                setUsers(users)
                console.log(users)
            })


    }

    return (
        <View>
            <TextInput placeholder="Type here.." onChangeText={(search) => fetchUsers(search)} />

            <FlatList
                style={{ marginTop: 50 }}
                numColumns={1}
                data={users}
                horizontal={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => props.navigation.navigate('Profile', { uid: item.id })}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}
