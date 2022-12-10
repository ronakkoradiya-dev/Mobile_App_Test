import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from './../screens/Home';
import AddUser from '../screens/AddUser';
import UserDetails from './../screens/UserDetails';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}
            initialRouteName="Login"
        >
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
    )
}

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}
            initialRouteName="Home"
        >
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='AddUser' component={AddUser} />
            <Stack.Screen name='UserDetails' component={UserDetails} />
        </Stack.Navigator>
    )
}

const AppRouter = () => {

    const [initialRoute, setInitialRoute] = useState("")

    useEffect(() => {
        (async () => {
            const getToken = await AsyncStorage.getItem("userToken")
            if (getToken != null) {
                setInitialRoute("TradeList")
            } else {
                setInitialRoute("Login")
            }
        })()
    }, [])

    return (
        initialRoute != "" ?
            <NavigationContainer >
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                >
                    {initialRoute == "Login" ? <Stack.Screen name='Login' component={LoginStack} /> : null}
                    <Stack.Screen name='Home' component={HomeStack} />
                </Stack.Navigator>
            </NavigationContainer >
            : null
    );
};

export default AppRouter;