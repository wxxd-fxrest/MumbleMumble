import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import EmptyImg from "../../src/assets/Mumble.png";
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const MumbleScreen = ({ route: {params} }) => {
    const navigation = useNavigation();
    const isDark = useColorScheme() === 'dark';
    const [isLiked, setIsLiked] = useState(false);

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    return (
        <Container>
            <ProfileContainer>
                <ProfileImg source={params.Data.masterImage ? {uri: params.Data.masterImage} : EmptyImg}/>
                {params.Data.masterName === false ? <Name isDark={isDark}> 익명 </Name> : <Name isDark={isDark}> {params.Data.masterName} </Name>}
                <DeleteBtn>
                    <MaterialCommunityIcons name="delete-alert-outline" color={isDark ? 'white' : 'black'} size={26} />
                </DeleteBtn>
            </ProfileContainer>
            <MumbleContainer>
                <MumbleText isDark={isDark}> {params.Data.Mumble} </MumbleText>
                <LikeBtn>
                    {isLiked ? <>
                        <LikeText isDark={isDark}> 0명이 공감합니다. </LikeText>                    
                        <FontAwesome name="heart" size={20} color={isDark ? "#B00020" : "red"} onPress={toggleLike} />
                    </> : <>
                        <LikeText isDark={isDark}> 12명이 공감합니다. </LikeText>                    
                        <FontAwesome name="heart-o" size={20} color={isDark ? "white" : "black"} onPress={toggleLike} /> 
                    </>}
                </LikeBtn>
            </MumbleContainer>
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
`;

const MumbleText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    margin: ${hp(1)}px 0px;
    font-size: ${hp(1.5)}px;;
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

export default MumbleScreen;