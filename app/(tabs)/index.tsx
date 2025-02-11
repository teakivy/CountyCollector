import { StyleSheet, View } from 'react-native';

import React, { useMemo, useState } from 'react';
import MapView, { Geojson } from 'react-native-maps';

// import countyBoundaries from './../../assets/counties.json';
import countyBoundaries from './../../assets/us-county-boundaries-simple.json';

export default function HomeScreen() {
	const [region, setRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	// Memoized county data (prevents recalculating on every render)
	const countyData = useMemo(() => extractCounties(countyBoundaries), []);

	const onRegionChangeComplete = (newRegion: any) => {
		// Only update if panning (not zooming)
		if (
			Math.abs(newRegion.latitude - region.latitude) > 0.01 ||
			Math.abs(newRegion.longitude - region.longitude) > 0.01
		) {
			setRegion(newRegion);
		}
	};

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={region}
				onRegionChangeComplete={onRegionChangeComplete}
			>
				{countyData.map((geojson, index) => (
					<Geojson
						key={index} // Static key prevents unnecessary re-mounts
						geojson={geojson}
						strokeColor='#00000088'
						strokeWidth={1}
						// fillColor='#ff000050'
					/>
				))}
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		...StyleSheet.absoluteFillObject,
	},
});

function extractCounties(countyGeojson: any): Geojson[] {
	let counties: Geojson[] = [];

	for (let feature of countyGeojson.features) {
		let f = {
			type: 'Feature',
			properties: {
				countyns: (feature.properties.countyns as string) || '',
				statefp: (feature.properties.statefp as string) || '',
				name: (feature.properties.name as string) || '',
			},
			geometry: {
				type: feature.geometry.type as 'Polygon' | 'MultiPolygon',
				coordinates: feature.geometry.coordinates as
					| number[][][]
					| number[][][][],
			},
		};

		counties.push({
			type: 'FeatureCollection',
			features: [f],
		});
	}

	return counties;
}
