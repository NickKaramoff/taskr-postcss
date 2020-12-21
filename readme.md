# @nickkaramoff/taskr-postcss [![npm](https://badgen.net/npm/v/@nickkaramoff/taskr-postcss.svg)](https://npmjs.org/package/@nickkaramoff/taskr-postcss)

> [PostCSS](https://github.com/postcss/postcss) plugin for [Taskr](https://github.com/lukeed/taskr).

> ## Heads up!
>
> This is a fork of the official [@taskr/postcss](https://github.com/lukeed/taskr/tree/master/packages/postcss)
> package with a few differences:
>
> - this package uses PostCSS 8 (and not 6)
> - thus, this package supports Node version 10 and higher (like PostCSS 8 itself)
>
> While this can be used as a drop-in replacement for [@taskr/postcss](https://github.com/lukeed/taskr/tree/master/packages/postcss),
> there is no guarantee that your build won't break. Use with caution!

## Install

```
$ npm install --save-dev @nickkaramoff/taskr-postcss
```

## API

### .postcss([options])

Check out PostCSS's [Options](https://github.com/postcss/postcss#options) documentation to see the available options.

> **Note:** There should be no need to set `options.to` and `options.from`.

If you would like to [autoload external PostCSS config](#autoloaded-options), you must not define any `options` directly.


## Usage

#### Embedded Options

> Declare your PostCSS options directly within your `taskfile.js`:

```js
exports.styles = function * (task) {
  yield task.source('src/**/*.scss').postcss({
    plugins: [
      require('precss'),
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ],
    options: {
      parser: require('postcss-scss')
    }
  }).target('dist/css');
}
```

#### Autoloaded Options

> Automatically detect & connect to existing PostCSS configurations

If no [`options`](#api) were defined, `@nickkaramoff/taskr-postcss` will look for existing `.postcssrc`, `postcss.config.js`, and `.postcssrc.js` root-directory files. Similarly, it will honor a `"postcss"` key within your `package.json` file.

* `.postcssrc` -- must be JSON; see [example](/test/fixtures/sub1/.postcssrc)
* `.postcssrc.js` -- can be JSON or `module.exports` a Function or Object; see [example](/test/fixtures/sub4/.postcssrc.js)
* `postcss.config.js` -- can be JSON or `module.exports` a Function or Object; see [example](/test/fixtures/sub3/postcss.config.js)
* `package.json` -- must use `"postcss"` key & must be JSON; see [example](/test/fixtures/sub2/package.json)

> **Important:** If you take this route, you only need _one_ of the files mentioned!

```js
// taskfile.js
exports.styles = function * (task) {
  yield task.source('src/**/*.scss').postcss().target('dist/css');
}
```

```js
// .postcssrc
{
  "plugins": {
    "precss": {},
    "autoprefixer": {
      "browsers": ["last 2 versions"]
    }
  },
  "options": {
    "parser": "postcss-scss"
  }
}
```


## Support

Any issues or questions about Taskr can be sent to the
[Taskr monorepo](https://github.com/lukeed/taskr/issues/new).

Any issues about this package should be sent here.

## License

MIT © [Luke Edwards](https://lukeed.com)
MIT © [Nikita Karamov](https://karamoff.dev)
