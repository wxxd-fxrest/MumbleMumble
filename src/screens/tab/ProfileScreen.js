import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, useColorScheme } from "react-native";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import firestore from '@react-native-firebase/firestore';
import CurrentMumble from "../../components/CurrentMumble";
import EmptyImg from "../../../src/assets/Mumble.png";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const ProfileScreen = ({ route }) => {
    const { prop } = route.params;
    // const { prop } = route.params;
    const navigation = useNavigation();
    const isDark = useColorScheme() === 'dark';
    const [currentMumble, setCurrentMumble] = useState([]);
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        const subscriber = firestore().collection('Users').doc(`${prop}`)
            .onSnapshot(documentSnapshot => {
                setCurrentData(documentSnapshot.data());
                // console.log(currentData.mumbleCount)
        });

        return () => subscriber();
    }, [prop]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Mumbles').orderBy('orderBy', 'desc').onSnapshot(documentSnapshot => {
                let feedArray = []
                documentSnapshot.forEach((doc) => {
                    feedArray.push({
                        DocID: doc.id, 
                        Data: doc.data(),
                    })
                    setCurrentMumble(feedArray);
                });
            });

        return () => subscriber();
    }, [prop, currentData]);


    return (
        <Container> 
           <ProfileContainer>
                {/* <ProfileImg source={item.Data.masterImage ? {uri: item.Data.masterImage} : EmptyImg}/> */}
                <ProfileBox>
                    <ProfileImg source={EmptyImg}/>
                    <EditBtn isDark={isDark}
                        activeOpacity={0.8} 
                    >
                        <MaterialCommunityIcons name="circle-edit-outline" size={22} color={isDark ? "white" : "black"} />
                    </EditBtn>
                </ProfileBox>
                <MumbleCountBox>
                    <MumbleCount isDark={isDark}> {currentData.mumbleCount} </MumbleCount>
                    <CountText isDark={isDark}> Mumble </CountText>
                </MumbleCountBox>
                {/* <Name isDark={isDark}> {currentData.name} </Name> */}
            </ProfileContainer>
            <FlatList data={currentMumble}
                keyExtractor={(item) => item.DocID + ""}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <CurrentMumble item={item} prop={prop}/>
                )} 
            />
        </Container>
    )
};

const Container = styled.View`
    flex: 1;
    padding: 0px ${hp(1)}px;
`;

const ProfileContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${hp(1.5)}px ${hp(3)}px;
`;

const ProfileBox = styled.View``;

const ProfileImg = styled.Image`
    width: ${wp(25)}px;
    height: ${wp(25)}px;
    border-radius: 40px;
    margin-right: ${wp(3.5)}px;
`;

const EditBtn = styled.TouchableOpacity`
    position: absolute;
    right: ${wp(1)}px;
    bottom: -${hp(0.5)}px;
    background-color: ${(props) => (props.isDark ? "rgb(9, 93, 158)" : "rgb(166, 204, 237)")};
    border-radius: 999px;
    padding: ${wp(1)}px;
    border-width: 2px;
    border-color: ${(props) => (props.isDark ? "black" : "white")};
`;

const MumbleCountBox = styled.View`
    align-items: center;
    margin-right: ${wp(3)}px;;
`;

const MumbleCount = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    font-size: ${hp(2)}px;
    font-weight: 500;
`;

const CountText = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    font-size: ${hp(1.3)}px;
`;

const Name = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
    font-size: ${hp(2)}px;
    font-weight: bold;
`;

export default ProfileScreen;