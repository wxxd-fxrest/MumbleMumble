import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, useColorScheme } from "react-native";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import firestore from '@react-native-firebase/firestore';
import CurrentMumble from "../../components/CurrentMumble";
    
const ProfileScreen = ({ route }) => {
    const { prop } = route.params;
    const navigation = useNavigation();
    const isDark = useColorScheme() === 'dark';
    const [currentMumble, setCurrentMumble] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Mumbles')
            .where("masterEmail", "==", `${prop}`)
            .onSnapshot(documentSnapshot => {
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
    }, [prop]);

    return (
        <Container> 
            <FlatList data={currentMumble}
                keyExtractor={(item) => item.DocID + ""}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <CurrentMumble item={item}/>
                )} 
            />
        </Container>
    )
};

const Container = styled.View`
    flex: 1;
    padding: ${hp(2)}px;
`;

const Title = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
`;




export default ProfileScreen;