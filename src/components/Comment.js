import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import EmptyImg from "../../src/assets/Mumble.png";
import firestore from '@react-native-firebase/firestore';
import { Feather } from '@expo/vector-icons'; 
import { Alert, useColorScheme } from "react-native";

const Comment = ({ item, prop, docID }) => {
    const isDark = useColorScheme() === 'dark';
    const [currentData, setCurrentData] = useState([]);
    // console.log('item', item)

    useEffect(() => {
        const subscriber = firestore().collection('Users').doc(`${prop}`)
        .onSnapshot(documentSnapshot => {
            setCurrentData(documentSnapshot.data());
            // console.log('currentData', currentData);
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
                <ProfileImg source={currentData ? {uri: currentData.profileImgURL} : EmptyImg}/>
                <NameComment>
                    <ProfileName isDark={isDark}> {currentData.name} </ProfileName>
                    <CommentText isDark={isDark}> {item.Data.Comment} </CommentText>
                </NameComment>
                <DeleteComment onPress={onDelete}>
                    <Feather name="more-vertical" size={20} color={isDark ? "white" : "black"} />
                </DeleteComment>
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

const DeleteComment = styled.TouchableOpacity``;

export default Comment;