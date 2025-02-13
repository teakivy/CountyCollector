import RoundedButton from '@/components/RoundedButton';
import AuthManager from '@/core/AuthManager';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={{ color: 'white', fontSize: 20 }}>Search Screen</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
