import React, { useState } from "react";
import styled from "styled-components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Switch, useColorScheme } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { REACT_APP_API_KEY } from '@env';
import axios from 'axios';
import Loading from "./Loading";
import { useWriteContext } from "../context/WriteContext";

const WriteOption = () => {
    const isDark = useColorScheme() === 'dark';
    const [music, setMusic] = useState("");
    const [artist, setArtist] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [search, setSearch] = useState(false);

    const firstSwitch = () => setFirst(previousState => !previousState);
    const secondSwitch = () => setSecond(previousState => !previousState);
  
    const { write, setWrite, mumble, setMumble } = useWriteContext();
    // console.log(mumble)

    const textKey = '#text';

    const getMealData = async() => {
        setSearch(true);
        try {
            const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${music}&artist=${artist}&limit=1&api_key=${REACT_APP_API_KEY}&format=json`);
            // console.log('response=>', response.data.results.trackmatches)
            if (response && response.data.results.trackmatches) {
                setData(response.data.results.trackmatches);
                setLoading(false);
                console.log(data)
            }
        } catch (err) {
            console.log('error: ', err.message);
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
            {second === true && <MusicContainer>
                <MusicSearch isDark={isDark}
                    placeholder="Music Search" 
                    placeholderTextColor={isDark ? "lightgrey" : "grey"}
                    returnKeyType="search"
                    multiline={true}
                    onChangeText={(text) => {
                        setMusic(text)
                    }}
                /> 
                <Empty />
                <ArtistSearch isDark={isDark}
                    placeholder="Artist Search" 
                    placeholderTextColor={isDark ? "lightgrey" : "grey"}
                    returnKeyType="search"
                    multiline={true}
                    onChangeText={(text) => {
                        setArtist(text)
                    }}
                /> 
                <SearchBtn onPress={getMealData}>
                    {(music && artist) ? <Ionicons name="md-search-circle-sharp" size={48} color="#095D9E" /> :<Ionicons name="md-search-circle-outline" size={48} color="grey" />}
                </SearchBtn>
            </MusicContainer>}
            {search === true && <>
                {loading ? (
                    <Loading size="large" style={{ marginTop: hp(2) }} />
                ) : (<>
                    {data.track[0] ? 
                        <SearchDataBox isDark={isDark}>
                            <RecipeImage source={{ uri : data.track[0].image[1][textKey]}} />
                            <Empty />
                            <Title isDark={isDark}> {data.track[0].name} </Title>
                            <Title isDark={isDark}> {data.track[0].artist} </Title>
                        </SearchDataBox>
                    : <Title isDark={isDark}> 검색 결과가 없습니다. </Title>}
                </>)}
            </>}
        </Container>
    )
};

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
    /* background-color: yellowgreen; */
    margin: 20px 0px;
`;

const OptionSecond = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* background-color: yellowgreen; */
    margin-bottom: 10px;
`;

const MusicContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: ${wp(2)}px;
`;

const MusicSearch = styled.TextInput`
    /* background-color: yellowgreen; */
    border: solid 1px ${(props) => (props.isDark ? "white" : "black")};
    border-radius: 20px;
    width: ${wp(32)}px;
    /* height: ${hp(4)}px; */
    padding: ${hp(1)}px ${hp(2)}px;
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const Empty = styled.View`
    width: ${wp(3)}px;
`;

const ArtistSearch = styled.TextInput`
    /* background-color: yellowgreen; */
    border: solid 1px ${(props) => (props.isDark ? "white" : "black")};
    border-radius: 20px;
    width: ${wp(32)}px;
    /* width: 45%; */
    /* height: ${hp(4)}px; */
    padding: ${hp(1)}px ${hp(2)}px;
    color: ${(props) => (props.isDark ? "white" : "black")};
`;

const SearchBtn = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    margin-left: ${wp(2)}px;
`;

const SearchDataBox = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: ${(props) => (props.isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)")};
    padding: ${wp(4)}px;
    border-radius: 15px;
`;

const RecipeImage = styled.Image`
    width: ${hp(6)}px;
    height: ${hp(6)}px;
    border-radius: 999px;
`;

export default WriteOption;