import React, { useRef, useState } from "react";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Alert, Switch, useColorScheme } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { REACT_APP_API_KEY } from '@env';
import axios from 'axios';
import Loading from "./Loading";
import { useWriteContext } from "../context/WriteContext";

const WriteOption = () => {
    const isDark = useColorScheme() === 'dark';
    const artistInput = useRef();
    const [music, setMusic] = useState("");
    const [artist, setArtist] = useState("");
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState(false);

    const { data, setData, first, setFirst, second, setSecond } = useWriteContext();

    const firstSwitch = () => setFirst(previousState => !previousState);
    const secondSwitch = () => {
        if(second === true) {
            setSearch(false);
            setData([]);
            setLoading(true);
        }
        setSecond(previousState => !previousState)
    };

    const textKey = '#text';

    const getMealData = async() => {
        setSearch(true);
        if(music && artist) {
            try {
                const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${music}&artist=${artist}&limit=1&api_key=${REACT_APP_API_KEY}&format=json`);
                // console.log('response=>', response.data.results.trackmatches.track[0])
                if (response && response.data.results.trackmatches) {
                    setData(response.data.results.trackmatches.track[0]);
                    setLoading(false);
                    // console.log(data)
                }
            } catch (err) {
                console.log('error: ', err.message);
            }
        } else {
            Alert.alert('노래와 가수명을 기입해주세요.');
            setSearch(false);
        }
    };

    return (
        <Container>
            <OptionFirst>
                <Title isDark={isDark}> 프로필을 공개하시겠습니까? </Title>
                <Switch trackColor={{false: '#767577', true: '#095D9E'}}
                    thumbColor={first ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor="#BDBDBD"
                    onValueChange={firstSwitch}
                    value={first}
                />
            </OptionFirst>
            <OptionSecond>
                <Title isDark={isDark}> 노래를 선택하시겠습니까? </Title>
                <Switch trackColor={{false: '#767577', true: '#095D9E'}}
                    thumbColor={second ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor="#BDBDBD"
                    onValueChange={secondSwitch}
                    value={second}
                />
            </OptionSecond>
            {second === true && 
            <Music>
                <MusicContainer>
                    <MusicSearch isDark={isDark}
                        placeholder="Music Search" 
                        placeholderTextColor={isDark ? "lightgrey" : "grey"}
                        autoCapitalize="none"
                        returnKeyType="next"
                        multiline={false}
                        onSubmitEditing={() => artistInput.current.focus()}
                        onChangeText={(text) => {
                            setMusic(text);
                        }}
                    /> 
                    <Empty />
                    <ArtistSearch isDark={isDark}
                        ref={artistInput}
                        placeholder="Artist Search" 
                        placeholderTextColor={isDark ? "lightgrey" : "grey"}
                        returnKeyType="search"
                        multiline={false}
                        onSubmitEditing={getMealData}
                        onChangeText={(text) => {
                            setArtist(text)
                        }}
                    /> 
                    <SearchBtn onPress={getMealData}>
                        {(music && artist) ? <Ionicons name="md-search-circle-sharp" size={48} color="#095D9E" /> :<Ionicons name="md-search-circle-outline" size={48} color="grey" />}
                    </SearchBtn>
                </MusicContainer>
                {search === true ? <>
                    {loading ? (
                        <Loading size="large" style={{ marginTop: hp(2) }} />
                    ) : (<>
                        {data ? <SearchContiner>
                            <SearchDataBox isDark={isDark}>
                                <RecipeImage source={{ uri : data.image[1][textKey]}} />
                                <Empty />
                                <Title isDark={isDark}> {data.name} </Title>
                                <Title isDark={isDark}> {data.artist} </Title>
                            </SearchDataBox>
                            <Title style={{
                                color: 'grey',
                                fontSize: 12
                            }}> 노래는 검색 시 자동으로 선택됩니다. </Title>
                        </SearchContiner> : <Title isDark={isDark}> 검색 결과가 없습니다. </Title>}
                    </>
                    )}
                </> : null}
            </Music>
            }
        </Container>
    )
};

const SearchContiner =styled.View`
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.View`
    flex: 1;
    padding: ${hp(1)}px ${hp(3.5)}px;
`;

const Title = styled.Text`
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const OptionFirst = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0px;
`;

const OptionSecond = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const Music = styled.View``;

const MusicContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: ${wp(2)}px;
`;

const MusicSearch = styled.TextInput`
    border: solid 1px ${(props) => (props.isDark ? "white" : "black")};
    border-radius: 20px;
    width: ${wp(32)}px;
    padding: ${hp(1)}px ${hp(2)}px;
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const Empty = styled.View`
    width: ${wp(3)}px;
`;

const ArtistSearch = styled.TextInput`
    border: solid 1px ${(props) => (props.isDark ? "white" : "black")};
    border-radius: 20px;
    width: ${wp(32)}px;
    padding: ${hp(1)}px ${hp(2)}px;
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const SearchBtn = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    margin-left: ${wp(2)}px;
`;

const SearchDataBox = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)")};
    padding: ${wp(4)}px;
    border-radius: 15px;
    margin-bottom: ${hp(1)}px;
    width: 100%;
`;

const RecipeImage = styled.Image`
    width: ${hp(6)}px;
    height: ${hp(6)}px;
    border-radius: 999px;
`;

export default WriteOption;