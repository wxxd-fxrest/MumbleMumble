import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components";

const CurrentMumble = ({item}) => {
    const isDark = useColorScheme() === 'dark';
    const navigation = useNavigation();
    return(
        <Container onPress={() => {
            navigation.navigate("MumbleStack", {
                screen: "Mumble",
                params: item,
            });
        }}>
            {item.Data.masterName === false ? '' : <Name isDark={isDark}> {item.Data.masterName} </Name>}
            <MumbleText isDark={isDark}> {item.Data.Mumble} </MumbleText>
        </Container>
    )
};

const Container = styled.TouchableOpacity`
    background-color: yellowgreen;
    margin-bottom: 10px;
`;

const MumbleText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const Name = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

export default CurrentMumble; 