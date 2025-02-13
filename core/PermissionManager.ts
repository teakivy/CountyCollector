import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';

class PermissionManager {
	/**
	 * Request Notification Permissions
	 */
	static async requestNotificationPermission(): Promise<boolean> {
		const { status } = await Notifications.requestPermissionsAsync();
		return status === 'granted';
	}

	/**
	 * Check Notification Permission Status
	 */
	static async getNotificationPermission(): Promise<boolean> {
		const { status } = await Notifications.getPermissionsAsync();
		return status === 'granted';
	}

	/**
	 * Request Foreground Location Permissions
	 */
	static async requestLocationPermission(): Promise<boolean> {
		const { status } = await Location.requestForegroundPermissionsAsync();
		return status === Notifications.PermissionStatus.GRANTED;
	}

	/**
	 * Check Foreground Location Permission Status
	 */
	static async getLocationPermission(): Promise<boolean> {
		const { status } = await Location.getForegroundPermissionsAsync();
		return status === 'granted';
	}

	/**
	 * Request Background Location Permissions
	 */
	static async requestBackgroundLocationPermission(): Promise<boolean> {
		console.log('Requesting Foreground Location Permission...');
		const { status: foregroundStatus } =
			await Location.requestForegroundPermissionsAsync();
		console.log('Foreground Status:', foregroundStatus);

		if (foregroundStatus !== 'granted') {
			console.warn('Foreground permission not granted.');
			return false;
		}

		console.log('Requesting Background Location Permission...');
		const { status: backgroundStatus } =
			await Location.requestBackgroundPermissionsAsync();
		console.log('Background Status:', backgroundStatus);

		return backgroundStatus === 'granted';
	}

	/**
	 * Check Background Location Permission Status
	 */
	static async getBackgroundLocationPermission(): Promise<boolean> {
		const { status } = await Location.getBackgroundPermissionsAsync();
		return status === 'granted';
	}

	static async checkPermissions(): Promise<boolean> {
		const notification = await this.getNotificationPermission();
		const location = await this.getLocationPermission();
		const backgroundLocation = await this.getBackgroundLocationPermission();

		return notification && location && backgroundLocation;
	}
}

export default PermissionManager;
