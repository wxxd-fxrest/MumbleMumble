import React, { useEffect } from "react";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useWriteContext } from "../context/WriteContext";

const Write = () => {
    const navigation = useNavigation();
    const isDark = useColorScheme() === 'dark';
    // console.log('write', route.params.prop3)
    const { write, setWrite, mumble, setMumble } = useWriteContext();

    // console.log(write);

    useEffect(() => {
        if (mumble !== '') {
            setWrite(true);
        } else {
            setWrite(false);
        }
    }, [mumble])

    return (
        <Container>
            <SearchInput isDark={isDark}
                placeholder="Enter your review." 
                placeholderTextColor={isDark ? "lightgrey" : "grey"}
                returnKeyType="search"
                maxLength={200}
                multiline={true}
                onChangeText={(text) => {
                    setMumble(text)
                }}
            /> 
        </Container>
    )
};

const Container = styled.View`
    flex: 1;
    padding: ${hp(1)}px ${hp(2)}px;
`;

const SearchInput = styled.TextInput`
    /* background-color: yellowgreen; */
    /* border: solid 1px ${(props) => (props.isDark ? "white" : "black")}; */
    border-radius: 20px;
    width: 100%;
    height: ${hp(15)}px;
    padding: 0px ${hp(2)}px;
    color: ${(props) => (props.isDark ? "white" : "black")};
    margin: 20px 0px;
`;


const Title = styled.Text``;

export default Write;