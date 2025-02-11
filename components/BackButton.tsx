import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import { router } from 'expo-router';

interface BackButtonProps {
	title?: string;
	onPress?: () => void;
	color?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
	title = 'Back',
	onPress = () => {
		router.back();
	},
	color = 'white',
}) => {
	return (
		<View>
			<TouchableOpacity onPress={onPress} style={styles.backButton}>
				<FontAwesome name='arrow-left-long' size={20} color={color} />
				<Text style={{ color, fontSize: 16, fontWeight: 600, top: 1 }}>
					{title}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	backButton: {
		flexDirection: 'row',
		gap: 10,
	},
});

export default BackButton;
