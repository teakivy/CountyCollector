import React, { useState } from 'react';
import {
	View,
	TextInput,
	Text,
	Animated,
	StyleSheet,
	KeyboardTypeOptions,
} from 'react-native';

type FloatingLabelTextFieldProps = {
	text: string;
	setText: (text: string) => void;
	placeholder: string;
	isSecure?: boolean;
	actionResult?: string | null;
	lowerCaseOnly?: boolean;
	allowedCharacters?: RegExp;
	keyboardType?: KeyboardTypeOptions;
	action?: (text: string) => void;
};

const FloatingLabelTextField: React.FC<FloatingLabelTextFieldProps> = ({
	text,
	setText,
	placeholder,
	isSecure = false,
	actionResult = null,
	lowerCaseOnly = false,
	allowedCharacters,
	keyboardType = 'default',
	action,
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const labelPosition = new Animated.Value(text ? 1 : 0);

	const handleFocus = () => {
		setIsFocused(true);
		Animated.timing(labelPosition, {
			toValue: 1,
			duration: 200,
			useNativeDriver: false,
		}).start();
	};

	const handleBlur = () => {
		setIsFocused(false);
		if (!text || !isFocused) {
			Animated.timing(labelPosition, {
				toValue: 0,
				duration: 200,
				useNativeDriver: false,
			}).start();
		}
	};

	const handleChangeText = (input: string) => {
		let newText = input;
		if (allowedCharacters) {
			newText = newText
				.split('')
				.filter((char) => allowedCharacters.test(char))
				.join('');
		}
		if (lowerCaseOnly) {
			newText = newText.toLowerCase();
		}
		setText(newText);
		action?.(newText);
	};

	return (
		<View style={styles.container}>
			<Animated.Text
				style={[
					styles.label,
					{
						top: labelPosition.interpolate({
							inputRange: [0, 1],
							outputRange: [14, -10],
						}),
						fontSize: labelPosition.interpolate({
							inputRange: [0, 1],
							outputRange: [16, 12],
						}),
						color: isFocused
							? actionResult
								? 'red'
								: 'blue'
							: text
							? 'white'
							: 'gray',
					},
				]}
			>
				{placeholder}
			</Animated.Text>
			<TextInput
				style={styles.input}
				value={text}
				onChangeText={handleChangeText}
				secureTextEntry={isSecure}
				onFocus={handleFocus}
				onBlur={handleBlur}
				autoCapitalize='none'
				autoCorrect={false}
				keyboardType={keyboardType}
			/>
			<View
				style={[
					styles.underline,
					{
						backgroundColor: isFocused
							? actionResult
								? 'red'
								: 'blue'
							: 'gray',
					},
				]}
			/>
			{actionResult && <Text style={styles.errorText}>{actionResult}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		marginVertical: 12,
	},
	label: {
		position: 'absolute',
		left: 10,
		backgroundColor: 'transparent',
		paddingHorizontal: 4,
	},
	input: {
		height: 40,
		borderBottomWidth: 1,
		borderBottomColor: 'gray',
		paddingHorizontal: 8,
		fontSize: 16,
		color: 'white',
	},
	underline: {
		height: 1,
		width: '100%',
	},
	errorText: {
		color: 'red',
		fontSize: 12,
		marginTop: 2,
	},
});

export default FloatingLabelTextField;
