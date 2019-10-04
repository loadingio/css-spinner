# CSS-Spinner

[Live Demo](https://loading.io/css/)

collection of 12 small, elegant pure css spinners for your website loading animation. 

![css spinner](https://github.com/loadingio/css-spinner/blob/master/thumbnail.gif?raw=true)


## Features

 * vanilla - no external dependency and no additional library required.
 * standalone - use any of them separately.
 * customizable - use Stylus variables to quickly customize them to fit your need.
 * easy to use - simple as copy and paste while also simple to use with pug mixins.
 * small - average size 1K per spinner unminimized, unzipped

## Usage

[loading.io](https://loading.io/css/) provides a [web interface](https://loading.io/css/) to quickly choose and copy your desired spinners, yet you can still find the source code in this repository. The simplest usage is as:

1. Find and download the html file of desired loader under [build/](https://github.com/loadingio/css-spinner/tree/master/build) folder.
2. Copy its content to the place you want to use this loader.
3. Done.

Separated CSS and HTML files are also available under [build](https://github.com/loadingio/css-spinner/tree/master/build) folder so that you can reuse the css to reduce payload size.

We also provide stylus and pug source files for better integrating these spinners into your project. Find corresponding stylus and pug files for your desired spinners under [src/](https://github.com/loadingio/css-spinner/tree/master/src) folders.

Additionally, you will need [vars.styl](https://github.com/loadingio/css-spinner/blob/master/vars.styl) and [basic.styl](https://github.com/loadingio/css-spinner/blob/master/basic.styl) if you are going to build by yourself. See following section for more detail.


## Customization

To customize speed and color of a loader, first ensure you have stylus install locally ( you will need npm too ):

    npm install -g stylus


then, edit vars.styl with your desired configuration. for now you can edit the following style of a spinner:

 * size
 * color
 * speed


once you've done with the editing, run stylus to build yourself a css file:

    stylus -o . --import vars.styl --import basic.styl src/<desired-loader>/main.styl


use the generated main.css together with build/<desired-loader>/main.html to add this loader in your project.


Browser Compatibility
----------------

These spinners use CSS Animation and Transformation which is widely supported by major modern browsers except IE<=9.  To support older browsers like IE9, please use [loading.io](https://loading.io/animation/icon/) to generate alternative GIF Loaders instead.



License
----------------

All loader files here are released under CC0 License. However, you could attribute to this link: [loading.io css spinner ( https://loading.io/css/ )](https://loading.io/css/) to give loading.io a thumbs-up.


Other Resources
----------------

If you want to make custom css loading animation, loading.io also provides [loading.css](https://loading.io/animation/) - A pure CSS loading animation library, and a [helper GIF builder](https://loading.io/animation/icon/). Don't forget to check it out and share your customized loader with us!

