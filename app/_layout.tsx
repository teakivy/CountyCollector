import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import AuthManager from '@/core/AuthManager';
import { onAuthStateChanged } from 'firebase/auth';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();

			// Check if user is logged in

			onAuthStateChanged(AuthManager.getAuth(), (user) => {
				if (user) {
					setIsLoggedIn(true);
					router.replace('/(tabs)');
				} else {
					setIsLoggedIn(false);
					router.replace('/welcome/welcome');
				}
			});
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider value={DarkTheme}>
			<Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
				<Stack.Screen name='+not-found' />
				<Stack.Screen name='welcome/welcome' options={{ headerShown: false }} />
				<Stack.Screen name='welcome/signup' options={{ headerShown: false }} />
				<Stack.Screen
					name='welcome/setupProfile'
					options={{ headerShown: false }}
				/>
				<Stack.Screen name='welcome/login' options={{ headerShown: false }} />
				<Stack.Screen
					name='welcome/forgotpassword'
					options={{ headerShown: false }}
				/>
			</Stack>
			<StatusBar style='auto' />
		</ThemeProvider>
	);
}
