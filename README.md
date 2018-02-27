# rm_atmo

[![npm version](https://badge.fury.io/js/rm_atmo.svg)](https://badge.fury.io/js/rm_atmo)

This is a js-canvas driven atmospheric visualization with interaction.

![rm_atmo teaser](https://renmuell.github.io/assets/img/rm_atmo.gif)

## Demo page

[https://renmuell.github.io/rm_atmo/](https://renmuell.github.io/rm_atmo/)

## Features:

* background-color reflects daytime, in four stages which blend into one another. (morning, day, afternoon, night)
* user-interaction: creates a music note on touch. 
  * volume is depended on y-position (top:low to bottom:loud)
  * pitch on x-position (left:low to right:high)
  * notes: 11-notes from g-major-scale start form G4
* a background song can be looped
* background-animation: circle outlines appear and hide in random places and sizes. They blink and fill in random speeds.
* with the use of the cEngine-Framework, the framerate is locked at 10FPS for performance reason. Also, the canvas is run at a lower resolution and scaled up. The canvas will fill any given root element from edges to edges. See more about these features here: [https://github.com/renmuell/cEngine](https://github.com/renmuell/cEngine)

## Getting started

Choose and copy one build script from /dist/ folder:

* rm_atmo.js
* rm_atmo.min.js

Include on your website:

```html
<script src=".../dist/rm_atmo.min.js"></script>
```

### Simple usage

This will attach everything to the Body and run.

```js
rM_AtMo.create();

```

#### Advanced usage

If you want to control the root element or loop an backgroung song, the create-method also accepts options:

```html
<div class="background"></div>
```

```js
var rm = rM_AtMo.create({
    domElement: document.getElementsByClassName("background")[0],
    songSrc: 'www.some.url.com/path/to/song.mp3'
});

```

## Methods of global rM_AtMo-object

Attach and create new rM_AtMo instance.

### create(options)

#### Arguments:

+ options - configuration objects has:
  + domElement - root element
  + songSrc - song url

#### Return:

new rm_AtMo instance

#### Example:

```js
var rm = rM_AtMo.create({
    domElement: document.getElementsByClassName("background")[0]
});

```

## Methods of created rA_AtMo-instance:

### onTab(callback)

Attach eventhandler for user touch event. The eventhandler will get the position of in percentage to the root element (x and y).

#### Arguments:

* callback <function> - a callback function which will fire on user touch

#### Returns:

nothing

#### Exampel:


```js
var rm = rM_AtMo.create();

rm.onTap(function (data) {
  console.log('Position X Percent:', data.x);
  console.log('Position Y Percent:', data.y);
});

```

## Development

### Dependencies

* [node](https://nodejs.org/)
* [browserify](http://browserify.org/)
    ```bash
    $ npm install browserify -g
    ```   
* [uglify-es](https://www.npmjs.com/package/uglify-es)
    ```bash
    $ npm install uglify-es -g
    ```   

### Set up

```bash
$ npm install
```

### Build

This will:

* create the final script rm_atmo.js to /dist/ folder
* minify script rm_atmo.min.js to /dist/ folder
* update demo with new script in /docs/js/ folder

```bash
$ npm run build
```
