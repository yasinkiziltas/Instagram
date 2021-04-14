import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import firebase, { auth } from 'firebase'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

export class Main extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    signOut() {
        try {
            auth().signOut();
            console.log('Logout success')
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { currentUser } = this.props;
        console.log(currentUser)

        // if (currentUser === undefined) {
        //     return (
        //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        //             <Text>Undefined</Text>
        //         </View>
        //     )
        // }

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>logged in</Text>
                <Button title="Sign Out" onPress={() => this.signOut()} />
            </View>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)