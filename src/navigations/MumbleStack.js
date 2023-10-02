import React from "react";
import { useColorScheme } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import MumbleScreen from "../screens/MumbleScreen";
import { Ionicons } from '@expo/vector-icons'; 

const MumbleNativeStack = createNativeStackNavigator();

const MumbleStack = () => {
    const isDark = useColorScheme() === 'dark';
    const navigation = useNavigation();

    return(
        <MumbleNativeStack.Navigator 
            screenOptions={{
                headerStyle: {
                    backgroundColor: isDark ? 'black' : 'white',
                },
                headerTitleStyle: {
                    color: isDark ? 'white' : 'black',
                },
                contentStyle: {
                    backgroundColor: isDark ? 'black' : 'white',
                },

            }}>
            <MumbleNativeStack.Screen name="Mumble" component={MumbleScreen}
                options={{
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <SetupButton onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={26} color={isDark ? 'white' : 'black'} />
                        </SetupButton>
                    ),
                }}
            />
        </MumbleNativeStack.Navigator>
    )
};

const SetupButton = styled.TouchableOpacity``;

export default MumbleStack; 