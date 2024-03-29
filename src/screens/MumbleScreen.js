import React, { useEffect, useState } from "react";
import { Alert, useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import EmptyImg from "../../src/assets/Mumble.png";
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import CommentScreen from "./CommentScreen";
                
const MumbleScreen = ({ route: {params} }) => {
    const item = params.item;
    const prop = params.prop;
    const navigation = useNavigation();
    const isDark = useColorScheme() === 'dark';
    const [isLiked, setIsLiked] = useState(false);
    const [currentMumble, setCurrentMumble] = useState([]);
    const [masterData, setMasterData] = useState([]);
    const [music, setMusic] = useState(false);
                    
    // console.log('prop', item.DocID)
    // console.log(prop)

    useEffect(() => {
        const subscriber = firestore().collection('Users').doc(`${item.Data.masterEmail}`)
            .onSnapshot(documentSnapshot => {
                setMasterData(documentSnapshot.data());
                // console.log(documentSnapshot.data());
        });

        return () => subscriber();
    }, [prop]);

    useEffect(() => {
        const subscriber = firestore().collection('Mumbles').doc(`${item.DocID}`).onSnapshot(documentSnapshot => {
            setCurrentMumble(documentSnapshot.data());
            // 원래 게시물 카드 클릭 시 데이터를 받아오는 방식으로 진행하려 했으나, 
            // 데이터 변경이 더디게 되고, 새로고침 시 적용되어 해당 페이지에서 한 번 더 데이터를 가져오도록 함.
        });

        return () => subscriber();
    }, [item]);

    useEffect(() => {
        if(currentMumble) {
            if (currentMumble.LikeUser) {
                if (currentMumble.LikeUser.includes(prop) === true) {
                    setIsLiked(true);
                } else if (currentMumble.LikeUser.includes(prop) === false) {
                    setIsLiked(false);
                }
            }
        }
    }, [currentMumble, isLiked]);

    const toggleLike = async() => {
        if(item.Data.LikeUser.includes(prop) === true) {
            await firestore().collection('Mumbles').doc(`${item.DocID}`).update({
                LikeUser: firestore.FieldValue.arrayRemove(prop), // itemToRemove는 제거하려는 데이터
            });
            setIsLiked(false);
        } else if(item.Data.LikeUser.includes(prop) === false) {
            await firestore().collection('Mumbles').doc(`${item.DocID}`).update({
                LikeUser: firestore.FieldValue.arrayUnion(prop)
            })
            setIsLiked(true);
        }
    };

    const onDelete = () => {
        if(item.DocID) {
            Alert.alert(
                '질문을 삭제하시겠습니까?',
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
                                .collection('Mumbles').doc(`${item.DocID}`)
                                .delete().then(() => {
                                    console.log('User deleted!');
                            });
                            await firestore().collection('Users').doc(`${prop}`).update({
                                mumbleCount: masterData.mumbleCount - 1,
                            })
                            navigation.goBack();
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
                {item.Data.ProfileBoolean === false ? <>
                    <ProfileImg source={EmptyImg}/>
                    <Name isDark={isDark}> 익명 Mumble 입니다. </Name>
                </> : <>
                    <ProfileImg source={masterData ? {uri: masterData.profileImgURL} : EmptyImg}/>
                    <Name isDark={isDark}> {masterData.name} </Name>
                </>}
                {item.Data.masterEmail === prop && 
                    <DeleteBtn onPress={onDelete}>
                        <MaterialCommunityIcons name="delete-alert-outline" color={isDark ? 'white' : 'black'} size={26} />
                    </DeleteBtn>
                }
            </ProfileContainer>
            {currentMumble &&
                <MumbleContainer>
                    {music === false ?
                        <MumbleText isDark={isDark}> {currentMumble.Mumble} </MumbleText>
                    :
                        <MusicBox>
                            <MaterialCommunityIcons name="archive-music" size={34} color={isDark ? "white" : "black"} />
                            <MusicText isDark={isDark}> {item.Data.Music.name} - {item.Data.Music.artist} </MusicText>
                        </MusicBox> 
                    }
                    <BottomBox>
                        {item.Data.Music.artist ?
                            <MusicSwitch onPress={() => setMusic(!music)} 
                                style={{
                                    backgroundColor: isDark ? "#353535" : "#BDBDBD", 
                                    borderRadius: 50, 
                                    padding: 3,
                                }}
                            >
                                <Ionicons name="musical-note-outline" size={20} color={isDark ? "white" : "black"} />
                            </MusicSwitch>
                            :
                            <MusicSwitch />
                        }
                        <LikeBtn>
                            {isLiked ? <>
                                <LikeText isDark={isDark}> {currentMumble.LikeUser ? currentMumble.LikeUser.length : 0}명이 공감합니다. </LikeText>                    
                                <FontAwesome name="heart" size={20} color={isDark ? "#B00020" : "red"} onPress={toggleLike} />
                            </> : <>
                                <LikeText isDark={isDark}> {currentMumble.LikeUser ? currentMumble.LikeUser.length : 0}명이 공감합니다. </LikeText>                    
                                <FontAwesome name="heart-o" size={20} color={isDark ? "white" : "black"} onPress={toggleLike} /> 
                            </>}
                        </LikeBtn>
                    </BottomBox>
                </MumbleContainer>
            }
            <CommentScreen prop={prop} docID={item.DocID}/>
        </Container>
    )
};

const Container = styled.View`
    flex: 1;
    padding: ${hp(2)}px ${wp(6)}px;
`;

const ProfileContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const ProfileImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 35px;
    margin-right: ${wp(3.5)}px;
`;

const Name = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    font-size: ${hp(1.8)}px;
    font-weight: bold;
`;

const DeleteBtn = styled.TouchableOpacity`
    position: absolute;
    right: 0px;
`;

const MumbleContainer = styled.View`
    flex-direction: column;
    padding-bottom: ${hp(2)}px;
`;

const BottomBox = styled.View`
    justify-content: space-between;
    flex-direction: row;
    
`;

const MusicSwitch = styled.TouchableOpacity``;

const MumbleText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    margin: ${hp(1.5)}px 0px;
    font-size: ${hp(1.5)}px;;
    font-weight: 500;
    padding: ${hp(1)}px 0px;
`;

const LikeBtn = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`;

const LikeText = styled.Text`
    font-size: ${hp(1.3)}px;;
    padding-right: ${wp(1)}px;
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const MusicBox = styled.View`
    /* background-color: yellowgreen; */
    justify-content: center;
    align-items: center;
    padding: ${wp(5)}px;
`;

const MusicText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    margin-top: ${hp(1)}px;
    font-size: ${hp(1.5)}px;;
    /* padding: ${hp(1)}px; */
`;


export default MumbleScreen;