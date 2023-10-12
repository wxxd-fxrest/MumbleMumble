import React, { useEffect } from "react";
import { Animated, Easing, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import LightLogo from "../../src/assets/Mumble-light.png";
import DarkLogo from "../../src/assets/Mumble-dark.png";

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const isDark = useColorScheme() === 'dark';
    const circle1Scale = new Animated.Value(1);
    const circle2Scale = new Animated.Value(1);

    useEffect(() => {
        setTimeout(() => navigation.navigate("Tab"), 2000);
    }, []);

    return (
        <Container isDark={isDark}>
            <LogoImage source={isDark ? DarkLogo : LightLogo} />
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.isDark ? "black" : "white")};
`;

const LogoImage = styled.Image`
    width: ${hp(30)}px;
    height: ${hp(30)}px;
    border-radius: 300px;
`;

export default WelcomeScreen; 