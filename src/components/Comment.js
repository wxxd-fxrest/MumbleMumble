import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import EmptyImg from "../../src/assets/Mumble.png";
import firestore from '@react-native-firebase/firestore';
import { Feather } from '@expo/vector-icons'; 
import { Alert, useColorScheme } from "react-native";

const Comment = ({ item, prop, docID }) => {
    const isDark = useColorScheme() === 'dark';
    const [commentUser, setCommentUser] = useState([]);
    // console.log('item', item);

    useEffect(() => {
        const subscriber = firestore().collection('Users').doc(`${item.Data.masterEmail}`)
        .onSnapshot(documentSnapshot => {
            setCommentUser(documentSnapshot.data());
            // console.log('currentData', commentUser);
        });

        return () => subscriber();
    }, [prop]);

    const onDelete = () => {
        if(item.DocID) {
            Alert.alert(
                'comment를 삭제하시겠습니까?',
                '삭제 시 복구할 수 없으며, 답변도 함께 삭제됩니다.',
                [
                    {
                        text: "No",
                        onPress: () => console.log("no"),
                        style: "destructive"
                    },
                    {
                        text: "Yes",
                        onPress: async() => {
                            await firestore()
                                .collection('Mumbles').doc(`${docID}`).collection('Comment').doc(`${item.DocID}`)
                                .delete().then(() => {
                                    console.log('User deleted!');
                            });
                        }
                    },
                ],
                {
                    cancelable: true,
                },
            );
        }
    };

    return (
        <Container>
            <ProfileContainer>
                <ProfileImg source={commentUser ? {uri: commentUser.profileImgURL} : EmptyImg}/>
                <NameComment>
                    <ProfileName isDark={isDark}> {commentUser.name} </ProfileName>
                    <CommentText isDark={isDark}> {item.Data.Comment} </CommentText>
                </NameComment>
                {prop === item.Data.masterEmail &&
                    <DeleteComment onPress={onDelete}>
                        <Feather name="more-vertical" size={20} color={isDark ? "white" : "black"} />
                    </DeleteComment>
                }
            </ProfileContainer>
        </Container>
    )
};

const Container = styled.View`
    flex: 1;
    padding: ${wp(4)}px 0px;
`;

const ProfileContainer = styled.View`
    flex-direction: row;
    margin-bottom: ${hp(2)}px;
`;

const ProfileImg = styled.Image`
    width: 45px;
    height: 45px;
    border-radius: 35px;
    margin-right: ${wp(3)}px;
`;

const NameComment = styled.View`
    width: 75%;
    /* background-color: yellow; */
    margin-right: ${wp(3)}px;
`;

const ProfileName = styled.Text`
    font-weight: bold;
    font-size: ${wp(3.5)}px;
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const CommentText = styled.Text`
    font-size: ${wp(3)}px;
    color: ${(props) => (props.isDark ? "white" : "black")};
    padding: ${wp(1)}px;
`;

const DeleteComment = styled.TouchableOpacity`
    /* background-color: yellowgreen; */
`;

export default Comment;