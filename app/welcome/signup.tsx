import BackButton from '@/components/BackButton';
import Input from '@/components/Input';
import RoundedButton from '@/components/RoundedButton';
import DatabaseManager from '@/core/DatabaseManager';
import { getTheme } from '@/core/themes/ThemeProvider';
import { filterValidCharacters, isValidEmail } from '@/core/utils';
import { router } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signup() {
	const theme = getTheme();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [emailValid, setEmailValid] = useState(false);
	const [passwordValid, setPasswordValid] = useState(false);
	const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

	const emailRef = useRef<TextInput>(null);
	const passwordRef = useRef<TextInput>(null);
	const confirmPasswordRef = useRef<TextInput>(null);

	useEffect(() => {
		setTimeout(() => {
			emailRef.current?.focus();
		}, 100);
	}, []);

	return (
		<View style={styles.container}>
			<SafeAreaView>
				<View style={styles.backButton}>
					<BackButton color={theme.ui.primaryColor} />
				</View>
				<Text style={styles.createText}>Create your account</Text>

				<Input
					ref={emailRef}
					value={email}
					onChangeText={(u) => {
						setEmail(
							filterValidCharacters(
								u.toLowerCase(),
								new Set('abcdefghijklmnopqrstuvwxyz0123456789_.-@')
							)
						);
					}}
					disableAutoCorrect
					autoCapitalize='none'
					placeholder='Email'
					autoComplete='email'
					textColor={theme.ui.textColor}
					focusedOutlineColor={theme.ui.primaryColor}
					outlineColor={theme.ui.darkSecondaryTextColor}
					keyboardType='email-address'
					validate={async (text) => {
						if (!text) {
							setEmailValid(false);
							return null;
						}
						if (!isValidEmail(text)) {
							setEmailValid(false);
							return 'Invalid email address';
						}

						if (await DatabaseManager.doesEmailExist(text)) {
							setEmailValid(false);
							return 'Email already in use';
						} else {
							setEmailValid(true);
							return null;
						}
					}}
					returnKeyType='next'
					onSubmitEditing={() => {
						passwordRef.current?.focus(); // Focus password input
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
					validate={async (text) => {
						if (!text) {
							setPasswordValid(false);
							return null;
						}
						if (text.length < 8) {
							setPasswordValid(false);
							return 'Password must be at least 8 characters long';
						}
						setPasswordValid(true);
						return null;
					}}
					returnKeyType='next'
					onSubmitEditing={() => {
						confirmPasswordRef.current?.focus(); // Focus confirm password input
					}}
				/>

				<Input
					ref={confirmPasswordRef}
					value={confirmPassword}
					onChangeText={(u) => {
						setConfirmPassword(u);
					}}
					disableAutoCorrect
					autoCapitalize='none'
					placeholder='Confirm Password'
					autoComplete='password'
					textColor={theme.ui.textColor}
					focusedOutlineColor={theme.ui.primaryColor}
					outlineColor={theme.ui.darkSecondaryTextColor}
					secureTextEntry={true}
					validate={(text) => {
						if (!text) {
							setConfirmPasswordValid(false);
							return null;
						}
						if (text !== password && password) {
							setConfirmPasswordValid(false);
							return 'Passwords do not match';
						}
						setConfirmPasswordValid(true);
						return null;
					}}
					returnKeyType='done'
					onSubmitEditing={() => {
						confirmPasswordRef.current?.blur(); // Clear focus
					}}
				/>

				<RoundedButton
					title='Continue'
					onPress={() => {
						router.push(
							`/welcome/setupProfile?email=${encodeURIComponent(
								email
							)}&password=${encodeURIComponent(password)}`
						);
					}}
					backgroundColor='white'
					textColor='black'
					disabled={!emailValid || !passwordValid || !confirmPasswordValid}
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
