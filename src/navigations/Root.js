import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import WelcomeScreen from "../screens/WelcomeScreen";
import Tab from "./Tab";
import Stack from "./Stack";
import auth from '@react-native-firebase/auth';
import MumbleStack from "./MumbleStack";

const RootNavigation = createNativeStackNavigator(); 

const Root = () => {
    const [currentUser, setCurrentUser] = useState({});
    
    useEffect(() => {
        setCurrentUser(auth().currentUser);
    }, [currentUser]);

    return (
        <RootNavigation.Navigator initialRouteName='Welcome' 
            screenOptions={{
                // presentation: "modal", 
                headerShown: false
            }}>
            <RootNavigation.Screen name='Welcome' component={WelcomeScreen} />
            <RootNavigation.Screen name="Tab" component={Tab}
                initialParams={{ prop: currentUser.email }}
            />
            <RootNavigation.Screen name="Stack" component={Stack}
                initialParams={{ prop: currentUser.email }}
            />
            <RootNavigation.Screen name="MumbleStack" component={MumbleStack}
                initialParams={{ prop: currentUser.email }}
            />
        </RootNavigation.Navigator>

    )
};

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const LogoImage = styled.Image`
    width: ${hp(23)}px;
    height: ${hp(23)}px;
    border-radius: 300px;
`;

const TextContainer = styled.View`
    align-items: center;
    justify-content: space-between;
    align-items: flex-end;
`;

const Title = styled.Text`
    font-weight: bold;
    color: rgba(255, 0, 0, 0.6);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); 
`;

const SubTitle = styled.Text`
    color: rgba(255, 0, 0, 0.6);
`;

const LogoutButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 15px 0px;
`;

const LogoutButtonText = styled.Text`
    color: red;
    padding: 5px 5px;
    font-weight: 800;
`;


export default Root;