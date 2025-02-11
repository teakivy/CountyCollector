import BackButton from '@/components/BackButton';
import Input from '@/components/Input';
import RoundedButton from '@/components/RoundedButton';
import AuthManager from '@/core/AuthManager';
import DatabaseManager from '@/core/DatabaseManager';
import { getTheme } from '@/core/themes/ThemeProvider';
import { filterValidCharacters, isValidEmail } from '@/core/utils';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signup() {
	const theme = getTheme();
	const [username, setUsername] = useState('');
	const [displayName, setDisplayName] = useState('');

	const [usernameValid, setUsernameValid] = useState(false);
	const [displayNameValid, setDisplayNameValid] = useState(false);

	const usernameRef = useRef<TextInput>(null);
	const displayNameRef = useRef<TextInput>(null);

	const { email, password }: { email: string; password: string } =
		useLocalSearchParams();

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
				<Text style={styles.createText}>Create your Profile</Text>
				<Input
					ref={usernameRef}
					value={username}
					onChangeText={(u) => {
						setUsername(
							filterValidCharacters(
								u.toLowerCase(),
								new Set('abcdefghijklmnopqrstuvwxyz0123456789_.-')
							)
						);
					}}
					disableAutoCorrect
					autoCapitalize='none'
					placeholder='Username'
					autoComplete='off'
					textColor={theme.ui.textColor}
					focusedOutlineColor={theme.ui.primaryColor}
					outlineColor={theme.ui.darkSecondaryTextColor}
					validate={async (text) => {
						if (!text) {
							setUsernameValid(false);
							return null;
						}
						if (text.length < 3) {
							setUsernameValid(false);
							return 'Username must be at least 3 characters long';
						}
						if (text.length > 16) {
							setUsernameValid(false);
							return 'Username must be at most 16 characters long';
						}
						if (await DatabaseManager.doesUsernameExist(text)) {
							setUsernameValid(false);
							return 'Username already in use';
						} else {
							setUsernameValid(true);
							return null;
						}
					}}
					returnKeyType='next'
					onSubmitEditing={() => {
						displayNameRef.current?.focus(); // Focus email input
					}}
				/>
				<Input
					ref={displayNameRef}
					value={displayName}
					onChangeText={(u) => {
						setDisplayName(
							filterValidCharacters(
								u,
								new Set(
									'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_\',:;({[<>]}).+=\\/*%&^!?|~`"- ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝŸàáâãäåæçèéêëìíîïñòóôõöøùúûüýÿ'
								)
							)
						);
					}}
					disableAutoCorrect
					autoCapitalize='none'
					placeholder='Display Name'
					autoComplete='off'
					textColor={theme.ui.textColor}
					focusedOutlineColor={theme.ui.primaryColor}
					outlineColor={theme.ui.darkSecondaryTextColor}
					validate={async (text) => {
						if (!text) {
							setDisplayNameValid(false);
							return null;
						}
						if (text.length < 2) {
							setDisplayNameValid(false);
							return 'Display Name must be at least 2 characters long';
						}
						if (text.length > 50) {
							setDisplayNameValid(false);
							return 'Display Name must be at most 50 characters long';
						}
						setDisplayNameValid(true);
						return null;
					}}
					returnKeyType='done'
					onSubmitEditing={() => {
						displayNameRef.current?.blur(); // Focus password input
					}}
				/>

				<RoundedButton
					title='Sign Up'
					onPress={async () => {
						let user = AuthManager.signUp({
							email,
							password,
							username,
							displayName,
							accountType: 'email',
						});
						if (user != null) {
							router.replace('/(tabs)');
						}
					}}
					backgroundColor='white'
					textColor='black'
					disabled={!usernameValid || !displayNameValid}
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
});
