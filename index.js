/**
 * @format
*/
/* 
import {AppRegistry, SafeAreaView} from 'react-native';
import React from 'react';
import 'react-native-gesture-handler';

import App from './src/screens/App';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Routes from './src/services/Routes';
import {NavigationContainer} from '@react-navigation/native';

import {name as appName} from './app.json'; */

/* const Index = () => {
    return <Login email="myemail@email.com"/>
}; */

/* const wrappedRoutes = () =>{
    return(
        <NavigationContainer>
            <SafeAreaView>
                <Routes />
            </SafeAreaView>
        </NavigationContainer>
    );
};


AppRegistry.registerComponent('appName', () => wrappedRoutes);
//AppRegistry.registerComponent(appName, () => App);
 */

import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry, SafeAreaView} from 'react-native';
import Routes from './src/routes/Routes';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {initializeFirebaseApi} from './src/services/FirebaseApi';

const wrappedRoutes = () => {
    return(
        <NavigationContainer>
            <SafeAreaView style={{flex:1}}>
                <Routes />
            </SafeAreaView>
        </NavigationContainer>
    );
};

AppRegistry.registerComponent(appName, () => {
    initializeFirebaseApi();
    return wrappedRoutes;
});