import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { app } from './Firebase';
import { AppUser } from '@/types/UserTypes';

import DatabaseManager from './DatabaseManager';

class AuthManager {
	private auth = getAuth(app);

	/**
	 * Sign up a new user
	 * @param email - User's email
	 * @param password - User's password
	 * @returns User object if successful, null otherwise
	 */
	async signUp(email: string, password: string): Promise<User | null> {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				this.auth,
				email,
				password
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
		try {
			await sendPasswordResetEmail(this.auth, email);
			console.log('Password reset email sent');
		} catch (error) {
			console.error('Error sending password reset email:', error);
		}
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
}

export default new AuthManager();
