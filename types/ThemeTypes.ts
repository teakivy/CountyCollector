type Theme = {
	button: {
		primary: {
			backgroundColor: string;
			textColor: string;
		};
		secondary: {
			backgroundColor: string;
			textColor: string;
		};
	};
	ui: {
		backgroundColor: string;
		darkerBackgroundColor: string;
		secondaryBackgroundColor: string;
		textColor: string;
		secondaryTextColor: string;
		primaryColor: string;
	};
};

export { Theme };
