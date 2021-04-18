import React from 'react'
import { View, Text, Button } from 'react-native'
import firebase, { auth } from 'firebase'

export default function Feed() {
    return (
        <View style={{flex:1, justifyContent:'center', alignItems: 'center',}}>
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Feed</Text>
            </View>
        </View>
    )
}
