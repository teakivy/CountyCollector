import { getTheme } from '@/core/themes/ThemeProvider';
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
	focusedOutlineColor?: string;
	backgroundColor?: string;
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
			focusedOutlineColor = 'white',
			validate,
			returnKeyType = 'default',
			onSubmitEditing,
			keyboardType = 'default',
			backgroundColor = getTheme().ui.backgroundColor,
		},
		ref
	) => {
		const labelPosition = useRef(new Animated.Value(value ? 1 : 0)).current;
		const borderAnimation = useRef(new Animated.Value(value ? 1 : 0)).current;

		const [error, setError] = useState<string | null>(null);
		const [isPasswordVisible, setPasswordVisible] = useState(false);

		const [isFocused, setFocused] = useState(false);

		useEffect(() => {
			Animated.timing(labelPosition, {
				toValue: value.length > 0 ? 1 : 0,
				duration: 100,
				useNativeDriver: false,
			}).start();

			Animated.timing(borderAnimation, {
				toValue: isFocused ? 1 : 0,
				duration: 200,
				useNativeDriver: false,
			}).start();
		}, [value, isFocused]);

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

		const borderStyle = {
			borderColor: borderAnimation.interpolate({
				inputRange: [0, 1],
				outputRange: [outlineColor, focusedOutlineColor],
			}),
			color: borderAnimation.interpolate({
				inputRange: [0, 1],
				outputRange: [outlineColor, focusedOutlineColor],
			}),
		};

		return (
			<TouchableWithoutFeedback onPress={() => (ref as any)?.current?.focus()}>
				<View>
					<Animated.View style={[styles.container, borderStyle]}>
						<Animated.Text
							style={[
								styles.label,
								labelStyle,
								{
									backgroundColor: backgroundColor,
								},
								borderStyle,
							]}
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
								onFocus={() => setFocused(true)}
								onBlur={() => setFocused(false)}
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
					</Animated.View>
					<View style={styles.errorContainer}>
						{error && <Text style={{ color: '#e34d5a' }}>{error}</Text>}
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
		borderRadius: 15,
		borderWidth: 2,
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
