import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import Ionicons from '@expo/vector-icons/Ionicons';
import { getTheme } from '@/core/themes/ThemeProvider';

export default function TabLayout() {
	const theme = getTheme();
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarStyle: Platform.select({
					default: {
						backgroundColor: theme.ui.darkerBackgroundColor,
					},
				}),
				tabBarIconStyle: {
					marginTop: 7,
				},
			}}
		>
			<Tabs.Screen
				name='home'
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => (
						<Ionicons size={28} name='home' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='search'
				options={{
					title: 'Search',
					tabBarIcon: ({ color }) => (
						<Ionicons size={28} name='search' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='map'
				options={{
					title: 'Map',
					tabBarIcon: ({ color }) => (
						<Ionicons size={28} name='map' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='you'
				options={{
					title: 'You',
					tabBarIcon: ({ color }) => (
						<Ionicons size={28} name='person-circle' color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
