import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import RoundedButton from '@/components/RoundedButton';
import { getTheme } from '@/core/themes/ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import BackgroundCircles from '@/components/Welcome/BackgroundCircles';
import { Link, router } from 'expo-router';
import PermissionManager from '@/core/PermissionManager';

export default function setup() {
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
					<Text style={styles.welcomeText}>Finish Setting Up</Text>
					<Text style={styles.welcomeTextDescription}>
						Some permissions are required for County Collector to function
						properly.
					</Text>
				</View>
				<View style={styles.permissionContainer}>
					<View style={styles.permissionLine}>
						<Text style={styles.permissionText}>Notifications</Text>
						<Text style={styles.permissionDescription}>
							Receive notifications when you visit a new county.
						</Text>
					</View>

					<View style={styles.permissionLine}>
						<Text style={styles.permissionText}>Location</Text>
						<Text style={styles.permissionDescription}>
							Used to automatically collect counties you visit.
						</Text>
					</View>
				</View>
				<View style={styles.buttonContainer}>
					<RoundedButton
						title='Allow'
						onPress={async () => {
							let notifications =
								await PermissionManager.requestNotificationPermission();
							let location =
								await PermissionManager.requestLocationPermission();
							let backgroundLocation =
								await PermissionManager.requestBackgroundLocationPermission();

							async function checkPermission() {
								let backgroundStatus =
									await PermissionManager.getBackgroundLocationPermission();

								if (backgroundStatus) {
									router.navigate('/(tabs)/home');
								}
							}
							setInterval(checkPermission, 500);
						}}
						backgroundColor={theme.button.secondary.backgroundColor}
						textColor={theme.button.secondary.textColor}
					/>
					<RoundedButton
						title='Set Up Later'
						onPress={async () => {
							router.navigate('/(tabs)/home');
						}}
						backgroundColor={theme.button.primary.backgroundColor}
						textColor={theme.button.primary.textColor}
					/>
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
	permissionLine: {
		marginVertical: 20,
	},
	permissionText: {
		color: getTheme().ui.primaryColor,
		fontSize: 26,
		marginLeft: 12,
		fontWeight: '700',
		marginBottom: 4,
	},
	permissionDescription: {
		color: getTheme().ui.textColor,
		fontSize: 18,
		marginLeft: 12,
		fontWeight: '400',
	},
	permissionContainer: {
		marginTop: -50,
	},
});
