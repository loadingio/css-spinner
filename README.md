# css-spinner

[Live Demo](https://loading.io/css/)

Collection of 12 small, elegant pure css spinners for your website's loading animation.

![css spinner](https://raw.githubusercontent.com/loadingio/css-spinner/master/web/static/thumbnail.gif)


## Features

 * vanilla - no external dependency and no additional library required.
 * standalone - use any of them separately.
 * customizable - use Stylus variables to quickly customize them to fit your needs.
 * easy to use - simply copy & paste while also easy to use with pug mixins.
 * small - average size 1K per spinner unminimized, unzipped

## Usage

[loading.io](https://loading.io/) provides a [web interface](https://loading.io/css/) to quickly choose and copy your desired spinners, yet you can still find the source code in this repository. The basic usage is as:

1. Find and download the html files of desired loader under [dist](https://github.com/loadingio/css-spinner/tree/master/dist/) folder.
2. Copy its content to the place you want to use this loader.

Separated CSS and HTML files are also available under [build](https://github.com/loadingio/css-spinner/tree/master/dist/entries) folder for reusing CSS codes to reduce payload size.

We also provide stylus and pug source files for better integrating these spinners into your project. Find corresponding stylus and pug files for your desired spinners under [src/](https://github.com/loadingio/css-spinner/tree/master/src) folders.

To use stylus files alone, you will have to provide variables listed in [vars.styl](https://github.com/loadingio/css-spinner/blob/master/vars.styl).

## npm package

This module is also released through npm as [@loadingio/css-spinner](https://www.npmjs.com/package/@loadingio/css-spinner).


## Build

You can also customize all these loaders by building them yourself.

 * First, update `vars.styl` based on your needs.
 * make sure required packages are installed by `npm install`. You will need NPM / NodeJS pre-installed.
 * build with this command: `npm run build`
   - generated files will be in `dist/` folder.


## Browser Compatibility

These spinners use CSS Animation and Transformation which is widely supported by major modern browsers except IE<=9.  To support older browsers like IE9, please use [loading.io](https://loading.io/animation/icon/) to generate alternative GIF Loaders instead.



## License

All loader files here are released under CC0 License. However, you could attribute to this link: [loading.io css spinner ( https://loading.io/css/ )](https://loading.io/css/) to give loading.io a thumbs-up.

Other source codes are released under MIT License.


## Other Resources

If you want to make custom css loading animation, loading.io also provides [loading.css](https://loading.io/animation/) - A pure CSS loading animation library, and a [helper GIF builder](https://loading.io/animation/icon/). Don't forget to check it out and share your customized loader with us!

