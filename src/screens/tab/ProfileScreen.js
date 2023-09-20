import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert } from "react-native";
import styled from "styled-components";
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
    const navigation = useNavigation();

    const onLogOut = () => {
        Alert.alert(
            'Log Out',
            '정말로 로그아웃하시겠습니까?',
            [
                {
                    text: "No",
                    onPress: () => console.log("no"),
                    style: "destructive"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        auth().signOut();
                        navigation.navigate("Auth");
                    },
                },
            ],
            {
                cancelable: true,
            },
        );
    };
    return (
        <Container> 
            <Title>ProfileScreen</Title>
            <LogoutButton onPress={onLogOut}>
                <LogoutButtonText> 로그아웃 </LogoutButtonText>
            </LogoutButton>
        </Container>
    )
};

const Container = styled.View``;

const Title = styled.Text``;

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


export default ProfileScreen;