import {
	getFirestore,
	doc,
	setDoc,
	getDoc,
	updateDoc,
	deleteDoc,
	collection,
	getDocs,
	Firestore,
	DocumentData,
	WithFieldValue,
	query,
	where,
} from 'firebase/firestore';
import { app } from './Firebase';

class DatabaseManager {
	private db: Firestore;

	constructor() {
		this.db = getFirestore(app);
	}

	/**
	 * Check if an email exists in the 'users' collection
	 * @param email - The email to check
	 * @returns Promise resolving to true if email exists, otherwise false
	 */
	async doesEmailExist(email: string): Promise<boolean> {
		try {
			const usersRef = collection(this.db, 'users');
			const q = query(usersRef, where('email', '==', email));
			const querySnapshot = await getDocs(q);

			return !querySnapshot.empty; // true if email exists, false otherwise
		} catch (error) {
			console.error('Error checking email existence:', error);
			return false;
		}
	}

	/**
	 * Check if an username exists in the 'users' collection
	 * @param username - The username to check
	 * @returns Promise resolving to true if email exists, otherwise false
	 */
	async doesUsernameExist(username: string): Promise<boolean> {
		try {
			const usersRef = collection(this.db, 'users');
			const q = query(usersRef, where('username', '==', username));
			const querySnapshot = await getDocs(q);

			return !querySnapshot.empty; // true if username exists, false otherwise
		} catch (error) {
			console.error('Error checking username existence:', error);
			return false;
		}
	}

	/**
	 * Get the email address associated with a given username
	 * @param username - The username to search for
	 * @returns Promise resolving to the email if found, otherwise null
	 */
	async getEmailByUsername(username: string): Promise<string | null> {
		try {
			const usersRef = collection(this.db, 'users');
			const q = query(usersRef, where('username', '==', username));
			const querySnapshot = await getDocs(q);

			if (!querySnapshot.empty) {
				const userDoc = querySnapshot.docs[0]; // Assuming usernames are unique
				const userData = userDoc.data();
				return userData.email || null; // Return email if it exists
			}

			return null;
		} catch (error) {
			console.log('Error getting email by username:', error);
			return null;
		}
	}

	/**
	 * Get a document from Firestore
	 * @param collectionName - Name of the Firestore collection
	 * @param docId - Document ID to retrieve
	 * @returns Document data if found, null otherwise
	 */
	async getDocument<T>(
		collectionName: string,
		docId: string
	): Promise<T | null> {
		try {
			const docRef = doc(this.db, collectionName, docId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				return docSnap.data() as T;
			} else {
				console.warn(
					`Document ${docId} not found in collection ${collectionName}`
				);
				return null;
			}
		} catch (error) {
			console.error('Error getting document:', error);
			return null;
		}
	}

	/**
	 * Set a document in Firestore (Creates or overwrites)
	 * @param collectionName - Name of the Firestore collection
	 * @param docId - Document ID to set
	 * @param data - Data to store in the document
	 * @returns Promise that resolves when the operation is complete
	 */
	async setDocument<T extends DocumentData>(
		collectionName: string,
		docId: string,
		data: WithFieldValue<T>
	): Promise<void> {
		try {
			const docRef = doc(this.db, collectionName, docId);
			await setDoc(docRef, data); // ✅ Now correctly typed for Firestore
			console.log(`Document ${docId} set successfully in ${collectionName}`);
		} catch (error) {
			console.error('Error setting document:', error);
		}
	}

	/**
	 * Update an existing document in Firestore
	 * @param collectionName - Name of the Firestore collection
	 * @param docId - Document ID to update
	 * @param data - Partial data to update
	 * @returns Promise that resolves when the operation is complete
	 */
	async updateDocument<T>(
		collectionName: string,
		docId: string,
		data: Partial<T>
	): Promise<void> {
		try {
			const docRef = doc(this.db, collectionName, docId);
			await updateDoc(docRef, data);
			console.log(
				`Document ${docId} updated successfully in ${collectionName}`
			);
		} catch (error) {
			console.error('Error updating document:', error);
		}
	}

	/**
	 * Delete a document from Firestore
	 * @param collectionName - Name of the Firestore collection
	 * @param docId - Document ID to delete
	 * @returns Promise that resolves when the operation is complete
	 */
	async deleteDocument(collectionName: string, docId: string): Promise<void> {
		try {
			const docRef = doc(this.db, collectionName, docId);
			await deleteDoc(docRef);
			console.log(
				`Document ${docId} deleted successfully from ${collectionName}`
			);
		} catch (error) {
			console.error('Error deleting document:', error);
		}
	}

	/**
	 * Get all documents from a Firestore collection
	 * @param collectionName - Name of the Firestore collection
	 * @returns Array of document data
	 */
	async getAllDocuments<T>(collectionName: string): Promise<T[]> {
		try {
			const colRef = collection(this.db, collectionName);
			const snapshot = await getDocs(colRef);

			return snapshot.docs.map((doc) => doc.data() as T);
		} catch (error) {
			console.error('Error getting all documents:', error);
			return [];
		}
	}

	async getFirestore(): Promise<Firestore> {
		return this.db;
	}
}

export default new DatabaseManager();
