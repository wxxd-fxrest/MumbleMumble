import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, useColorScheme } from "react-native";
import styled from "styled-components";
import auth from '@react-native-firebase/auth';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const isDark = useColorScheme() === 'dark';

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
            <Title isDark={isDark}>ProfileScreen</Title>
            <LogoutButton onPress={onLogOut}>
                <LogoutButtonText> 로그아웃 </LogoutButtonText>
            </LogoutButton>
        </Container>
    )
};

const Container = styled.View`
    flex: 1;
    padding: ${hp(2)}px;
`;

const Title = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
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


export default ProfileScreen;