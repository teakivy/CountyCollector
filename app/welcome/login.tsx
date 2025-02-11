import BackButton from '@/components/BackButton';
import Input from '@/components/Input';
import RoundedButton from '@/components/RoundedButton';
import AuthManager from '@/core/AuthManager';
import { getTheme } from '@/core/themes/ThemeProvider';
import { filterValidCharacters } from '@/core/utils';
import { router } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
	const theme = getTheme();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const usernameRef = useRef<TextInput>(null);
	const passwordRef = useRef<TextInput>(null);

	useEffect(() => {
		setTimeout(() => {
			usernameRef.current?.focus();
		}, 100);
	}, []);

	return (
		<View style={styles.container}>
			<SafeAreaView>
				<View style={styles.backButton}>
					<BackButton color={theme.ui.primaryColor} />
				</View>
				<Text style={styles.createText}>Login</Text>
				<Input
					ref={usernameRef}
					value={username}
					onChangeText={(u) => {
						setUsername(
							filterValidCharacters(
								u.toLowerCase(),
								new Set('abcdefghijklmnopqrstuvwxyz0123456789_.-@')
							)
						);
					}}
					disableAutoCorrect
					autoCapitalize='none'
					placeholder='Email / Username'
					autoComplete='off'
					textColor={theme.ui.textColor}
					focusedOutlineColor={theme.ui.primaryColor}
					outlineColor={theme.ui.darkSecondaryTextColor}
					returnKeyType='next'
					onSubmitEditing={() => {
						passwordRef.current?.focus(); // Focus email input
					}}
				/>
				<Input
					ref={passwordRef}
					value={password}
					onChangeText={(u) => {
						setPassword(u);
					}}
					disableAutoCorrect
					autoCapitalize='none'
					placeholder='Password'
					autoComplete='password'
					textColor={theme.ui.textColor}
					focusedOutlineColor={theme.ui.primaryColor}
					outlineColor={theme.ui.darkSecondaryTextColor}
					secureTextEntry={true}
					returnKeyType='done'
					onSubmitEditing={() => {
						passwordRef.current?.blur(); // Focus confirm password input
					}}
				/>

				<View style={styles.forgotPasswordContainer}>
					<TouchableOpacity
						onPress={() => {
							router.push('/welcome/forgotpassword');
						}}
					>
						<Text style={styles.forgotPassword}>Forgot password?</Text>
					</TouchableOpacity>
				</View>

				<RoundedButton
					title='Login'
					onPress={async () => {
						let user = await AuthManager.handleLogin(username, password);
						if (user) {
							router.replace('/(tabs)');
						} else {
							Alert.alert('Login failed', 'Invalid username or password');
						}
					}}
					backgroundColor='white'
					textColor='black'
					disabled={!username || !password}
				/>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: getTheme().ui.backgroundColor,
		gap: 20,
	},
	createText: {
		color: 'white',
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 30,
		marginTop: 20,
	},
	backButton: {
		position: 'absolute',
		top: 40,
	},
	forgotPasswordContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		alignContent: 'center',
		top: -15,
		left: 5,
	},
	forgotPassword: {
		color: getTheme().ui.primaryColor,
		fontSize: 16,
		fontWeight: '500',
	},
});
