import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import EmptyImg from "../../src/assets/Mumble.png";

const MumbleScreen = ({ route: {params} }) => {
    const navigation = useNavigation();
    const isDark = useColorScheme() === 'dark';

    console.log(params.Data.masterName);

    return (
        <Container>
            <ProfileImg source={params.Data.masterImage ? {uri: params.Data.masterImage} : EmptyImg}/>
            <ProfileName isDark={isDark}> {params.Data.masterName === false ? '익명' : params.Data.masterName} </ProfileName>
            <Title isDark={isDark}> {params.Data.Mumble} </Title>
        </Container>
    )
};

const Container = styled.View`
    flex: 1;
    padding: ${hp(2)}px ${wp(6)}px;
`;

const ProfileImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 35px;
`;

const ProfileName = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const Title = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

export default MumbleScreen;