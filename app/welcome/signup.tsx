import Input from '@/components/Input';
import RoundedButton from '@/components/RoundedButton';
import DatabaseManager from '@/core/DatabaseManager';
import { filterValidCharacters, isValidEmail } from '@/core/utils';
import React, { useState, useRef } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signup() {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [usernameValid, setUsernameValid] = useState(false);
	const [emailValid, setEmailValid] = useState(false);
	const [passwordValid, setPasswordValid] = useState(false);
	const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

	const emailRef = useRef<TextInput>(null);
	const passwordRef = useRef<TextInput>(null);
	const confirmPasswordRef = useRef<TextInput>(null);

	return (
		<View style={styles.container}>
			<SafeAreaView>
				<Text style={styles.createText}>Create your account</Text>
				<Input
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
					textColor='white'
					outlineColor='gray'
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
						emailRef.current?.focus(); // Focus email input
					}}
				/>
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
					textColor='white'
					outlineColor='gray'
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
					textColor='white'
					outlineColor='gray'
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
					textColor='white'
					outlineColor='gray'
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
					title='Sign Up'
					onPress={() => {}}
					backgroundColor='white'
					textColor='black'
					disabled={
						!usernameValid ||
						!emailValid ||
						!passwordValid ||
						!confirmPasswordValid
					}
				/>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#1a1a1a',
		gap: 20,
	},
	createText: {
		color: 'white',
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 30,
		marginTop: 20,
	},
});
