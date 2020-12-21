module.exports = conf => ({
	plugins: [
		require('autoprefixer')({ "overrideBrowserslist": "chrome 20, ie 10" })
	],
});
