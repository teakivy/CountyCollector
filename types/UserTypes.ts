import { Timestamp } from 'firebase/firestore';

type AppUser = {
	uid: string;
	schemaVersion: number;
	accountType: AppUserAccountType;
	username: string;
	email: string;
	displayName: string;
	created: Timestamp;
	profilePhoto: string;
	role: 'user' | 'admin' | 'tester';
	subscription: string;
	activeDevice: Device;
	devices: Device[];
	currentCounty: Visit | null;
	visitedCountries: string[];
	visitedStates: string[];
	visitedCounties: string[];
	visits: Visit[];
};

type Device = {
	id: string;
	lastActive: Timestamp;
	name: string;
	platform: string;
};

type Visit = {
	country: string;
	state: string;
	county: string;
	entered: Timestamp;
	exited: Timestamp;
};

type AppUserAccountType = 'email' | 'apple' | 'google';

export { AppUser, Device, Visit, AppUserAccountType };
