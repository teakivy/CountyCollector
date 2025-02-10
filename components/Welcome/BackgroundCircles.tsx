import { getTheme } from '@/core/themes/ThemeProvider';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const BackgroundCircles = () => {
	return (
		<View style={styles.container}>
			<Svg height={height} width={width} style={styles.svg}>
				<Circle
					cx={width * 0.9}
					cy={height * -0}
					r={200}
					fill={getTheme().ui.primaryColor + '15'}
				/>

				<Circle
					cx={width * 0.07}
					cy={height * 0.1}
					r={300}
					fill={getTheme().ui.primaryColor + '15'}
				/>
			</Svg>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},
	svg: {
		position: 'absolute',
	},
});

export default BackgroundCircles;
