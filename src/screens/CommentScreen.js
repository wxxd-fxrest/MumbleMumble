import React, { useEffect, useState } from "react";
import { FlatList, useColorScheme } from "react-native";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import EmptyImg from "../../src/assets/Mumble.png";
import { darkTheme, lightTheme } from "../../colors";
import { Ionicons } from '@expo/vector-icons'; 
import Comment from "../components/Comment";

const CommentScreen = ({prop, docID}) => {
    const isDark = useColorScheme() === 'dark';
    const [comment, setComment] = useState('');
    const [currentData, setCurrentData] = useState([]);
    const [commentData, setCommentData] = useState([]);

    useEffect(() => {
        const subscriber = firestore().collection('Users').doc(`${prop}`)
        .onSnapshot(documentSnapshot => {
            setCurrentData(documentSnapshot.data());
            // console.log('currentData', currentData);
        });

        return () => subscriber();
    }, [prop]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Mumbles').doc(`${docID}`).collection('Comment').orderBy('orderBy').onSnapshot(documentSnapshot => {
                let feedArray = []
                documentSnapshot.forEach((doc) => {
                    feedArray.push({
                        DocID: doc.id, 
                        Data: doc.data(),
                    })
                    setCommentData(feedArray);
                    console.log('commentData', commentData);
                });
            });

        return () => subscriber();
    }, [commentData.Data]);


    const onSaveMumble = async() => {
        if(comment) {
            await firestore().collection('Mumbles').doc(`${docID}`).collection('Comment').add({
                Comment: comment, 
                masterEmail: currentData.email,
                orderBy: new Date(),
            });
            setComment('');
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={110} 
        >

        {commentData && 
            <FlatList data={commentData}
                keyExtractor={(item) => item.DocID + ""}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <Comment item={item} prop={prop} docID={docID}/>
                )} 
            />
        }

            <CommentInputContiner isDark={isDark}>
                <ProfileContainer>
                    <ProfileImg source={currentData ? {uri: currentData.profileImgURL} : EmptyImg}/>
                </ProfileContainer>
                <Empty />
                <CommentInput isDark={isDark}
                    placeholder="Enter your review." 
                    placeholderTextColor={isDark ? "lightgrey" : "grey"}
                    returnKeyType="search"
                    maxLength={200}
                    multiline={true}
                    onSubmitEditing={onSaveMumble}
                    onChangeText={(text) => {
                        setComment(text)
                    }}
                />
                <SaveBtn onPress={onSaveMumble}> 
                    {!comment ? 
                        <Ionicons name="arrow-forward-circle-outline" size={40} color={isDark ? darkTheme.BtnColor : lightTheme.BtnColor} />
                    :
                        <Ionicons name="arrow-forward-circle" size={40} color={isDark ? darkTheme.BtnColor : lightTheme.BtnColor} />
                    }
                </SaveBtn>
            </CommentInputContiner>
      </KeyboardAvoidingView>
    )
};

const Container = styled.View``;

const TItle = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const CommentBox = styled.View`
    flex: 1;
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

const Empty = styled.View`
    width: ${wp(2)}px;
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
    padding-right: ${wp(11)}px;
    flex: 1;
    border-color: ${(props) => (props.isDark ? darkTheme.BtnColor : lightTheme.BtnColor)};
    border-width: ${hp(0.08)}px;
    border-radius: 20px;
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const SaveBtn = styled.TouchableOpacity`
    position: absolute;
    right: ${wp(2)}px;
    top: ${hp(0.8)}px;
`;

export default CommentScreen; 