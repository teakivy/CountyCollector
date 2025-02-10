import React, { useState, useEffect, useRef, forwardRef } from 'react';
import {
	Animated,
	TextInput,
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Text,
	TouchableOpacity,
	ReturnKeyTypeOptions,
	KeyboardType,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface InputProps {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	disableAutoCorrect?: boolean;
	autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
	autoComplete?: 'off' | 'username' | 'password' | 'email';
	secureTextEntry?: boolean;
	textColor?: string;
	outlineColor?: string;
	validate?: (text: string) => Promise<string | null> | string | null;
	returnKeyType?: ReturnKeyTypeOptions;
	onSubmitEditing?: () => void;
	keyboardType?: KeyboardType;
}

// Use forwardRef to allow parent components to control focus
const Input = forwardRef<TextInput, InputProps>(
	(
		{
			value,
			onChangeText,
			placeholder = '',
			disableAutoCorrect = false,
			autoCapitalize = 'none',
			autoComplete = 'off',
			secureTextEntry = false,
			textColor = 'white',
			outlineColor = 'white',
			validate,
			returnKeyType = 'default',
			onSubmitEditing,
			keyboardType = 'default',
		},
		ref
	) => {
		const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;

		const [error, setError] = useState<string | null>(null);
		const [isPasswordVisible, setPasswordVisible] = useState(false);

		useEffect(() => {
			Animated.timing(labelPosition, {
				toValue: value ? 1 : 0,
				duration: 100,
				useNativeDriver: false,
			}).start();
		}, [value]);

		const labelStyle = {
			top: labelPosition.interpolate({
				inputRange: [0, 1],
				outputRange: [14, -10],
			}),
			fontSize: labelPosition.interpolate({
				inputRange: [0, 1],
				outputRange: [20, 14],
			}),
		};

		return (
			<TouchableWithoutFeedback onPress={() => (ref as any)?.current?.focus()}>
				<View>
					<View style={[styles.container, { borderColor: outlineColor }]}>
						<Animated.Text
							style={[styles.label, labelStyle, { color: outlineColor }]}
						>
							{placeholder}
						</Animated.Text>
						<View style={styles.inputWrapper}>
							<TextInput
								ref={ref}
								style={[styles.textInput, { color: textColor }]}
								value={value}
								onChangeText={async (text) => {
									onChangeText(text);
									if (validate) {
										const error = await validate(text);
										setError(error);
									}
								}}
								autoCorrect={!disableAutoCorrect}
								spellCheck={!disableAutoCorrect}
								autoCapitalize={autoCapitalize}
								autoComplete={autoComplete}
								secureTextEntry={secureTextEntry && !isPasswordVisible}
								returnKeyType={returnKeyType}
								onSubmitEditing={onSubmitEditing}
								keyboardType={keyboardType}
							/>
							{secureTextEntry && (
								<TouchableOpacity
									onPress={() => setPasswordVisible(!isPasswordVisible)}
									style={styles.eyeIcon}
								>
									<Ionicons
										name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
										size={24}
										color={outlineColor}
									/>
								</TouchableOpacity>
							)}
						</View>
					</View>
					<View style={styles.errorContainer}>
						{error && <Text style={{ color: '#b53636' }}>{error}</Text>}
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
);

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		justifyContent: 'center',
		padding: 15,
		backgroundColor: '#1a1a1a',
		borderRadius: 15,
		borderWidth: 2,
		borderColor: 'white',
	},
	label: {
		position: 'absolute',
		left: 15,
		backgroundColor: '#1a1a1a',
		paddingHorizontal: 4,
		borderRadius: 5,
	},
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	textInput: {
		flex: 1,
		fontSize: 20,
		fontWeight: '400',
		color: 'white',
	},
	eyeIcon: {
		paddingHorizontal: 10,
	},
	errorContainer: {
		marginTop: 2,
		height: 25,
		fontSize: 12,
	},
});

export default Input;
