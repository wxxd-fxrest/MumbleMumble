import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import EmptyImg from "../../src/assets/Mumble.png";
import { darkTheme, lightTheme } from "../../colors";

const CommentScreen = ({prop}) => {
    const isDark = useColorScheme() === 'dark';
    const [comment, setComment] = useState("");
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        const subscriber = firestore().collection('Users').doc(`${prop}`)
        .onSnapshot(documentSnapshot => {
            setCurrentData(documentSnapshot.data());
            //  console.log(currentData);
        });

        return () => subscriber();
    }, [prop]);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={110} 
        >

            <CommentBox />

            <CommentInputContiner isDark={isDark}>
                <ProfileContainer>
                    {/* <ProfileImg source={item.Data.masterImage ? {uri: item.Data.masterImage} : EmptyImg}/> */}
                    <ProfileImg source={EmptyImg} />
                </ProfileContainer>
                <CommentInput isDark={isDark}
                    placeholder="Enter your review." 
                    placeholderTextColor={isDark ? "lightgrey" : "grey"}
                    returnKeyType="search"
                    maxLength={200}
                    multiline={true}
                    onChangeText={(text) => {
                        setComment(text)
                    }}
                />
            </CommentInputContiner>
      </KeyboardAvoidingView>
    )
};

const Container = styled.View``;

const TItle = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const ProfileContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const ProfileImg = styled.Image`
    width: 45px;
    height: 45px;
    border-radius: 35px;
    margin-right: ${wp(2)}px;
`;

const CommentBox = styled.View`
    flex: 1;
`;

const CommentInputContiner = styled.View`
    flex-direction: row;
    /* background-color: yellow; */
    align-items: flex-start;
    padding: ${wp(1.5)}px;
    height: 60px;
`;

const CommentInput = styled.TextInput`
    /* background-color: yellowgreen; */
    padding: ${hp(1.5)}px;
    flex: 1;
    border-color: ${(props) => (props.isDark ? darkTheme.BtnColor : lightTheme.BtnColor)};
    border-width: ${hp(0.08)}px;
    border-radius: 20px;
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

export default CommentScreen; 