import { Device } from '@/types/UserTypes';
// import * as Application from 'expo-application';
import { Timestamp } from 'firebase/firestore';
// import { Platform } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import { v4 as uuidv4 } from 'uuid';

class DeviceManager {
	async getDeviceId(): Promise<string> {
		let deviceId;

		// if (Platform.OS === 'android') {
		// 	deviceId = Application.getAndroidId();
		// } else {
		// 	deviceId = await Application.getIosIdForVendorAsync();
		// }

		if (!deviceId) {
			deviceId = uuidv4();
		}
		return deviceId;
	}

	async getDevice(): Promise<Device> {
		const device = {
			id: 'device-id',
			lastActive: Timestamp.now(),
			// name: await DeviceInfo.getDeviceName(),
			// platform: `${DeviceInfo.getModel()} (${DeviceInfo.getSystemVersion()})`,
			name: 'Device Name',
			platform: 'Platform',
		};
		return device;
	}
}

export default new DeviceManager();
