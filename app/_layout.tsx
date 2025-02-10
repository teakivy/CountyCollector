import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import AuthManager from '@/core/AuthManager';
import Welcome from './welcome/welcome';

import SignUp from './welcome/signup';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();

			// Check if user is logged in
			setIsLoggedIn(AuthManager.isLoggedIn());
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider value={DarkTheme}>
			{isLoggedIn ? (
				<Stack>
					<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
					<Stack.Screen name='+not-found' />
				</Stack>
			) : (
				<SignUp />
			)}
			<StatusBar style='auto' />
		</ThemeProvider>
	);
}
