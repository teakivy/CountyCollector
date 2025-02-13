import RoundedButton from '@/components/RoundedButton';
import AuthManager from '@/core/AuthManager';
import { getTheme } from '@/core/themes/ThemeProvider';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
	const theme = getTheme();
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.homeContainer}>
				<Text
					style={{
						color: 'white',
						fontSize: 35,
						fontFamily: 'Noopla',
						marginTop: 40,
						textAlign: 'left',
					}}
				>
					County Collector
				</Text>

				<View style={styles.lifetimeStats}>
					<Text style={{ color: 'white', fontSize: 18 }}>
						Lifetime Statistics
					</Text>
					<View style={styles.horizontalLine} />
					<View style={styles.lifetimeStatsRow}>
						<View style={styles.lifetimeStatsPart}>
							<Text style={{ color: 'white', fontSize: 24 }}>0</Text>
							<Text
								style={{ color: theme.ui.darkSecondaryTextColor, fontSize: 16 }}
							>
								Counties
							</Text>
						</View>
						<View style={styles.verticalLine} />
						<View style={styles.lifetimeStatsPart}>
							<Text style={{ color: 'white', fontSize: 24 }}>0</Text>
							<Text
								style={{ color: theme.ui.darkSecondaryTextColor, fontSize: 16 }}
							>
								States
							</Text>
						</View>
						<View style={styles.verticalLine} />
						<View style={styles.lifetimeStatsPart}>
							<Text style={{ color: 'white', fontSize: 24 }}>0</Text>
							<Text
								style={{ color: theme.ui.darkSecondaryTextColor, fontSize: 16 }}
							>
								Countries
							</Text>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: getTheme().ui.backgroundColor,
	},
	homeContainer: {
		marginHorizontal: 20,
		gap: 20,
	},
	lifetimeStats: {
		backgroundColor: getTheme().ui.darkerBackgroundColor,
		padding: 15,
		borderRadius: 20,
	},
	horizontalLine: {
		borderBottomColor: getTheme().ui.backgroundColor,
		borderBottomWidth: 3,
		width: '120%',
		marginVertical: 10,
		marginLeft: -20,
	},
	lifetimeStatsRow: {
		flexDirection: 'row',
	},
	verticalLine: {
		borderLeftColor: getTheme().ui.backgroundColor,
		borderLeftWidth: 3,
		height: '153%',
		marginTop: -10,
		marginHorizontal: 10,
	},
	lifetimeStatsPart: {
		flex: 1,
		alignItems: 'center',
	},
});
