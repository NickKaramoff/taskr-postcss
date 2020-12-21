'use strict';

const res = require('path').resolve;
const postcss = require('postcss');
const postcssrc = require('postcss-load-config');

const base = { plugins:[], options:{} };
const filenames = ['.postcssrc', '.postcssrc.js', 'postcss.config.js', 'package.json'];

const isString = any => typeof any === 'string';
const isObject = any => !!any && typeof any === 'object' && !Array.isArray(any);
const isEmptyObj = any => isObject(any) && Object.keys(any).length === 0;

module.exports = function (task, utils) {
	const rootDir = str => res(task.root, str);
	const setError = msg => task.emit('plugin_error', { plugin:'@nickkaramoff/taskr-postcss', error:msg });
	const getConfig = arr => Promise.all(arr.map(utils.find)).then(res => res.filter(Boolean)).then(res => res[0]);

	task.plugin('postcss', { every:false }, function * (files, opts) {
		let config, isJSON = false;

		try {
			const { plugins, options } = postcssrc.sync(opts);
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
