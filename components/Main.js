import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import AddScreen from './main/Add'

const Tab = createBottomTabNavigator();

export class Main extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (         
            <Tab.Navigator>
                 <Tab.Screen name="Feed" component={FeedScreen} 
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                 />

                <Tab.Screen name="Add" component={AddScreen} 
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="plus" color={color} size={size} />
                        ),
                    }}
                 />

                 <Tab.Screen name="Profile" component={ProfileScreen} 
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="human" color={color} size={size} />
                        ),
                    }}
                 />
          </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)