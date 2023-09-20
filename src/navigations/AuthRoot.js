import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/Login";
import Join from "../screens/auth/Join";
import AuthWelcome from "../screens/AuthWelcome";

const AuthStack = createNativeStackNavigator();

const AuthRoot = () => {
    return (
        <AuthStack.Navigator initialRouteName='Welcome' 
            screenOptions={{
                headerShown:false,
                presentation: "modal",
                headerTintColor: "white",
                headerStyle: {
                    backgroundColor: 'red',
                },
            }}>
            <AuthStack.Screen name='Welcome' component={AuthWelcome} />
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="Join" component={Join} />
        </AuthStack.Navigator>
    )
};

export default AuthRoot;