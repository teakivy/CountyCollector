import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	sendPasswordResetEmail,
	Auth,
} from 'firebase/auth';
import { auth } from './Firebase';
import { AppUser, SignUpUserOptions } from '@/types/UserTypes';

import DatabaseManager from './DatabaseManager';
import UserManager from './UserManager';

class AuthManager {
	private auth = auth;

	/**
	 * Sign up a new user
	 * @param email - User's email
	 * @param password - User's password
	 * @returns User object if successful, null otherwise
	 */
	async signUp(userOptions: SignUpUserOptions): Promise<User | null> {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				this.auth,
				userOptions.email,
				userOptions.password
			);

			UserManager.createUserData(
				userCredential.user.uid,
				userOptions.email,
				userOptions.username,
				userOptions.displayName,
				userOptions.accountType
			);
			console.log('User signed up:', userCredential.user);
			return userCredential.user;
		} catch (error) {
			console.error('Error signing up:', error);
			return null;
		}
	}

	/**
	 * Log in a user
	 * @param email - User's email
	 * @param password - User's password
	 * @returns User object if successful, null otherwise
	 */
	async login(email: string, password: string): Promise<User | null> {
		try {
			const userCredential = await signInWithEmailAndPassword(
				this.auth,
				email,
				password
			);
			console.log('User logged in:', userCredential.user);
			return userCredential.user;
		} catch (error) {
			console.error('Error logging in:', error);
			return null;
		}
	}

	/**
	 * Log in a user using email or username
	 * @param emailOrUsername Email or username
	 * @param password Password
	 * @returns A user object if successful, null otherwise
	 */
	async handleLogin(
		emailOrUsername: string,
		password: string
	): Promise<User | null> {
		let isEmail = emailOrUsername.includes('@');
		let user: User | null;
		if (isEmail) {
			user = await this.login(emailOrUsername, password);
		} else {
			let email = await DatabaseManager.getEmailByUsername(emailOrUsername);
			if (email) {
				user = await this.login(email, password);
			} else {
				console.error('Username not found');
				return null;
			}
		}
		if (!user) {
			console.error('Error logging in');
			return null;
		}
		return user;
	}

	/**
	 * Log out the current user
	 * @returns void
	 */
	async logout(): Promise<void> {
		try {
			await signOut(this.auth);
			console.log('User logged out');
		} catch (error) {
			console.error('Error logging out:', error);
		}
	}

	/**
	 * Reset user's password
	 * @param email - User's email
	 * @returns void
	 */
	async resetPassword(email: string): Promise<void> {
		await sendPasswordResetEmail(this.auth, email);
	}

	/**
	 * Get the current user
	 * @returns User object if user is logged in, null otherwise
	 */
	getCurrentUser(): User | null {
		return this.auth.currentUser;
	}

	/**
	 * Gets if the user is logged in
	 * @returns boolean - True if user is logged in, false otherwise
	 */
	isLoggedIn(): boolean {
		console.log(this.auth.currentUser);
		return this.auth.currentUser !== null;
	}

	/**
	 * Listen for changes in authentication state
	 * @param callback - Function to call when authentication state changes
	 * @returns void
	 */
	onAuthStateChange(callback: (user: User | null) => void): void {
		onAuthStateChanged(this.auth, callback);
	}

	/**
	 * Get the user's UID
	 * @returns string - User's UID
	 */
	getUid(): string | null {
		const user = this.auth.currentUser;
		if (user) {
			return user.uid;
		}
		return null;
	}

	/**
	 * Get the user's data
	 * @returns AppUser object if user is logged in, null otherwise
	 */
	async getUserData(): Promise<AppUser | null> {
		const user = this.auth.currentUser;
		if (user) {
			return await DatabaseManager.getDocument<AppUser>('users', user.uid);
		}
		return null;
	}

	/**
	 * Get the Auth object
	 * @returns Auth object
	 */
	getAuth(): Auth {
		return this.auth;
	}
}

export default new AuthManager();
