'use strict';

const postcss = require('postcss');
const postcssrc = require('postcss-load-config');

const base = { plugins:[], options:{} };

const isObject = any => !!any && typeof any === 'object' && !Array.isArray(any);

module.exports = function (task) {
	const setError = msg => task.emit('plugin_error', { plugin:'@nickkaramoff/taskr-postcss', error:msg });

	task.plugin('postcss', { every:false }, function * (files, opts) {
		let config;

		try {
			const { plugins, options } = postcssrc.sync({}, task.root);
			config = {
				...options,
				plugins
			};
		} catch (err) {
			// PostCSS config not found or is incorrect
			config = undefined;
		}

		config = config || opts;

		if (!isObject(config)) {
			return setError(`Invalid PostCSS config! An object is required; recevied: ${typeof config}`);
		}

		opts = Object.assign({}, base, config);

		for (const file of files) {
			try {
				const ctx = postcss(opts.plugins);
				const out = yield ctx.process(file.data.toString(), opts);
				file.data = Buffer.from(out.css); // write new data
			} catch (err) {
				return setError(err.message);
			}
		}
	});
}
