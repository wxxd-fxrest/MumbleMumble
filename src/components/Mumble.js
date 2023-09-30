import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useColorScheme } from "react-native";
import styled from "styled-components";
import EmptyImg from "../../src/assets/Mumble.png";
import { FontAwesome } from '@expo/vector-icons'; 
import firestore from '@react-native-firebase/firestore';

const Mumble = ({item, prop}) => {
    const isDark = useColorScheme() === 'dark';
    const navigation = useNavigation();
    const [isLiked, setIsLiked] = useState(false);
    const [masterData, setMasterData] = useState([]);

    console.log(item.Data)

    useEffect(() => {
        const subscriber = firestore().collection('Users').doc(`${item.Data.masterEmail}`)
            .onSnapshot(documentSnapshot => {
                setMasterData(documentSnapshot.data());
                // console.log(documentSnapshot.data());
        });

        return () => subscriber();
    }, [prop]);

    useEffect(() => {
        if (item.Data.LikeUser) {
            if (item.Data.LikeUser.includes(prop) === true) {
                setIsLiked(true);
            } else if (item.Data.LikeUser.includes(prop) === false) {
                setIsLiked(false);
            }
        }
    }, [item.Data.LikeUser, isLiked]);

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


    return(
        <Container isDark={isDark}
            activeOpacity={0.8} 
            onPress={() => {
                navigation.navigate("MumbleStack", {
                    screen: "Mumble",
                    params: {
                        item: item,
                        prop: prop,
                    },
                });
            }}
        >
            <ProfileContainer>
                {item.Data.ProfileBoolean === false ? <>
                    <ProfileImg source={EmptyImg}/>
                    <Name isDark={isDark}> 익명 Mumble 입니다. </Name>
                </> : <>
                    <ProfileImg source={masterData ? {uri: masterData.profileImgURL} : EmptyImg}/>
                    <Name isDark={isDark}> {masterData.name} </Name>
                </>}
            </ProfileContainer>
            <MumbleContainer>
                <MumbleText isDark={isDark}> {item.Data.Mumble} </MumbleText>
                <LikeBtn>
                    {isLiked ? <>
                        <LikeText isDark={isDark}> {item.Data.LikeUser ? item.Data.LikeUser.length : 0}명이 공감합니다. </LikeText>                    
                        <FontAwesome name="heart" size={20} color={isDark ? "#B00020" : "red"} onPress={toggleLike} />
                    </> : <>
                        <LikeText isDark={isDark}> {item.Data.LikeUser ? item.Data.LikeUser.length : 0}명이 공감합니다. </LikeText>                    
                        <FontAwesome name="heart-o" size={20} color={isDark ? "white" : "black"} onPress={toggleLike} /> 
                    </>}
                </LikeBtn>
            </MumbleContainer>
        </Container>
    )
};

const Container = styled.TouchableOpacity`
    background-color: ${(props) => (props.isDark ? "rgba(9, 93, 158, 0.35)" : "rgba(221, 84, 15, 0.55)")};
    margin-bottom: 10px;
    margin: ${hp(0.8)}px 0px;
    padding: ${hp(2)}px;
    border-radius: 20px;
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

const MumbleContainer = styled.View`
    flex-direction: column;
`;

const MumbleText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    margin: ${hp(1)}px 0px;
    font-size: ${hp(1.5)}px;;
    padding: ${hp(1)}px;
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

export default Mumble; 