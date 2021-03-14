const path = require('path');
module.exports = {
	webpack: {
		alias: {
			'@assets': path.resolve(__dirname, 'src/assets/'),
			'@constants': path.resolve(__dirname, 'src/constants/'),
			'@components': path.resolve(__dirname, 'src/components/'),
			'@utils': path.resolve(__dirname, 'src/utils/'),
		},
	},
};
