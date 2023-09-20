import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import Root from './Root';
import AuthRoot from './AuthRoot';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Stack = createNativeStackNavigator();

const AppRouter = ({isAuthentication}) => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown: false}}>
				{isAuthentication ? 
					<Stack.Screen name='Home' component={Root} /> 
				:
					<Stack.Screen name='Auth' component={AuthRoot} />
				}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppRouter; 