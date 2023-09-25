import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FlatList, useColorScheme } from "react-native";
import firestore from '@react-native-firebase/firestore';
import Mumble from "../../components/Mumble";
import { useNavigation } from "@react-navigation/native";

const MainScreen = () => {
    const isDark = useColorScheme() === 'dark';
    const navigation = useNavigation();
    const [mumbleData, setMumbleData] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Mumbles').orderBy('orderBy', 'desc').onSnapshot(documentSnapshot => {
                let feedArray = []
                documentSnapshot.forEach((doc) => {
                    feedArray.push({
                        DocID: doc.id, 
                        Data: doc.data(),
                    })
                    setMumbleData(feedArray);
                });
            });

        return () => subscriber();
    }, []);

    return (
        <Container> 
            <FlatList data={mumbleData}
                keyExtractor={(item) => item.DocID + ""}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <Mumble item={item}/>
                )} 
            />
        </Container>
    )
};

const Container = styled.View`
    flex: 1;
    padding: 0px ${hp(1)}px;
`;

const Title = styled.TouchableOpacity`
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

export default MainScreen;