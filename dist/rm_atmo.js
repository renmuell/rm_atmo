(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function e(n,t,i){function o(r,a){if(!t[r]){if(!n[r]){var u="function"==typeof require&&require;if(!a&&u)return u(r,!0);if(s)return s(r,!0);throw new Error("Cannot find module '"+r+"'")}var c=t[r]={exports:{}};n[r][0].call(c.exports,function(e){var t=n[r][1][e];return o(t?t:e)},c,c.exports,e,n,t,i)}return t[r].exports}for(var s="function"==typeof require&&require,r=0;r<i.length;r++)o(i[r]);return o}({1:[function(e,n,t){"use strict";e("./vendors/polyfils"),function(e){var n={version:"0.1.9",create:function(e){var n={stepTimeThen:0,stepTimeNow:0,stepTimeElapsed:0,isRunning:!1,canvas:void 0,context:void 0,pluginList:[],requestAnimationFrameId:void 0,init:function(){n.createDomElement(),n.createPluginList(),n.callPlugins("init",[n])},start:function(){n.isRunning=!0,n.stepTimeElapsed=0,n.stepTimeNow=0,n.stepTimeThen=0,n.callPlugins("start"),n.loop()},stop:function(){n.isRunning=!1,n.stepTimeElapsed=0,n.stepTimeNow=0,n.stepTimeThen=0,n.requestAnimationFrameId&&window.cancelAnimationFrame(n.requestAnimationFrameId),n.callPlugins("stop")},stepFn:function(){n.stepTimeNow=(new Date).getTime(),0!==n.stepTimeThen&&(n.stepTimeElapsed=n.stepTimeNow-n.stepTimeThen),n.autoClear&&n.clear(),n.callPlugins("preStep",[n.context,n.canvas.width,n.canvas.height,n.stepTimeElapsed]),n.step.call(t,n.context,n.canvas.width,n.canvas.height,n.stepTimeElapsed),n.callPlugins("postStep",[n.context,n.canvas.width,n.canvas.height,n.stepTimeElapsed]),n.stepTimeThen=n.stepTimeNow},clear:function(){n.context.clearRect(0,0,n.canvas.width,n.canvas.height)},loop:function(){n.isRunning&&(n.stepFn(),n.requestAnimationFrameId=window.requestAnimationFrame(n.loop))},createDomElement:function(){n.canvas=document.createElement("canvas"),n.domElement.appendChild(n.canvas),n.context=n.canvas.getContext("2d"),n.style&&n.setStyle(n.style),n.resizeTo(n.width||n.canvas.width,n.height||n.canvas.height)},destroy:function(){n.callPlugins("destroy"),n.canvas.remove()},setStyle:function(e){for(var t in e)n.canvas.style[t]=e[t]},resizeTo:function(e,t){n.width=n.canvas.width=e,n.height=n.canvas.height=t},callPlugins:function(e,t){n.pluginList.forEach(function(n){n[e]&&n[e].apply(void 0,t)})},createPluginList:function(){for(var e in n.plugins)n.plugins.hasOwnProperty(e)&&"undefined"!=typeof n.plugins[e]&&"undefined"!=typeof n.plugins[e].cEnginePlugin&&n.pluginList.push(n.plugins[e])}};Object.assign(n,{domElement:document.body,autoClear:!1,step:void 0,width:void 0,height:void 0,style:void 0,plugins:{}},e),n.init();var t={plugins:n.plugins,stop:function(){return n.stop(),t},step:function(e){return e&&e>1?(n.stepFn(),t.step(--e)):(n.stepFn(),t)},start:function(){return n.start(),t},clear:function(){return n.clear(),t},destroy:function(){n.stop(),n.destroy(),n=void 0}};return t},extend:function(e,t){if("undefined"==typeof e||"undefined"==typeof t)throw new Error("id or plugin is undefined!");if(""===e)throw new Error("id is empty!");if(n[e])throw new Error("skiped cEngine-plugin ["+e+']. Maybe already attached or uses intern blocked name like "create", "extend" or "version"!');if("undefined"==typeof t.create)throw new Error("plugin has no create function!");n[e]=t}};e.cEngine=n}("undefined"!=typeof window?window:void 0)},{"./vendors/polyfils":2}],2:[function(e,n,t){"function"!=typeof Object.assign&&!function(){Object.assign=function(e){"use strict";if(void 0===e||null===e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),t=1;t<arguments.length;t++){var i=arguments[t];if(void 0!==i&&null!==i)for(var o in i)i.hasOwnProperty(o)&&(n[o]=i[o])}return n}}()},{}]},{},[1]);


},{}],2:[function(require,module,exports){
!function e(i,n,t){function o(r,d){if(!n[r]){if(!i[r]){var a="function"==typeof require&&require;if(!d&&a)return a(r,!0);if(s)return s(r,!0);throw new Error("Cannot find module '"+r+"'")}var l=n[r]={exports:{}};i[r][0].call(l.exports,function(e){var n=i[r][1][e];return o(n?n:e)},l,l.exports,e,i,n,t)}return n[r].exports}for(var s="function"==typeof require&&require,r=0;r<t.length;r++)o(t[r]);return o}({1:[function(e,i,n){"use strict";!function(e){!function(){var e=function(e,i,n){n=n||window;var t=!1,o=function(){t||(t=!0,requestAnimationFrame(function(){n.dispatchEvent(new CustomEvent(i)),t=!1}))};n.addEventListener(e,o)};e("resize","optimizedResize")}(),e.extend("fill",{create:function(e){e=e||{};var i={cEnginePlugin:{name:"fill",version:"0.0.2"},mode:e.mode,useFixedResolution:!1,aspectRetion:"undefined"!=typeof e.aspectRetion&&e.aspectRetion,useResolutionDevider:"undefined"!=typeof e.useResolutionDevider&&e.useResolutionDevider,resolutionDevider:e.resolutionDevider||2,engine:void 0,initHeight:void 0,initWidth:void 0,init:function(e){i.engine=e,i.initWidth=e.width,i.initHeight=e.height,"fill"===i.mode?(window.addEventListener("optimizedResize",i.resizeTo,!1),i.resizeTo()):(i.aspectRetion&&(window.addEventListener("optimizedResize",i.resizeToRatio,!1),i.resizeToRatio()),"stretch"===i.mode&&("static"===e.domElement.style.position&&(e.domElement.style.position="relative"),e.canvas.style.position="absolute",e.canvas.style.top="0",e.canvas.style.left="0",e.canvas.style.width="100%",e.canvas.style.height="100%",e.width=e.domElement.clientWidth,e.height=e.domElement.clientHeight))},destroy:function(){window.removeEventListener("optimizedResize",i.resizeTo,!1),window.removeEventListener("optimizedResize",i.resizeToRatio,!1)},resizeToRatio:function(){var e=i.engine.domElement.clientWidth/i.engine.domElement.clientHeight;i.engine.canvas.height=i.initHeight,i.engine.canvas.width=i.engine.canvas.height*e,i.engine.width=i.engine.domElement.clientWidth,i.engine.height=i.engine.domElement.clientHeight},resizeTo:function(){if(i.useResolutionDevider){i.engine.canvas.width=i.engine.domElement.clientWidth/i.engine.resolutionDevider,i.engine.canvas.height=i.engine.domElement.clientHeight/i.engine.resolutionDevider,i.engine.canvas.style.transformOrigin="0% 0%";var e=i.resolutionDevider;i.engine.canvas.style.transform="scale("+e+", "+e+")"}else i.engine.canvas.width=i.engine.domElement.clientWidth,i.engine.canvas.height=i.engine.domElement.clientHeight;i.engine.width=i.engine.domElement.clientWidth,i.engine.height=i.engine.domElement.clientHeight}};return i}})}(cEngine)},{}]},{},[1]);


},{}],3:[function(require,module,exports){
!function e(n,t,i){function r(s,p){if(!t[s]){if(!n[s]){var f="function"==typeof require&&require;if(!p&&f)return f(s,!0);if(o)return o(s,!0);throw new Error("Cannot find module '"+s+"'")}var u=t[s]={exports:{}};n[s][0].call(u.exports,function(e){var t=n[s][1][e];return r(t?t:e)},u,u.exports,e,n,t,i)}return t[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)r(i[s]);return r}({1:[function(e,n,t){"use strict";!function(e){e.extend("frameRate",{create:function(e){e=e||{};var n={cEnginePlugin:{name:"frameRate",version:"0.0.1"},fps:e.fps||60,fpsInterval:void 0,currentFrame:0,init:function(e){n.setFps(n.fps),n.engine=e,n.engine.loop=n.loop},start:function(){n.engine.stepTimeNow=Date.now(),n.engine.stepTimeThen=n.engine.stepTimeNow},setFps:function(e){n.fps=e,n.fpsInterval=1e3/n.fps},postStep:function(){n.currentFrame++},loop:function(){n.engine.isRunning&&(n.engine.stepTimeNow=(new Date).getTime(),n.engine.stepTimeElapsed=n.engine.stepTimeNow-n.engine.stepTimeThen,n.engine.stepTimeElapsed>n.fpsInterval&&(n.engine.stepFn(),n.engine.stepTimeThen=n.engine.stepTimeNow-n.engine.stepTimeElapsed%n.fpsInterval),requestAnimationFrame(n.loop))}};return n}})}(cEngine)},{}]},{},[1]);


},{}],4:[function(require,module,exports){
!function e(n,o,t){function u(r,s){if(!o[r]){if(!n[r]){var c="function"==typeof require&&require;if(!s&&c)return c(r,!0);if(i)return i(r,!0);throw new Error("Cannot find module '"+r+"'")}var v=o[r]={exports:{}};n[r][0].call(v.exports,function(e){var o=n[r][1][e];return u(o?o:e)},v,v.exports,e,n,o,t)}return o[r].exports}for(var i="function"==typeof require&&require,r=0;r<t.length;r++)u(t[r]);return u}({1:[function(e,n,o){"use strict";!function(e){var n={create:function(e){e=e||{};var o={cEnginePlugin:{name:"inputPlugin",version:"0.0.4"},onTouch:e.onTouch||function(){},engine:void 0,keys:{},touches:[],mouseIsTouching:!1,mouseTouch:void 0,init:function(e){o.engine=e,o.engine.canvas.addEventListener("touchmove",o.touchmove),o.engine.canvas.addEventListener("touchstart",o.touchmove),o.engine.canvas.addEventListener("mousemove",o.mousemove),o.engine.canvas.addEventListener("mousedown",o.mousedown),window.document.addEventListener("mouseup",o.mouseup),window.document.addEventListener("keydown",o.onKeydown),window.document.addEventListener("keyup",o.onKeyup)},postStep:function(){if(o.mouseTouch&&(o.onTouch(o.getCanvasPosition(o.mouseTouch)),o.mouseTouch=void 0),o.touches.length>0){for(var e=0;e<o.touches.length;e++)o.onTouch(o.getCanvasPosition(o.touches[e]));o.touches=[]}},destroy:function(){o.engine.canvas.removeEventListener("mousemove",o.mousemove),o.engine.canvas.removeEventListener("mousedown",o.mousedown),window.document.removeEventListener("mouseup",o.mouseup),o.engine.canvas.removeEventListener("touchstart",o.touchmove),o.engine.canvas.removeEventListener("touchmove",o.touchmove),window.document.removeEventListener("keydown",o.onKeydown),window.document.removeEventListener("keyup",o.onKeyup)},mousedown:function(e){if(1==e.which)return e.preventDefault(),e.stopImmediatePropagation(),o.mouseIsTouching=!0,o.mouseTouch=e,!1},mousemove:function(e){if(1==e.which)return e.preventDefault(),e.stopImmediatePropagation(),o.mouseIsTouching&&(o.mouseTouch=e),!1},mouseup:function(e){if(1==e.which)return e.preventDefault(),e.stopImmediatePropagation(),o.mouseTouch=e,o.mouseIsTouching=!1,!1},touchmove:function(e){return e.preventDefault(),e.stopImmediatePropagation(),o.touches=e.targetTouches,!1},onKeydown:function(e){o.keys[n.KeyCode[e.keyCode]]=!0},onKeyup:function(e){o.keys[n.KeyCode[e.keyCode]]=!1},getCanvasPosition:function(e){var n=o.engine.canvas.getBoundingClientRect(),t={x:e.clientX-n.left,y:e.clientY-n.top};return o.engine.useResolutionDevider&&(t.x=t.x/o.engine.resolutionDevider,t.y=t.y/o.engine.resolutionDevider),t}};return o},KeyCode:{27:"ESC",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z"}};e.extend("input",n)}(cEngine)},{}]},{},[1]);


},{}],5:[function(require,module,exports){
module.exports=function(){'use strict';function getNthRoot(value,n){return Math.pow(value,1/n)}function isValidNoteName(noteName){var validNameRegex=/^[A-G][b#]?[0-8]$/;return'string'==typeof noteName&&validNameRegex.test(noteName)}function isScaleTypeDefined(scaleName){return scaleDefs.hasOwnProperty(scaleName)}function isValidScaleName(scaleName){var scaleNameRegex=/^[A-Za-z\-\_ ]+$/;return'string'==typeof scaleName&&scaleNameRegex.test(scaleName)}function isValidScaleDefinition(scaleDef){return Array.isArray(scaleDef)&&scaleDef.every(isPositiveIntegerGreaterThanZero)}function isPositiveIntegerGreaterThanZero(value){return'number'==typeof value&&value%1===0&&value>0}function getNoteByInterval(reference,interval){var frequency=reference*Math.pow(TWELFTH_ROOT,interval);return frequency=frequency>MAX_FREQUENCY?MAX_FREQUENCY:frequency,frequency=MIN_FREQUENCY>frequency?MIN_FREQUENCY:frequency,Math.round(100*frequency)/100}function getCentsByInterval(interval){return interval*CENTS_PER_SEMITONE}function getIntervalFromA4(noteName,octave){var semitonesInOctave=12,A4Octave=4,intervalsRelativeToA={C:-9,D:-7,E:-5,F:-4,G:-2,A:0,B:2};return intervalsRelativeToA[noteName]+(octave-A4Octave)*semitonesInOctave}function getIntervalAdjustment(sharpOrFlat){var adjustments={'#':1,b:-1};return'#'!==sharpOrFlat&&'b'!==sharpOrFlat?0:adjustments[sharpOrFlat]}function getScaleNames(){var scaleName,scaleNames=[];for(scaleName in scaleDefs)scaleDefs.hasOwnProperty(scaleName)&&scaleNames.push(scaleName);return scaleNames}function getNote(noteString){if(!isValidNoteName(noteString))throw new Error('Invalid argument noteString: getNote(noteString) noteString should be a valid note name, eg. "Ab0", "C7"');var intervalFromA,adjustedInterval,noteNameMatch=noteString.match(/^[A-G]/g),sharpOrFlatMatch=noteString.match(/[b#]/g),octaveMatch=noteString.match(/[0-8]/g),noteName=noteNameMatch?noteNameMatch[0]:null,sharpOrFlat=sharpOrFlatMatch?sharpOrFlatMatch[0]:null,octave=octaveMatch?parseInt(octaveMatch[0],10):null;return intervalFromA=getIntervalFromA4(noteName,octave),adjustedInterval=intervalFromA+getIntervalAdjustment(sharpOrFlat),getNoteByInterval(REF_FREQUENCIES.A4,adjustedInterval)}function makeScale(scaleType,startNote,noteCount){if(arguments.length<3)throw new Error('Missing argument(s): makeScale() expects three arguments');if(!isValidScaleName(scaleType))throw new Error('Invalid argument scaleType: makeScale(scaleType, startNote, noteCount) expects scaleType to be a string consisting of lower or upper case letters (A-Z, a-z), spaces, hyphens(-) or underscores(_) only');if(!isScaleTypeDefined(scaleType))throw new Error('Scale type is undefined: makeScale(scaleType, startNote, noteCount) scale with name provided for scaleType is not defined – make sure you choose from available scale types');if(!isPositiveIntegerGreaterThanZero(noteCount))throw new Error('Invalid argument noteCount: makeScale(scaleType, startNote, noteCount) expects noteCount to be a positive integer greater than 0');if(!isValidNoteName(startNote))throw new Error('Invalid argument startNote: makeScale(scaleType, startNote, noteCount) startNote should be a valid note name, eg. "Ab0", "C7"');var i,scaleDef=scaleDefs[scaleType],scaleInHertz=[],scaleInCents=[],scaleInSemitones=[],intervalsFromStartNote=0,intervalCounter=0,startFrequency=getNote(startNote);for(scaleInHertz.push(startFrequency),scaleInCents.push(0),scaleInSemitones.push(0),i=0;noteCount-1>i;i+=1)intervalsFromStartNote+=scaleDef[intervalCounter],scaleInHertz.push(getNoteByInterval(startFrequency,intervalsFromStartNote)),scaleInCents.push(getCentsByInterval(intervalsFromStartNote)),scaleInSemitones.push(intervalsFromStartNote),intervalCounter=intervalCounter===scaleDef.length-1?0:intervalCounter+1;return{startNote:startFrequency,inHertz:scaleInHertz,inCents:scaleInCents,inSemiTones:scaleInSemitones}}function addScale(name,scaleDef){if(arguments.length<2)throw new Error('Missing argument(s): addScale() expects two arguments');if(!isValidScaleName(name))throw new Error('Invalid argument name: addScale(name, scaleDef) expects name to be a string consisting of lower or upper case letters (A-Z, a-z), spaces, hyphens(-) or underscores(_) only');if(isScaleTypeDefined(name))throw new Error('Scale type already defined: addScale(name, scaleDef) scale with value of name argument is already defined – make sure you choose a scale name not already in use');if(!isValidScaleDefinition(scaleDef))throw new Error('Invalid argument scaleDef: addScale(name, scaleDef) expects scaleDef to be an array of only positive integers greater than 0');scaleDefs[name]=scaleDef}var TWELFTH_ROOT=getNthRoot(2,12),REF_FREQUENCIES={A4:440,C0:16.35,B8:7902.13},MIN_FREQUENCY=REF_FREQUENCIES.C0,MAX_FREQUENCY=REF_FREQUENCIES.B8,CENTS_PER_SEMITONE=100,scaleDefs={};return scaleDefs.chromatic=[1],scaleDefs.wholeTone=[2],scaleDefs.major=[2,2,1,2,2,2,1],scaleDefs.majorPentatonic=[2,2,3,2,3],scaleDefs.minorPentatonic=[3,2,2,3,2],scaleDefs.kuomiPentatonic=[1,4,2,1,4],scaleDefs.chinesePentatonic=[4,2,1,4,1],scaleDefs.naturalMinor=[2,1,2,2,1,2,2],scaleDefs.harmonicMinor=[2,1,2,2,1,3,1],scaleDefs.melodicMinor=[2,1,2,2,2,2,1],{makeScale:makeScale,getNote:getNote,addScale:addScale,getScaleNames:getScaleNames,test:{getIntervalFromA4:getIntervalFromA4,getIntervalAdjustment:getIntervalAdjustment,getCentsByInterval:getCentsByInterval,getNoteByInterval:getNoteByInterval,isValidNoteName:isValidNoteName,isValidScaleName:isValidScaleName,isValidScaleDefinition:isValidScaleDefinition,isPositiveIntegerGreaterThanZero:isPositiveIntegerGreaterThanZero,isScaleTypeDefined:isScaleTypeDefined}}}();
},{}],6:[function(require,module,exports){
/******************************************************************************
 * backgroundSong.js
 *
 * With this module a background song can be looped.
 *
 * @author Rene Müller <rene.mueller.code@gmail.com>
 *****************************************************************************/

/**
 *  @param {string} url - song URL
 */
const BackgroundSong = function (url) {

  /* new instance */

  const backgroundSong = {

    /**
     *  background song
     *  @type {Audio}
     */
    song: new Audio(url),

    /**
     *  Attach and start the song
     *  
     *  @public  
     */
    init: () => {

      backgroundSong.song.addEventListener('canplaythrough', () => {
        backgroundSong.song.loop = true
        backgroundSong.song.play()
      })

      document.body.appendChild(backgroundSong.song)

      if (backgroundSong.song.readyState > 3) {
        backgroundSong.song.loop = true
        backgroundSong.song.play()
      }

    }
  }

  return backgroundSong
}

module.exports =  BackgroundSong

},{}],7:[function(require,module,exports){
/******************************************************************************
 * circle.js
 *
 * With this module a circle-entity can be created.
 *
 * @author Rene Müller <rene.mueller.code@gmail.com>
 *****************************************************************************/

/**
 *  @param {number} x - x position
 *  @param {nubmer} y - y position
 */
const Circle = function (x, y){

  /* new instance */

  const circle = { 

    x           : x, 
    y           : y, 
    radius      : 100 * Math.random(), 

    /* stroke start and end angle */
    startAngle  : Math.random() * (2 * Math.PI), 
    endAngle    : ((Math.random() * (2 * Math.PI)) + Math.random() * 10) % (2 * Math.PI),
    
    /* the rate of change, each step */
    startAngleChange : Math.random()/10,
    endAngleChange   : (Math.random()/10) * 2,

    death       : false,
    lifeTime    : 500 * Math.random(),

    /* how long alive */
    framesAlive : 0, 

    /**
     *  Entity update method to change status and appearance.
     *
     *  @public
     */
    update: () => {
      circle.startAngle = (circle.startAngle + circle.startAngleChange) % (2 * Math.PI)
      circle.endAngle   = (circle.endAngle   + circle.endAngleChange)   % (2 * Math.PI)

      circle.x         += (Math.random() - 0.5)
      circle.y         -= (Math.random() - 0.5)

      circle.death = ++circle.framesAlive > circle.lifeTime
    },

    /**
     *  Entity draw method. Draws stroke of circle from start- to end-angle.
     *
     *  @public
     *  @param {CanvasRenderingContext2D} context - canvas context
     */
    draw: (context) => {
      context.beginPath()

      context.arc(
        circle.x, 
        circle.y, 
        circle.radius, 
        circle.startAngle, 
        circle.endAngle)
      
      context.lineWidth = Math.max(1, circle.framesAlive / 100) + 
                          ((Math.random() - 0.5) * (circle.framesAlive / 10))
      
      context.shadowColor = context.strokeStyle = 'white'
      context.stroke()   
    }
  }

  return circle
}

module.exports = Circle

},{}],8:[function(require,module,exports){
/******************************************************************************
 * dayTime.js
 *
 * With this module a updatable background which reflects the daytime can
 * be created.
 *
 * There are four types of daytime (morning, day, night, afternoon). Each 
 * daytime is one div-Element and has his own background-color. By changing
 * the opacity of each div, the current daytime can be reflect and two 
 * daytimes can be fading into each other. 
 *
 * @author Rene Müller <rene.mueller.code@gmail.com>
 *****************************************************************************/

/**
 *  @param {HTMLElement} domElement - root element
 */
const DayTime = function (options){

  /* new instance */

  const dayTime = {

    /**
     *  Colors for day, night, morning and afternoon.
     * 
     *  @type {object}
     *  @public
     */
    colors: options.colors,

    /* HTMLElements for each daytime */
    $day       : document.createElement('div'), //  6 - 18
    $night     : document.createElement('div'), // 18 -  6 
    $morning   : document.createElement('div'), //  3 -  9 
    $afternoon : document.createElement('div'), // 15 - 21

    lastSetHour: -1,

    /**
     *  Initialize daytime instance
     *  @private
     */
    init: () => {
      dayTime.createDom()
    },

    /**
     *  Appends each daytime the root element
     *  @private
     */
    createDom: () => {
      dayTime.appendChild(dayTime.$day       , dayTime.colors.day)
      dayTime.appendChild(dayTime.$night     , dayTime.colors.night)
      dayTime.appendChild(dayTime.$morning   , dayTime.colors.morning)
      dayTime.appendChild(dayTime.$afternoon , dayTime.colors.afternoon)

      var css = ".rm_atmo-day-color{color:"+dayTime.colors.day+"}";
      css    += ".rm_atmo-day-background-color{background-color:"+dayTime.colors.day+"}"; 

      css    += ".rm_atmo-night-color{color:"+dayTime.colors.night+"}";
      css    += ".rm_atmo-night-background-color{background-color:"+dayTime.colors.night+"}"; 

      css    += ".rm_atmo-morning-color{color:"+dayTime.colors.morning+"}";
      css    += ".rm_atmo-morning-background-color{background-color:"+dayTime.colors.morning+"}"; 

      css    += ".rm_atmo-afternoon-color{color:"+dayTime.colors.afternoon+"}";
      css    += ".rm_atmo-afternoon-background-color{background-color:"+dayTime.colors.afternoon+"}"; 

      var style = document.createElement("style");
      style.type = 'text/css';
      style.id = "rm_atmo_static_styles";
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    },

    /**
     *  Append element to the root element
     *  
     *  @private
     *  @param {HTMLElement} child - child to add to the DOM
     *  @param {string} color - CSS background-color
     */
    appendChild: (child, color) => {

      child.style.position        = 'absolute'

      child.style.left            = 0
      child.style.right           = 0
      child.style.top             = 0
      child.style.bottom          = 0

      child.style.zIndex          = -1000000
      child.style.opacity         = 0
      child.dataset.color         = color;
      child.style.backgroundColor = color

      options.domElement.appendChild(child)
    },

    /**
     *  Entity update method to change daytime status.
     *
     *  @public
     */
    update: () => {
      const hour = new Date().getHours()

      if (dayTime.lastSetHour != hour) {

        dayTime.$day.style.opacity       = (hour >= 6  && hour <= 18) ? 1                                   : 0
        dayTime.$night.style.opacity     = (hour >= 6  && hour <= 18) ? 0                                   : 1
        dayTime.$morning.style.opacity   = (hour >= 3  && hour <= 9 ) ? (-0.1 * Math.pow(hour - 6 , 2)) + 1 : 0 
        dayTime.$afternoon.style.opacity = (hour >= 15 && hour <= 21) ? (-0.1 * Math.pow(hour - 18, 2)) + 1 : 0

        var color;

        if (dayTime.$day.style.opacity > 0) {
          if (dayTime.$morning.style.opacity > 0) {
            color = calculateTransparentColor(
              dayTime.$morning.dataset.color,
              dayTime.$day.dataset.color,
              dayTime.$morning.style.opacity);
          } else {
            color = calculateTransparentColor(
              dayTime.$afternoon.dataset.color,
              dayTime.$day.dataset.color,
              dayTime.$afternoon.style.opacity);
          }
        } else {
          if (dayTime.$morning.style.opacity > 0) {
            color = calculateTransparentColor(
              dayTime.$morning.dataset.color,
              dayTime.$night.dataset.color,
              dayTime.$morning.style.opacity);
          } else {
            color = calculateTransparentColor(
              dayTime.$afternoon.dataset.color,
              dayTime.$night.dataset.color,
              dayTime.$afternoon.style.opacity);
          }
        }
        
        dayTime.updateDynamicStyles(color);

        dayTime.lastSetHour = hour;
      }
    },

    updateDynamicStyles: function (color) {

      var oldStyles = document.getElementById("rm_atmo_dynamic_styles");
      if (oldStyles) {
        oldStyles.remove();
      }

      var css = ".rm_atmo-daytime-color{color:"+color+"}";
      css    += ".rm_atmo-daytime-background-color{background-color:"+color+"}"; 

      var style = document.createElement("style");
      style.type = 'text/css';
      style.id = "rm_atmo_dynamic_styles";
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    }
  }

  dayTime.init()

  return dayTime

  function calculateTransparentColor(
    foregroundColor, 
    backgroundColor, 
    opacity
  ) {
      if (opacity < 0.0 || opacity > 1.0) {
          alert("assertion, opacity should be between 0 and 1");
      }
  
      opacity = opacity * 1.0; // to make it float
      var foregroundRGB = colorHexToRGB(foregroundColor);
      var backgroundRGB = colorHexToRGB(backgroundColor);
      var finalRed   = Math.round(backgroundRGB.r * (1-opacity) + foregroundRGB.r * opacity);
      var finalGreen = Math.round(backgroundRGB.g * (1-opacity) + foregroundRGB.g * opacity);
      var finalBlue  = Math.round(backgroundRGB.b * (1-opacity) + foregroundRGB.b * opacity);
      return colorRGBToHex(finalRed, finalGreen, finalBlue);
  }
  
  function colorHexToRGB (htmlColor) {
      var COLOR_REGEX = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
      var arrRGB = htmlColor.match(COLOR_REGEX);
      if (arrRGB == null) {
          alert("Invalid color passed, the color should be in the html format. Example: #ff0033");
      }
      var red   = parseInt(arrRGB[1], 16);
      var green = parseInt(arrRGB[2], 16);
      var blue  = parseInt(arrRGB[3], 16);
      return {"r":red, "g":green, "b":blue};
  }

  function colorRGBToHex(red, green, blue) {
      if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255) {
          alert("Invalid color value passed. Should be between 0 and 255.");
      }

      var hexRed   = formatHex(red.toString(16));
      var hexGreen = formatHex(green.toString(16));
      var hexBlue  = formatHex(blue.toString(16));

      return "#" + hexRed + hexGreen + hexBlue;
  }

  function formatHex(value) {
      value = value + "";
      if (value.length == 1) {
          return "0" + value;
      }
      return value;
  }
}

module.exports =  DayTime

},{}],9:[function(require,module,exports){
/******************************************************************************
 * enityList.js
 *
 * With this module all entires can be maintained. This data structure allows
 * to add new entities, call update and draw on all current entities. Also 
 * all entities not needed anymore will be cleared, after more than 50 entities
 * are dead.
 *
 * @author Rene Müller <rene.mueller.code@gmail.com>
 *****************************************************************************/

const EntityList = function  () {

  /* new instance */

  const entityList = {

    /**
     *  how many are dead
     *  @private
     *  @types {number}
     */
    numDeath: 0,

    /**
     *  list of all entities
     *  @private
     *  @types {array}
     */
    entities: [],

    /**
     *  Add new entity
     *
     *  @public
     *  @param {object} entity - new entity
     */
    add: (entity) => {
      entityList.entities.push(entity)
    },

    /**
     *  Call update on all entities. Also checks
     *  if there are enough dead entities, to
     *  clear them.
     *
     *  @public
     */
    update: () => {
      entityList.entities.forEach(entity => {

        if (!entity.death) {

          entity.update()

          if (entity.death) {
            entityList.numDeath++
          }       
        }
      })

      if (entityList.numDeath > 50) {
        entityList.clearDeath()
      }
    },

    /**
     *  Call draw on all entities.
     *
     *  @public
     *  @param {CanvasRenderingContext2D} context - canvas context
     *  @param {number} height - canvas height
     *  @param {number} width - canvas width
     */
    draw: (context, height, width) => {
      entityList.entities.forEach(entity => {
        if (!entity.death){
          entity.draw(context, height, width)         
        }
      })
    },

    /**
     *  Call update on all entities. Also checks
     *  if there are enough dead entities, to
     *  clear them.
     *
     *  @private
     */
    clearDeath: () => {
      let tmp = []

      entityList.entities.forEach(entity => {
        if (!entity.death){
          tmp.push(entity)
        }
      })

      entityList.entities = tmp
    }
  }

  return entityList
}

module.exports =  EntityList

},{}],10:[function(require,module,exports){
/******************************************************************************
 * userTab.js
 *
 * With this module a userTab-entity can be created.
 *
 * A userTab will be visualized by a circle and a music note will be played.
 * The pitch and volume of the node will dependent by the touch position.
 *
 *  * volume is depended on y-position (top:low to bottom:loud)
 *  * pitch on x-position (left:low to right:high)
 *  * notes: 11-notes from g-major-scale start form G4
 *
 * @author Rene Müller <rene.mueller.code@gmail.com>
 *****************************************************************************/

/*eslint no-console:0*/

/* vendor */

var ScaleMaker = require('../../node_modules/scale-maker/lib/node/scaleMaker.min');

// global statics
window.AudioContext = window.AudioContext || window.webkitAudioContext
const AudioContext  = new window.AudioContext()
const noteLength    = 0.5
const scale         = ScaleMaker.makeScale('major', 'G#4', 11)

/**
 *  @param {object} data - position data of user interaction
 *  @param {bool} muted - is user tap muted, true if yes
 */
const UserTap = function  (data, muted = false){

  /* new instance */

  const userTap = {

    data        : data,

    death       : false,
    lifeTime    : 10,
    framesAlive : 0,

    /**
     *  Initialize userTab instance
     *
     *  @private
     */
    init: () => {
      userTap.playNote()
    },

    /**
     *  Plays note dependent on user position. This method uses 
     *  AudioContext to create sound.
     *
     *  @private
     */
    playNote: () => {

      const oscillator  = AudioContext.createOscillator(),
            gainNode    = AudioContext.createGain(),
            volume      = muted ? 0 : 0.10 * userTap.data.y,
            time        = AudioContext.currentTime + noteLength,
            noteInHertz = scale.inHertz[Math.floor(userTap.data.x * scale.inHertz.length)]

      if (noteInHertz) {

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(noteInHertz, AudioContext.currentTime); // value in hertz

        gainNode.connect(AudioContext.destination);
        oscillator.connect(gainNode);

        oscillator.start(time);
        gainNode.gain.setValueAtTime(0, time); // initial

        gainNode.gain.linearRampToValueAtTime(volume, time + 0.5); // attack
        gainNode.gain.setValueAtTime(volume, time + noteLength - 0.5); // sustain
        gainNode.gain.linearRampToValueAtTime(0, time + noteLength + 0.5); // release
        oscillator.stop(time + noteLength + 0.5); // kill
      }
    },

    /**
     *  Entity update method to change status.
     *
     *  @public
     */
    update: () => {
      userTap.death = ++userTap.framesAlive > userTap.lifeTime
    },

    /**
     *  Entity draw method. Draws circle of touch position.
     *
     *  @public
     *  @param {CanvasRenderingContext2D} context - canvas context
     */
    draw: (context) => {

      const lifePercent = (userTap.lifeTime - userTap.framesAlive) / userTap.lifeTime 

      context.beginPath()

      context.arc(
        context.canvas.width  * userTap.data.x, 
        context.canvas.height * userTap.data.y, 
        lifePercent * 10, 
        0, 
        2 * Math.PI)
      
      context.shadowColor = context.fillStyle = 'rgba(255, 255, 255, ' + lifePercent + ')'

      context.fill()

      context.beginPath()

      context.arc(
        context.canvas.width  * userTap.data.x, 
        context.canvas.height * userTap.data.y, 
        10, 
        0, 
        2 * Math.PI)

      context.lineWidth = ((Math.random() - 0.5) * userTap.framesAlive)

      context.shadowColor = context.strokeStyle = 'rgba(255, 255, 255, ' + Math.random() * lifePercent + ')'

      context.stroke()
    } 
  }
  
  userTap.init()

  return userTap
}

module.exports =  UserTap

},{"../../node_modules/scale-maker/lib/node/scaleMaker.min":5}],11:[function(require,module,exports){
/******************************************************************************
 * rm_atmo.js
 * https://github.com/renmuell/rm_atmo
 *
 * This is an js-canvas driven atmospheric visualization with interaction.
 *
 * @see README.md for more information
 *
 * @author Rene Müller <rene.mueller.code@gmail.com>
 *****************************************************************************/

(function (global){

  /* vendors */

  require('../node_modules/cengine/dist/cEngine-min');
  require('../node_modules/cengine/dist/plugins/cEngine.frameRate-min');
  require('../node_modules/cengine/dist/plugins/cEngine.fill-min');
  require('../node_modules/cengine/dist/plugins/cEngine.input-min');

  /* modules */

  var DayTime        = require('./modules/daytime');
  var UserTab        = require('./modules/userTab');
  var Circle         = require('./modules/circle');
  var EntityList     = require('./modules/entityList');
  var BackgroundSong = require('./modules/backgroundSong');

  global.rM_AtMo = {

    /**
     *  Creates new instance of rM_AtMo:
     *
     *  - initializes canvas-engine and starts it
     *  - adds background elements to show daytime
     *  - starts background song
     *  
     *  @param {object} options - configuration object has:
     *  {
     *      {HTMLElement} domElement - root element to fill with content.
     *      {string}      songUrl    - song URL to loop as background song.
     *      {bool}        muted      - is sound muted.
     *      {object}      colors     - colors for day, night, morning and afternoon. 
     *  }
     *
     *  @return {object} - new instance of rM_AtMo
     */
    create: function (options) {
      
      options = Object.assign({}, {
        domElement: document.body,
        songSrc: undefined,
        muted: false,
        colors: {
          day: '#00ADFF',
          night: '#3F2850',
          morning: '#7D8DF9',
          afternoon: '#E883E5'
        }
      }, options)

      /* new instance */

      const rM_AtMo = {

        /**
         *  all callbacks for onTap-Event
         *  @type {array<function>}
         *  @private
         */
        callbacks: [],

        /**
         *  current frame number
         *  @type {number}
         *  @private
         */
        frame: 0,

        /**
         *  EntityList-Object, for maintaining entities like userTouch or circle.
         *  @see modules/entiyList
         *  @private
         */
        entityList: EntityList(),

        /**
         *  BackgroundSong-Object
         *  @see modules/backgroundSong
         *  @private
         */
        song: typeof options.songSrc != "undefined" ? BackgroundSong(options.songSrc) : undefined,

        /**
         *  DayTime-Object
         *  @see modules/dayTime
         *  @private
         */
        dayTime: DayTime(options),
        
        /**
         *  Is sound muted
         *  @type bool
         *  @private
         */
        muted: options.muted,

        /**
         *  cEngine Instance - Canvas Engine Object
         *  @see https://github.com/renmuell/cEngine
         *  @private
         */
        engine: cEngine.create({

          /* set root element for canvas */
          domElement: options.domElement,
          /* set resolution  */
          height: 512,
          /* redraw true */
          autoClear: true,
          /* add cEgnine Plug-Ins */
          plugins: {
            /* frame-rate limiter */
            frameRate: cEngine.frameRate.create({
              fps: 10
            }),
            /* canvas resize to full root element size */
            fill: cEngine.fill.create({
              mode: 'stretch',
              aspectRetion: true
            }),
            /* user interaction (desktop and mobile) */
            /* -> create new UserTap (music note) and fire event */
            input: cEngine.input.create({
              onTouch: (ev) => {
                const data = {
                  x: ev.x/options.domElement.scrollWidth,
                  y: ev.y/options.domElement.scrollHeight
                }
                rM_AtMo.entityList.add(UserTab(data, rM_AtMo.muted)) 
                rM_AtMo.emitOnTap(data)
              }
            })
          },
          /* add custom render step for cEngine  */
          /* -> background circle animation */
          step: (context, height, width) => {
            
            if (rM_AtMo.frame % 55 == 0 || (rM_AtMo.frame < 10)) {
              rM_AtMo.entityList.add(Circle(Math.random() * width, Math.random() * height))
            }
            
            rM_AtMo.dayTime.update()
            rM_AtMo.entityList.update() 

            context.shadowBlur = 24

            rM_AtMo.entityList.draw(context, height, width)
            rM_AtMo.frame++;
          }
        }),

        /**
         *  Initialize instance
         *  - start song
         *  - start canvas engine
         *
         *  @private
         */
        init: () => {
          setTimeout(function(){
            
            if (rM_AtMo.song) {
              rM_AtMo.song.init()
            }

            rM_AtMo.engine.start()

          }, 500)
        },

        /**
         *  Attach event handler for user interaction.
         * 
         *  @public
         *  @param {callback} - Event callback
         */
        onTap: (callback) => {
          rM_AtMo.callbacks.push(callback)
        },

        /**
         *  Add new UserTap to background.
         * 
         *  @public
         *  @param {object} data - UserTab data
         *  @param {number} data.x - x coordinate
         *  @param {number} data.y - y coordinate
         *  @param {bool} muted - is user tap muted, true if yes, is overruled if rm_atmo is muted.
         */
        addUserTap: (data, muted = false) => {
          rM_AtMo.entityList.add(UserTab(data, rM_AtMo.muted || muted))
        },

        /**
         *  Fires all callbacks for onTap-Event
         *
         *  @private
         *  @param {object} data - event data for all callbacks
         */
        emitOnTap: (data) => {
          rM_AtMo.callbacks.forEach(c => c(data))
        }
      }

      rM_AtMo.init()

      return rM_AtMo
    }
  }

}(typeof window !== 'undefined' ? window : this))

},{"../node_modules/cengine/dist/cEngine-min":1,"../node_modules/cengine/dist/plugins/cEngine.fill-min":2,"../node_modules/cengine/dist/plugins/cEngine.frameRate-min":3,"../node_modules/cengine/dist/plugins/cEngine.input-min":4,"./modules/backgroundSong":6,"./modules/circle":7,"./modules/daytime":8,"./modules/entityList":9,"./modules/userTab":10}]},{},[11]);
