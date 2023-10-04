import React, { useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { WriteProvider } from '../context/WriteContext';
import { CurrentProvider } from '../context/CurrentContext';
import Root from './Root';
import AuthRoot from './AuthRoot';

const Stack = createNativeStackNavigator();

const AppRouter = ({isAuthentication}) => {
	useEffect(() => {}, [isAuthentication]);
	
	return (
		<CurrentProvider>
			<WriteProvider>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{headerShown: false}}>
						{isAuthentication ? 
							<Stack.Screen name='Home' component={Root} /> 
						:
							<Stack.Screen name='Auth' component={AuthRoot} />
						}
					</Stack.Navigator>
				</NavigationContainer>
			</WriteProvider>
		</CurrentProvider>
	);
};

export default AppRouter; 