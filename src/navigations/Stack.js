import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";
import Write from "../components/Write";
import { Ionicons } from '@expo/vector-icons'; 
import styled from "styled-components";
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";
import WriteOption from "../components/WriteOption";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useWriteContext } from "../context/WriteContext";
import firestore from '@react-native-firebase/firestore';
import { useCurrentContext } from "../context/CurrentContext";
import Setup from "../components/Setup";

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
                masterName: first === true && currentUser.name,
                masterImage: first === true && (currentUser.image ? currentUser.image : ''),
                orderBy: new Date(),
            });
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
                initialParams={{ prop1: prop }}
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
                initialParams={{ prop1: prop }}
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
                initialParams={{ prop1: prop }}
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