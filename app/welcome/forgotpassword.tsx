import BackButton from '@/components/BackButton';
import Input from '@/components/Input';
import RoundedButton from '@/components/RoundedButton';
import AuthManager from '@/core/AuthManager';
import { getTheme } from '@/core/themes/ThemeProvider';
import { filterValidCharacters, isValidEmail } from '@/core/utils';
import { router } from 'expo-router';
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
	const theme = getTheme();
	const [email, setEmail] = useState('');
	const [emailValid, setEmailValid] = useState(false);

	const emailRef = useRef<TextInput>(null);

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
				<Text style={styles.createText}>Forgot Password?</Text>
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
					autoComplete='off'
					textColor={theme.ui.textColor}
					focusedOutlineColor={theme.ui.primaryColor}
					outlineColor={theme.ui.darkSecondaryTextColor}
					returnKeyType='done'
					onSubmitEditing={() => {
						emailRef.current?.blur(); // Focus email input
					}}
					validate={(text) => {
						if (!text) {
							setEmailValid(false);
							return null;
						}
						if (!isValidEmail(text)) {
							setEmailValid(false);
							return 'Invalid email address';
						}
						setEmailValid(true);
						return null;
					}}
				/>

				<RoundedButton
					title='Continue'
					onPress={() => {
						AuthManager.resetPassword(email);
						router.replace('/welcome/resetpasswordsent');
					}}
					backgroundColor='white'
					textColor='black'
					disabled={!emailValid}
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
