function filterValidCharacters(input: string, validChars: Set<string>): string {
	return [...input].filter((char) => validChars.has(char)).join('');
}

function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export { filterValidCharacters, isValidEmail };
