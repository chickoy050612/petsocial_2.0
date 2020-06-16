import * as React from 'react';
import TabNavigator from './TabNavigator.js' //not using {} because its export default (not export only)
import AuthNavigator from './AuthNavigator.js' //not using {} because its export default (not export only)
import { createAppContainer,createSwitchNavigator } from 'react-navigation';


const SwitchNavigator = createSwitchNavigator(
    {
        Home: {
            screen: TabNavigator
        },
        Auth: {
            screen: AuthNavigator
        }
    },
    {
        initialRouteName: 'Auth',
    }
);

export default createAppContainer(SwitchNavigator);