import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components";
import { colors, darkTheme, lightTheme } from "../../colors";
import MainScreen from "../screens/tab/MainScreen";
import ProfileScreen from "../screens/tab/ProfileScreen";
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';

const NativeTab = createBottomTabNavigator();

const Tab = () => {
    const isDark = useColorScheme() === 'dark';
    
    return (
        <NativeTab.Navigator
            screenOptions={{
                unmountOnBlur: true, 
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: isDark ? darkTheme.backColor : lightTheme.headerColor,
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: colors.lightGreyColor,
                headerStyle: {
                    backgroundColor: isDark ? darkTheme.backColor : lightTheme.headerColor,
                },
                headerTitleStyle: {
                    color: "white",
                },
                tabBarIconStyle: {
                    marginTop: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "700", 
                    marginBottom: -8,
                },
                headerRight: () => (
                    <SetupButton>
                        <Feather name="settings" color="white" size={22} />
                    </SetupButton>
                )
            }}
            sceneContainerStyle={{
                backgroundColor: isDark ? darkTheme.backColor : "white",
            }}>

            <NativeTab.Screen name="Mumble" component={MainScreen} 
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({focused, color, size}) => {
                        return <Ionicons name={focused ? "home" : "home-outline"} color={color} size={size} />
                    }
                }} 
            />

            <NativeTab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({focused, color, size}) => {
                    return <Ionicons name={focused ? "ios-person-sharp" : "ios-person-outline"} color={color} size={size} />
                }
            }}/>

        </NativeTab.Navigator>
    )
};

const SetupButton = styled.TouchableOpacity`
    margin-right: 20px;
`;

export default Tab; 