type Geojson = {
	type: 'FeatureCollection';
	features: Feature[];
};

type Feature = {
	type: string;
	properties: CountyProperties;
	geometry: Geometry;
};

type CountyProperties = {
	countyns: string;
	statefp: string;
	name: string;
};

type Geometry = {
	type: 'Polygon' | 'MultiPolygon';
	coordinates: number[][][] | number[][][][];
};
