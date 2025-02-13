import RoundedButton from '@/components/RoundedButton';
import AuthManager from '@/core/AuthManager';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={{ color: 'white', fontSize: 20 }}>You Screen</Text>
			<RoundedButton
				title='Logout'
				onPress={() => {
					AuthManager.logout();
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
