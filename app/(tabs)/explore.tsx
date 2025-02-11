import { StyleSheet, View, Alert } from 'react-native';

import Mapbox, {
	Camera,
	FillLayer,
	LineLayer,
	MapView,
	ShapeSource,
} from '@rnmapbox/maps';
import { Component } from 'react';
import countyGeojson from './../../assets/us-county-boundaries-simple.json';
import canadaCensusGeojson from './../../assets/CA-census-subdivisions.json';
import ukCountyGeojson from './../../assets/UK-counties.json';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_API_KEY || '');

export default class TabTwoScreen extends Component {
	componentDidMount() {
		Mapbox.setTelemetryEnabled(false);
	}

	onCountyPress = (event: { features: string | any[] }) => {
		if (event.features.length > 0) {
			const county = event.features[0].properties;
			Alert.alert('County Selected', `You tapped on ${county.name}`);
		}
	};

	render() {
		return (
			<View style={styles.page}>
				<View style={styles.container}>
					<MapView
						style={styles.map}
						styleURL={Mapbox.StyleURL.Dark}
						scaleBarEnabled={false}
						compassEnabled={false}
						rotateEnabled={false}
					>
						<Camera
							heading={0}
							zoomLevel={5}
							centerCoordinate={[-95.7129, 37.0902]}
						/>
						<ShapeSource
							id='us-counties'
							// @ts-ignore
							shape={countyGeojson}
							onPress={this.onCountyPress}
						>
							<FillLayer
								id='us-fill'
								style={{
									fillColor: 'rgba(0, 0, 0, 0)', // Semi-transparent blue
									fillAntialias: true,
								}}
							/>
							<LineLayer
								id='us-border'
								style={{
									lineColor: 'white', // Black border
									lineWidth: 1, // Adjust thickness
									lineOpacity: 0.2,
								}}
							/>
						</ShapeSource>
						<ShapeSource
							id='ca-subdivisions'
							// @ts-ignore
							shape={canadaCensusGeojson}
							onPress={this.onCountyPress}
						>
							<FillLayer
								id='ca-fill'
								style={{
									fillColor: 'rgba(0, 0, 0, 0)', // Semi-transparent blue
									fillAntialias: true,
								}}
							/>
							<LineLayer
								id='ca-border'
								style={{
									lineColor: 'white', // Black border
									lineWidth: 1, // Adjust thickness
									lineOpacity: 0.2,
								}}
							/>
						</ShapeSource>

						<ShapeSource
							id='uk-subdivisions'
							// @ts-ignore
							shape={ukCountyGeojson}
							onPress={this.onCountyPress}
						>
							<FillLayer
								id='uk-fill'
								style={{
									fillColor: 'rgba(0, 0, 0, 0)', // Semi-transparent blue
									fillAntialias: true,
								}}
							/>
							<LineLayer
								id='uk-border'
								style={{
									lineColor: 'white', // Black border
									lineWidth: 1, // Adjust thickness
									lineOpacity: 0.2,
								}}
							/>
						</ShapeSource>
					</MapView>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	container: {
		height: '100%',
		width: '100%',
		backgroundColor: 'tomato',
	},
	map: {
		flex: 1,
	},
});
