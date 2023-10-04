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
        Animated.sequence([
            Animated.timing(circle1Scale, {
                toValue: 1.2,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.elastic(0), 
            }),
            Animated.timing(circle1Scale, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.elastic(0),
            }),
            Animated.timing(circle2Scale, {
                toValue: 1.2,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.elastic(0),
            }),
            Animated.timing(circle2Scale, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
                easing: Easing.elastic(2),
            }),
        ]).start();
        setTimeout(() => navigation.navigate("Tab"), 2000);
    }, []);

    return (
        <Container isDark={isDark}>
            <Animated.View
                    style={{
                    backgroundColor: isDark ? "rgba(9, 93, 158, 0.35)" : "rgba(221, 84, 15, 0.35)",
                    borderRadius: 1000,
                    padding: hp(5),
                    transform: [{ scale: circle1Scale }],
                }}>
                <Animated.View
                    style={{
                        backgroundColor: isDark ? "rgba(9, 93, 158, 0.55)" : "rgba(221, 84, 15, 0.55)",
                        borderRadius: 1000,
                        padding: hp(0.5),
                        transform: [{ scale: circle2Scale }],
                    }}>
                    <LogoImage source={isDark ? DarkLogo : LightLogo} />
                </Animated.View>
            </Animated.View>
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