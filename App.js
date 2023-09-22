import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import AppRouter from './src/navigations/AppRouter';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const App = () => {
    const [isAuthentication, setIsAuthentication] = useState(false); 
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            if(user) {
                setIsAuthentication(true);
            } else {
                setIsAuthentication(false);
            }
        })
    }, [currentUser]);


	return (
		<AppRouter isAuthentication={isAuthentication}/>
	);
};

export default App; 