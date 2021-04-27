import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TextInput } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')

export default function Search() {
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

    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    return (
        <View>
            <TextInput placeholder="Type here.." onChangeText={(search) => fetchUsers(search)} />

            <FlatList
                style={{ marginTop: 50 }}
                numColumns={1}
                data={users}
                horizontal={false}
                renderItem={({ item }) => (
                    <Text>{item.name}</Text>
                )}
            />
        </View>
    )
}
