import React from 'react';
import Login from '../screens/Login'
import MapScreen from '../screens/Map.js'
import HomeScreen from '../screens/Home.js'
import SearchScreen from '../screens/Search.js'
import CameraScreen from '../screens/Camera.js'
import CommentScreen from '../screens/Comment'
import PostScreen from '../screens/Post.js'
import PlacesScreen from '../screens/Places.js'
import ActivityScreen from '../screens/Activity.js'
import ProfileScreen from '../screens/Profile.js'
import EditScreen from '../screens/Signup'
import ChatScreen from '../screens/Chat'
import MessagesScreen from '../screens/Messages'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { TouchableOpacity} from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles.js'

//export = can create multiple
//export default = once only

export const HomeNavigator = createAppContainer(createStackNavigator(
    {
        Home: { 
            screen: HomeScreen,
            navigationOptions: ({ navigation }) => ({
                headerTitle: <Image style={{resizeMode:"contain",width: 100, height: 25}} source={require('../assets/logo.png')} />,
                // headerLeft: (
                //   <TouchableOpacity onPress={() => navigation.navigate('Camera')} >
                //     <Ionicons style={{marginLeft: 10}} name={'ios-camera'} size={30} color='#e63b7a'/>
                //   </TouchableOpacity>
                // ),
                headerRight: (
                  <TouchableOpacity onPress={() => navigation.navigate('Messages')} >
                    <MaterialCommunityIcons style={{marginRight: 10}} name={'email-outline'} size={30} color='#e63b7a'/>
                  </TouchableOpacity>
                ),
              })
          },
          Comment: {
            screen: CommentScreen,
            navigationOptions: ({ navigation }) => ({
              title: 'Comments',
              headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} >
                  <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30} color='#e63b7a'/>
                </TouchableOpacity>
              )
            })
          },
          // Camera: { 
          // screen: CameraScreen,
          // navigationOptions: {
          //     header: null
          // }
          // }
          Map: {
            screen: MapScreen,
            navigationOptions: ({ navigation }) => ({
              title: 'Map View',
              headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} >
                  <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30} color='#e63b7a'/>
                </TouchableOpacity>
              )
            })
          },
          Messages: {
            screen: MessagesScreen,
            navigationOptions: ({ navigation }) => ({
              title: 'Messages',
              headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} >
                  <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30} color='#e63b7a'/>
                </TouchableOpacity>
              )
            })
          },
          Chat: {
            screen: ChatScreen,
            navigationOptions: ({ navigation }) => ({
              title: 'Chat',
              headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()} >
                  <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30} color='#e63b7a'/>
                </TouchableOpacity>
              )
            })
          }
    }
));

HomeNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true
    // if (navigation.state.routes.some(route => route.routeName === 'Camera')) {
    //   tabBarVisible = false
    // }
    if (navigation.state.routes.some(route => route.routeName === 'Map')) {
      tabBarVisible = false
    }
    if (navigation.state.routes.some(route => route.routeName === 'Comment')) {
      tabBarVisible = false
    }
    return {
      tabBarVisible,
    }
  }

  

// export const SearchNavigator = createAppContainer(createStackNavigator(
//     {
//         Search: {
//             screen: SearchScreen,
//             navigationOptions: {
//                 title: 'Search'
//             }
//         }
//     }
// ));
export const SearchNavigator = createAppContainer(createStackNavigator(
  {
    Search: { 
      screen: SearchScreen,
      navigationOptions: {
        header: null
      }
    },
    Profile: { 
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Profile',
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30} color='#e63b7a'/>
          </TouchableOpacity>
        )
      })
    },
  }
));

export const PostNavigator = createAppContainer(createStackNavigator(
    {
      Post: { 
        screen: PostScreen,
        navigationOptions: {
          title: 'Post'
        }
       },
       Camera: { 
          screen: CameraScreen,
          navigationOptions: {
              header: null
          }
          }
      
    }
  ));


  export const PlacesNavigator = createAppContainer(createStackNavigator(
    {
      Places: { 
        screen: PlacesScreen,
        navigationOptions: {
          title: 'Places'
        }
      }
    }
  ));

  // export const ActivityNavigator = createAppContainer(createStackNavigator(
  //   {
  //     Activity: { 
  //       screen: ActivityScreen,
  //       navigationOptions: {
  //         title: 'Activity'
  //       }
  //     }
  //   }
  // ));

  export const ProfileNavigator = createAppContainer(createStackNavigator(
    {
      MyProfile: { 
        screen: ProfileScreen,
        navigationOptions: {
          title: 'My Profile'
        }
      },
      Edit: {
        screen: EditScreen,
        navigationOptions: ({ navigation }) => ({
          title: 'Edit Profile',
          headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()} >
              <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
            </TouchableOpacity>
          )
        })
      },
      Activity: { 
        screen: ActivityScreen,
        navigationOptions: {
          title: 'Activity'
        }
      }
    }
  ));

