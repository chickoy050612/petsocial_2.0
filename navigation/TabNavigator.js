import * as React from 'react';
import { Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome  } from '@expo/vector-icons';
import Upload from '../screens/Upload.js'
import Post from '../screens/Post.js'
//import Activity from '../screens/Activity.js'
//import Profile from '../screens/Profile.js'
import {HomeNavigator, SearchNavigator, PostNavigator,PlacesNavigator, ActivityNavigator,ProfileNavigator} from './StackNavigator' //using {} because its not export default (it is export only)
//import { NavigationContainer } from '@react-navigation/native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

//https://expo.github.io/vector-icons/


const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions:{
            tabBarLabel:' ',
            tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name={focused ?'home-outline':'home-outline'} size={32} color={focused ?  '#e63b7a' : '#adadad'}/>
            )
        }
    },
    // Search: {
    //     screen: SearchNavigator,
    //     navigationOptions:{
    //         tabBarLabel:' ',
    //         tabBarIcon: ({focused}) => (
    //             <Ionicons name={focused ?'ios-search':'md-search'} size={32} color='#e63b7a'/>
    //         )
    //     }
    // },
    Search: { 
        screen: SearchNavigator,
        navigationOptions: {
          tabBarLabel: ' ',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons name={focused ? 'account-search-outline' : 'account-search-outline'} size={32} color={focused ?  '#e63b7a' : '#adadad'}/>
          ) 
        }
      },
    Post: {
        screen: PostNavigator,
        navigationOptions:{
            tabBarLabel:' ',
            tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name={focused ? 'plus-circle-outline':'plus-circle-outline'} size={32} color={focused ?  '#e63b7a' : '#adadad'}/>
            )
        }
    },
     Places:  {
        screen: PlacesNavigator,
        navigationOptions:{
            tabBarLabel:' ',
            tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name= {focused ? 'map-outline':'map-outline'} size={32} color={focused ?  '#e63b7a' : '#adadad'}/>
            )
        }
    },
    // Activity:  {
    //     screen: ActivityNavigator,
    //     navigationOptions:{
    //         tabBarLabel:' ',
    //         tabBarIcon: ({focused}) => (
    //             <MaterialCommunityIcons name= {focused ? 'paw':'paw'} size={32} color={focused ?  '#e63b7a' : '#adadad'}/>
    //         )
    //     }
    // },
    // Profile: {
    //     screen: Profile,
    //     navigationOptions:{
    //         tabBarLabel:' ',
    //         tabBarIcon: ({focused}) => (
    //             <Ionicons name={focused ? 'ios-person':'md-person'} size={32} color='#e63b7a'/>
    //         )
    //     }
    // }
    MyProfile: { 
        screen: ProfileNavigator,
        navigationOptions: {
          tabBarLabel: ' ',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons name={focused ? 'account-outline' : 'account-outline'} size={32} color={focused ?  '#e63b7a' : '#adadad'}/>
          ) 
        }
      }
}

// , 
//   { 
//     tabBarOptions: {
//       style: {
//         paddingVertical: 10,
//         height: 60
//       }
//     }
//   }

);

export default createAppContainer(TabNavigator);