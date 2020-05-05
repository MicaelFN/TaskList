import {createStackNavigator} from '@react-navigation/stack';

import {Login, Register, ToDoTasks, DoneTasks, App, Task} from '../screens/Screens';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Stack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();

export const TaskTab =  () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name = "To Do" component = {ToDoTasks} />
            <Tab.Screen name = "Done" component = {DoneTasks} />
        </Tab.Navigator>
    );
};

const Routes = () => {
    return(
        <Stack.Navigator headerMode="screen">
            <Stack.Screen name="App" component={App} options={{headerShown:false}}/>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="TaskList" component={TaskTab} />
            <Stack.Screen name="Task" component={Task}/>
        </Stack.Navigator>
    );
};



export default Routes;