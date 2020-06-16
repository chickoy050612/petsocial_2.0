import * as React from 'react';
import Login from '../screens/Login.js'
import SignupScreen from '../screens/Signup.js'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableOpacity} from 'react-native-gesture-handler';
import { Ionicons} from '@expo/vector-icons';
import styles from '../styles.js'
// const StackNavigator = createSwitchNavigator({
//     Login: {
//         screen: Login,
//         navigationOptions : {
//             header:null
//         }
//     },
//     Signup: {
//         screen: SignupScreen
//     }
// });

const StackNavigator = createStackNavigator(
    {
      Login: { 
        screen: Login,
        navigationOptions: {
            header: null
        }
      },
      Signup: { 
        screen: SignupScreen,
        navigationOptions: ({ navigation }) => ({
          title: 'Signup',
          headerLeft: (
            <TouchableOpacity onPress={() => navigation.goBack()} >
              <Ionicons style={styles.icon} name={'ios-arrow-back'} size={30}/>
            </TouchableOpacity>
          )
        })
      }
    }
  );

export default createAppContainer(StackNavigator);