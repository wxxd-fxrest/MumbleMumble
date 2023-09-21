import React from "react";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useColorScheme } from "react-native";

const MainScreen = () => {
    const isDark = useColorScheme() === 'dark';
    return (
        <Container> 
            <Title isDark={isDark}>MainScreen</Title>
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

export default MainScreen;