import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import RoundedButton from '@/components/RoundedButton';
import { getTheme } from '@/core/themes/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundCircles from '@/components/Welcome/BackgroundCircles';
import AntDesign from '@expo/vector-icons/AntDesign';
import AuthManager from '@/core/AuthManager';
import UserManager from '@/core/UserManager';
import { Link, router } from 'expo-router';

export default function welcome() {
	const theme = getTheme();

	return (
		<View style={{ flex: 1 }}>
			<LinearGradient
				// Background Linear Gradient
				colors={[
					'black',
					theme.ui.darkerBackgroundColor,
					theme.ui.darkerBackgroundColor,
					theme.ui.darkerBackgroundColor,
					theme.ui.backgroundColor,
					theme.ui.backgroundColor,
				]}
				style={styles.container}
			>
				<BackgroundCircles />
				<View style={styles.welcomeTextContainer}>
					<Image
						source={require('@/assets/images/countyCollectorIcon.png')}
						style={styles.appIcon}
					/>
					<Text style={styles.welcomeText}>Welcome to</Text>
					<Text style={[styles.welcomeText, styles.welcomeTextAppName]}>
						County Collector
					</Text>
					<Text style={styles.welcomeTextDescription}>
						Track your trips and collect locations
					</Text>
				</View>
				<View style={styles.buttonContainer}>
					<RoundedButton
						title='Login'
						onPress={() => {
							router.push('/welcome/login');
						}}
						backgroundColor={theme.button.secondary.backgroundColor}
						textColor={theme.button.secondary.textColor}
					/>
					<RoundedButton
						title='Sign Up'
						onPress={async () => {
							router.push('/welcome/signup');
						}}
						backgroundColor={theme.button.primary.backgroundColor}
						textColor={theme.button.primary.textColor}
					/>
					<View style={styles.otherOptionsOr}>
						<View style={styles.horizontalLine}></View>
						<Text style={styles.signUpOr}>or</Text>
						<View style={styles.horizontalLine}></View>
					</View>

					<TouchableOpacity
						style={[styles.appleButton, { backgroundColor: '#000000' }]}
						onPress={() => {
							console.log(AuthManager.isLoggedIn());
						}}
						activeOpacity={0.8}
					>
						<AntDesign name='apple1' size={24} color='white' />
						<Text style={[styles.appleText, { color: 'white' }]}>
							Continue with Apple
						</Text>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: getTheme().ui.backgroundColor,
		justifyContent: 'center',
		paddingHorizontal: 40,
	},
	welcomeText: {
		fontSize: 33,
		fontWeight: 700,
		color: 'white',
	},
	welcomeTextDescription: {
		color: 'white',
		fontSize: 18,
		fontWeight: '400',
		marginTop: 10,
	},
	welcomeTextAppName: {
		color: getTheme().ui.primaryColor,
	},
	buttonContainer: {
		flexDirection: 'column',
		gap: 16,
		flex: 50,
		justifyContent: 'center',
	},
	welcomeTextContainer: {
		alignItems: 'baseline',
		flexDirection: 'column',
		gap: 10,
		flex: 60,
		marginTop: 120,
		marginBottom: -180,
	},
	appIcon: {
		height: 80,
		width: 80,
		marginBottom: 30,
		marginTop: 60,
		borderRadius: 20,
	},
	horizontalLine: {
		borderBottomColor: getTheme().ui.darkerSecondaryTextColor,
		borderBottomWidth: 1,
		width: '30%',
	},
	signUpOr: {
		color: getTheme().ui.darkSecondaryTextColor,
		fontSize: 14,
		marginBottom: 2,
	},
	otherOptionsOr: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
	},
	appleButton: {
		paddingVertical: 20,
		paddingHorizontal: 24,
		borderRadius: 1000,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 2,
		flexDirection: 'row',
		gap: 10,
	},
	appleText: {
		fontSize: 20,
		fontWeight: '700',
	},
});
