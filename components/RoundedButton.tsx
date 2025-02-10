import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';

interface RoundedButtonProps {
	title: string;
	onPress: () => void;
	backgroundColor?: string;
	textColor?: string;
	style?: ViewStyle;
	disabled?: boolean;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({
	title,
	onPress,
	backgroundColor = '#007BFF', // Default blue color
	textColor = '#FFFFFF', // Default white text
	style,
	disabled = false,
}) => {
	return (
		<TouchableOpacity
			style={[
				styles.button,
				{ backgroundColor },
				style,
				disabled && { opacity: 0.5 },
			]}
			onPress={onPress}
			activeOpacity={0.8}
			disabled={disabled}
		>
			<Text style={[styles.text, { color: textColor }]}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingVertical: 20,
		paddingHorizontal: 24,
		borderRadius: 1000,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 2,
	},
	text: {
		fontSize: 20,
		fontWeight: '700',
	},
});

export default RoundedButton;
