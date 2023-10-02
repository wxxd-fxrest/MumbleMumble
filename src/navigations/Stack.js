import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { useWriteContext } from "../context/WriteContext";
import { useCurrentContext } from "../context/CurrentContext";
import Write from "../components/Write";
import WriteOption from "../components/WriteOption";
import Setup from "../components/Setup";
import styled from "styled-components";
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const NativeStack = createNativeStackNavigator();

const Stack = ({ route }) => {
    const { prop } = route.params;
    const navigation = useNavigation();
    const isDark = useColorScheme() === 'dark';

    const { 
        write, mumble, data, first, second, 
        setWrite, setMumble, setData, setFirst, setSecond 
    } = useWriteContext();
    
    const { currentUser, setCurrentUser } = useCurrentContext();

    useEffect(() => {
        const subscriber = firestore().collection('Users').doc(`${prop}`)
            .onSnapshot(documentSnapshot => {
                setCurrentUser(documentSnapshot.data());
                // console.log(currentUser)
        });
        return () => subscriber();
    }, [prop]);

    const onSaveMumble = async() => {
        await firestore().collection('Mumbles').add({
            Mumble: mumble, 
            ProfileBoolean: first,
            MusicBoolean: second, 
            Music: data,
            masterEmail: currentUser.email,
            // masterName: first === true && currentUser.name,
            // masterImage: first === true && (currentUser.image ? currentUser.image : ''),
            orderBy: new Date(),
            LikeUser: [],
        });
        await firestore().collection('Users').doc(`${prop}`).update({
            mumbleCount: currentUser.mumbleCount + 1,
        })
        Cancle();
    };

    const Cancle = () => {
        navigation.goBack();
        setWrite(false);
        setMumble("");
        setData([]);
        setFirst(false);
        setSecond(false);
    };

    return (
        <NativeStack.Navigator 
            screenOptions={{
                headerStyle: {
                    backgroundColor: isDark ? 'black' : 'white',
                },
                headerTitleStyle: {
                    color: isDark ? 'white' : 'black',
                },
                contentStyle: {
                    backgroundColor: isDark ? 'black' : 'white',
                },

            }}>
            <NativeStack.Screen name="Write" component={Write}
                options={{
                    title: '',
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <SetupButton onPress={() => Cancle()}>
                            <Ionicons name="chevron-back" size={26} color={isDark ? 'white' : 'black'} />
                        </SetupButton>
                    ),
                    headerRight: () => (
                        <SetupButton onPress={() => {
                            if(write === true) {
                                navigation.navigate('Stack', {
                                    screen: 'selectOption'
                                })
                            }
                        }}>
                            <MaterialCommunityIcons name="page-next-outline" size={26} 
                                color={
                                    isDark ? write === true ? "white" : "rgba(255, 255, 255, 0.5)" 
                                : 
                                    write === true ? "black" : "rgba(0, 0, 0, 0.5)"
                                } 
                            />
                        </SetupButton>
                    )
                }}
            />

            <NativeStack.Screen name="selectOption" component={WriteOption}
                options={{
                    title: '',
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <SetupButton onPress={() => Cancle()}>
                            <Ionicons name="chevron-back" size={26} color={isDark ? 'white' : 'black'} />
                        </SetupButton>
                    ),
                    headerRight: () => (
                        <SetupButton onPress={() => onSaveMumble()}>
                            <FontAwesome name="send-o" color={isDark ? 'white' : 'black'} size={22} />
                        </SetupButton>
                    )
                }}
            />

            <NativeStack.Screen name="Setup" component={Setup}
                initialParams={{ prop: prop }}
                options={{
                    title: '설정',
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <SetupButton onPress={() => Cancle()}>
                            <Ionicons name="chevron-back" size={26} color={isDark ? 'white' : 'black'} />
                        </SetupButton>
                    ),
                }}
            />
        </NativeStack.Navigator>
    )
};

const SetupButton = styled.TouchableOpacity``;


export default Stack; 