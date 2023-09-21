import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import Write from "../components/Write";
import { darkTheme, lightTheme } from "../../colors";
import { Ionicons } from '@expo/vector-icons'; 
import styled from "styled-components";
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import WriteOption from "../components/WriteOption";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useWriteContext } from "../context/WriteContext";

const NativeStack = createNativeStackNavigator();

const Stack = ({ route }) => {
    const { prop1 } = route.params;
    const navigation = useNavigation();
    const isDark = useColorScheme() === 'dark';
    // console.log('stack', prop1)

    const { write, setWrite, mumble, setMumble } = useWriteContext();

    return (
        <NativeStack.Navigator 
            screenOptions={{
                // headerShown: false,
                // headerBackVisible: true,
                // headerBackTitleVisible: true,
                headerStyle: {
                    backgroundColor: isDark ? 'black' : 'white',
                },
                headerTitleStyle: {
                    color: "white",
                },
                contentStyle: {
                    backgroundColor: isDark ? 'black' : 'white',
                },

            }}>
            <NativeStack.Screen name="Write" component={Write}
                initialParams={{ prop1: prop1 }}
                options={{
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <SetupButton onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={26} color={isDark ? 'white' : 'black'} />
                        </SetupButton>
                    ),
                    headerRight: () => (
                        <SetupButton onPress={() => {
                            if(write === true) {
                                navigation.navigate('Stack', {
                                    screen: 'selectOption'
                                })
                            }
                        }}>
                            <MaterialCommunityIcons name="page-next-outline" size={24} 
                                color={
                                    isDark ? write === true ? "white" : "rgba(255, 255, 255, 0.3)" 
                                : 
                                    write === true ? "black" : "rgba(0, 0, 0, 0.3)"
                                } 
                            />
                        </SetupButton>
                    )
                }}
            />

            <NativeStack.Screen name="selectOption" component={WriteOption}
                initialParams={{ prop1: prop1 }}
                options={{
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <SetupButton onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={26} color={isDark ? 'white' : 'black'} />
                        </SetupButton>
                    ),
                    headerRight: () => (
                        <SetupButton>
                            <FontAwesome name="send-o" color={isDark ? 'white' : 'black'} size={22} />
                        </SetupButton>
                    )
                }}
            />
        </NativeStack.Navigator>
    )
};

const SetupButton = styled.TouchableOpacity`
    margin-right: 20px;
`;


export default Stack; 