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
	return (
		<View style={styles.container}>
			<SafeAreaView>
				<Text style={styles.createText}>Forgot Password?</Text>
				<Text style={styles.description}>
					Check your email for instructions on resetting your password.
				</Text>

				<RoundedButton
					title='Back to Login'
					onPress={() => {
						router.back();
					}}
					backgroundColor='white'
					textColor='black'
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
	description: {
		color: 'white',
		fontSize: 16,
		marginBottom: 40,
	},
});
