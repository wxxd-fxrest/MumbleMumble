import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components";
import MainScreen from "../screens/tab/MainScreen";
import ProfileScreen from "../screens/tab/ProfileScreen";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'; 

const NativeTab = createBottomTabNavigator();

const Tab = ({ route }) => {
    const { prop } = route.params;
    const isDark = useColorScheme() === 'dark';
    const navigation = useNavigation();
    const goWrite = () => {
        navigation.navigate("Stack", {screen: "Write"});
    };

    const goSetup = () => {
        navigation.navigate("Stack", {screen: "Setup"});
    };

    return (
        <NativeTab.Navigator
            screenOptions={{
                unmountOnBlur: true, 
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: isDark ? 'black' : 'white',
                },
                tabBarActiveTintColor: "white",
                headerStyle: {
                    backgroundColor: isDark ? 'black' : 'white',
                },
                headerTitleStyle: {
                    color:  isDark ? 'white' : 'black',
                    fontSize: 18,
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
                    <SetupButton onPress={goWrite}>
                        <FontAwesome name="send-o" color={isDark ? 'white' : 'black'} size={22} />
                    </SetupButton>
                )
            }}
            sceneContainerStyle={{
                backgroundColor: isDark ? 'black' : "white",
            }}>

            <NativeTab.Screen name="Mumble" component={MainScreen} 
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({focused, size}) => {
                        return <Ionicons name={focused ? "home" : "home-outline"} color={isDark ? 'white' : 'black'} size={size} />
                    }
                }} 
            />

            <NativeTab.Screen name="Profile" component={ProfileScreen} 
                initialParams={{ prop: prop }}
                options={{
                    tabBarIcon: ({focused, size}) => {
                        return <Ionicons name={focused ? "ios-person-sharp" : "ios-person-outline"} color={isDark ? 'white' : 'black'} size={size} 
                        />
                    },
                    headerLeft: () => (
                        <SetupButton2 onPress={goSetup}>
                            <AntDesign name="setting" size={26} color={isDark ? 'white' : 'black'}  />
                        </SetupButton2>
                    ),
            }}/>

        </NativeTab.Navigator>
    )
};

const SetupButton = styled.TouchableOpacity`
    margin-right: 20px;
`;

const SetupButton2 = styled.TouchableOpacity`
    margin-left: 20px;
`;

export default Tab; 