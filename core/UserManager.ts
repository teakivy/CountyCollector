import { AppUser, AppUserAccountType } from '@/types/UserTypes';
import DatabaseManager from './DatabaseManager';
import { Timestamp } from 'firebase/firestore';
import DeviceManager from './DeviceManager';
import { doc, setDoc } from 'firebase/firestore';

class UserManager {
	/**
	 * Create a new user document in Firestore
	 * @param uid - User's UID
	 * @param email - User's email
	 * @param username - User's username
	 * @param displayName - User's display name
	 * @param accountType - Account type (email, apple, google)
	 * @returns User object if successful
	 */
	async createUserData(
		uid: string,
		email: string,
		username: string,
		displayName: string,
		accountType: AppUserAccountType
	): Promise<AppUser> {
		console.log('Creating user');
		let device = await DeviceManager.getDevice();
		console.log('Device:', device);
		const newUser: AppUser = {
			uid: uid,
			schemaVersion: 1,
			accountType: accountType,
			username: username,
			email: email,
			displayName: displayName,
			created: Timestamp.now(),
			profilePhoto: '',
			role: 'user',
			subscription: 'none',
			activeDevice: device,
			devices: [device],
			currentCounty: null,
			visitedCountries: [],
			visitedStates: [],
			visitedCounties: [],
			visits: [],
		};

		console.log('Creating user data:', newUser);

		await setDoc(
			doc(await DatabaseManager.getFirestore(), 'users', uid),
			newUser
		);
        console.log('User data created');

		return newUser;
	}
}

export default new UserManager();
