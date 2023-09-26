import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, useColorScheme, View } from "react-native";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import firestore from '@react-native-firebase/firestore';
import CurrentMumble from "../../components/CurrentMumble";
import EmptyImg from "../../../src/assets/Mumble.png";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import * as ImagePicker from 'expo-image-picker';
import storage from '@react-native-firebase/storage';
import { LayoutAnimation } from "react-native";
import { Image } from "react-native-svg";

const ProfileScreen = ({ route }) => {
    const { prop } = route.params;
    const navigation = useNavigation();
    const isDark = useColorScheme() === 'dark';
    const [currentMumble, setCurrentMumble] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [edit, setEdit] = useState(false);

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [saveImgUrl, setSaveImgUrl] = useState('');

    const onEdit = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        setEdit(!edit);
    };

    useEffect(() => {
        const subscriber = firestore().collection('Users').doc(`${prop}`)
            .onSnapshot(documentSnapshot => {
                setCurrentData(documentSnapshot.data());
                // console.log(currentData.profileImgURL);
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

    useEffect(() => {
        const uploadImage = async () => {
            if (!imageUrl) return;
        
            // 이미지 업로드 로직
            setLoading(true);
            try {
                const asset = imageUrl.assets[0];
                const reference = storage().ref(`/profile/${asset.fileName}`);
                await reference.putFile(asset.uri);
                const IMG_URL = await reference.getDownloadURL();
                // console.log('IMG_URL', IMG_URL);
                setSaveImgUrl(IMG_URL);
                setLoading(false);
                if(saveImgUrl) {
                    Image.getSize(saveImgUrl, (w, h) => {
                        setHeight(h * (width / w));
                    });
                }
            } catch (e) {
                console.error(e);
                setLoading(false);
            }
        };
      
        uploadImage(); // 이미지 업로드 실행
    }, [imageUrl]); // imageUrl이 변경될 때마다 실행
      
    const handleImagePick = async () => {
        if (!status?.granted) {
            const permission = await requestPermission();
            if (!permission.granted) {
                // 권한이 거부된 경우에 대한 처리 로직
                console.log("권한이 거부되었습니다.");
                return;
            }
        }

        // 이미지 선택 로직
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
            aspect: [1, 1],
        });
      
        // console.log('result', result);
        setImageUrl(result);
    };         

    const onImgEdit = async() => {
        if(imageUrl) {
            await firestore().collection('Users').doc(`${prop}`).update({
                profileImgURL: saveImgUrl,
            });
        }
        if(text) {
            await firestore().collection('Users').doc(`${prop}`).update({
                name: text ? text : currentData.name,
            });
        }
        onEdit();
    };

    return (
        <Container> 
            {!edit ? 
                <ProfileContainer>
                    <ProfileBox>
                        <ProfileImg source={currentData ? {uri: currentData.profileImgURL} : EmptyImg}/>
                    </ProfileBox>
                    <MumbleCountBox>
                        <MumbleCount isDark={isDark}> {currentData.mumbleCount} </MumbleCount>
                        <CountText isDark={isDark}> Mumble </CountText>
                    </MumbleCountBox>
                        <EditGoBtn isDark={isDark}
                            activeOpacity={0.8} 
                            onPress={() => setEdit(!edit)}
                        >
                        <MaterialCommunityIcons name="circle-edit-outline" size={22} color={isDark ? "white" : "black"} />
                        <EditText isDark={isDark}> 수정 </EditText>
                    </EditGoBtn>
                </ProfileContainer> 
            :
                <ProfileContainer>
                    <CancleBtn onPress={onEdit}>
                        <CancleIcon name="x" size={24} color={isDark ? "white" : "black"}  />
                    </CancleBtn>
                    <ProfileBox>
                        {loading === true && <ActivityIndicator isDark={isDark} color={isDark ? "white" : "black"}/>}
                        <ProfileImg source={saveImgUrl ? {uri: saveImgUrl} :  currentData ? {uri: currentData.profileImgURL} : EmptyImg}/>
                        <EditBtn isDark={isDark}
                            activeOpacity={0.8} 
                            onPress={handleImagePick}
                        >
                            <MaterialCommunityIcons name="circle-edit-outline" size={22} color={isDark ? "white" : "black"} />
                        </EditBtn>
                    </ProfileBox>
                    <ProfileNameInput
                        placeholder= {currentData ? currentData.name : text}
                        placeholderTextColor="grey"
                        autoCapitalize="none"
                        autoCorrect={false}
                        maxLength={10}
                        returnKeyType="done"
                        onChangeText={(text) => setText(text)}
                    /> 
                    <SaveBtn onPress={onImgEdit}>
                        <SaveText isDark={isDark}> 저장 </SaveText>
                    </SaveBtn>
                </ProfileContainer>
            }
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

const EditGoBtn = styled.TouchableOpacity`
    background-color: ${(props) => (props.isDark ? "rgba(9, 93, 158, 0.6)" : "rgba(221, 84, 15, 0.55)")};
    border-radius: 20px;
    padding: ${wp(1)}px;
    flex-direction: row;
    align-items: center;
`;

const EditText = styled.Text`
    font-size: ${hp(1.3)}px;
    font-weight: 300;
    margin-left: 3px;
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const EditBtn = styled.TouchableOpacity`
    position: absolute;
    right: ${wp(1)}px;
    bottom: -${hp(0.5)}px;
    background-color: ${(props) => (props.isDark ? "rgb(9, 93, 158)" : "rgb(221, 84, 15)")};
    border-radius: 999px;
    padding: ${wp(1)}px;
    border-width: 2px;
    border-color: ${(props) => (props.isDark ? "black" : "white")};
`;

const CancleBtn = styled.TouchableOpacity`
    flex: 0.15;
    height: 100%;
`;

const CancleIcon = styled(Feather)`
    position: absolute;
    left: 0px;
`;

const SaveBtn = styled.TouchableOpacity`
    flex: 0.15;
    height: 100%;
`;

const SaveText = styled.Text`
    position: absolute;
    right: 0px;
    color: ${(props) => (props.isDark ? "white" : "black")};
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

const ProfileNameInput = styled.TextInput`
    border-bottom-color: ${(props) => (props.isDark ? "black" : "white")};
    border-bottom-width: 1px;
    padding: 10px 3px;
    font-size: 16px;
    color: ${(props) => (props.isDark ? "white" : "black")};
 `;

export default ProfileScreen;