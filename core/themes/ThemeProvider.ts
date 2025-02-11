import { Theme } from '@/types/ThemeTypes';

const darkIvyTheme: Theme = {
	button: {
		primary: {
			backgroundColor: '#5d3d7d',
			textColor: '#fafafa',
		},
		secondary: {
			backgroundColor: '#fafafa',
			textColor: '#000000',
		},
	},
	ui: {
		backgroundColor: '#1b1725',
		darkerBackgroundColor: '#15121e',
		secondaryBackgroundColor: '#1f1b29',
		textColor: '#ffffff',
		secondaryTextColor: '#90a4ae',
		darkSecondaryTextColor: '#697880',
		darkerSecondaryTextColor: '#455157',
		primaryColor: '#b075eb',
	},
};

function getTheme() {
	return darkIvyTheme;
}

export { getTheme, darkIvyTheme };
