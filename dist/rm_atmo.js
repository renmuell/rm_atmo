(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

var styleElementsInsertedAtTop = [];

var insertStyleElement = function(styleElement, options) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];

    options = options || {};
    options.insertAt = options.insertAt || 'bottom';

    if (options.insertAt === 'top') {
        if (!lastStyleElementInsertedAtTop) {
            head.insertBefore(styleElement, head.firstChild);
        } else if (lastStyleElementInsertedAtTop.nextSibling) {
            head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
        } else {
            head.appendChild(styleElement);
        }
        styleElementsInsertedAtTop.push(styleElement);
    } else if (options.insertAt === 'bottom') {
        head.appendChild(styleElement);
    } else {
        throw new Error('Invalid value for parameter \'insertAt\'. Must be \'top\' or \'bottom\'.');
    }
};

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes, extraOptions) {
        extraOptions = extraOptions || {};

        var style = document.createElement('style');
        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }

        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        } else if (style.styleSheet) { // for IE8 and below
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        }
    }
};

},{}],2:[function(require,module,exports){
!function e(n,t,i){function o(r,a){if(!t[r]){if(!n[r]){var u="function"==typeof require&&require;if(!a&&u)return u(r,!0);if(s)return s(r,!0);throw new Error("Cannot find module '"+r+"'")}var c=t[r]={exports:{}};n[r][0].call(c.exports,function(e){var t=n[r][1][e];return o(t?t:e)},c,c.exports,e,n,t,i)}return t[r].exports}for(var s="function"==typeof require&&require,r=0;r<i.length;r++)o(i[r]);return o}({1:[function(e,n,t){"use strict";e("./vendors/polyfils"),function(e){var n={version:"0.1.13",create:function(e){var n={stepTimeThen:0,stepTimeNow:0,stepTimeElapsed:0,isRunning:!1,canvas:void 0,context:void 0,pluginList:[],requestAnimationFrameId:void 0,init:function(){n.createDomElement(),n.createPluginList(),n.callPlugins("init",[n])},start:function(){n.isRunning=!0,n.stepTimeElapsed=0,n.stepTimeNow=0,n.stepTimeThen=0,n.callPlugins("start"),n.loop()},stop:function(){n.isRunning=!1,n.stepTimeElapsed=0,n.stepTimeNow=0,n.stepTimeThen=0,n.requestAnimationFrameId&&window.cancelAnimationFrame(n.requestAnimationFrameId),n.callPlugins("stop")},stepFn:function(){n.stepTimeNow=(new Date).getTime(),0!==n.stepTimeThen&&(n.stepTimeElapsed=n.stepTimeNow-n.stepTimeThen),n.autoClear&&n.clear(),n.callPlugins("preStep",[n.context,n.canvas.width,n.canvas.height,n.stepTimeElapsed]),n.step.call(t,n.context,n.canvas.width,n.canvas.height,n.stepTimeElapsed,n.plugins),n.callPlugins("postStep",[n.context,n.canvas.width,n.canvas.height,n.stepTimeElapsed]),n.stepTimeThen=n.stepTimeNow},clear:function(){n.context.clearRect(0,0,n.canvas.width,n.canvas.height)},loop:function(){n.isRunning&&(n.stepFn(),n.requestAnimationFrameId=window.requestAnimationFrame(n.loop))},createDomElement:function(){n.canvas=document.createElement("canvas"),n.domElement.appendChild(n.canvas),n.context=n.canvas.getContext("2d"),n.style&&n.setStyle(n.style),n.resizeTo(n.width||n.canvas.width,n.height||n.canvas.height)},destroy:function(){n.callPlugins("destroy"),n.canvas.remove()},setStyle:function(e){for(var t in e)n.canvas.style[t]=e[t]},resizeTo:function(e,t){n.width=n.canvas.width=e,n.height=n.canvas.height=t},callPlugins:function(e,t){n.pluginList.forEach(function(n){n[e]&&n[e].apply(void 0,t)})},createPluginList:function(){for(var e in n.plugins)n.plugins.hasOwnProperty(e)&&"undefined"!=typeof n.plugins[e]&&"undefined"!=typeof n.plugins[e].cEnginePlugin&&n.pluginList.push(n.plugins[e])}};Object.assign(n,{domElement:document.body,autoClear:!1,step:void 0,width:void 0,height:void 0,style:void 0,plugins:{}},e),n.init();var t={plugins:n.plugins,stop:function(){return n.stop(),t},step:function(e){return e&&e>1?(n.stepFn(),t.step(--e)):(n.stepFn(),t)},start:function(){return n.start(),t},clear:function(){return n.clear(),t},destroy:function(){n.stop(),n.destroy(),n=void 0}};return t},extend:function(e,t){if("undefined"==typeof e||"undefined"==typeof t)throw new Error("id or plugin is undefined!");if(""===e)throw new Error("id is empty!");if(n[e])throw new Error("skiped cEngine-plugin ["+e+']. Maybe already attached or uses intern blocked name like "create", "extend" or "version"!');if("undefined"==typeof t.create)throw new Error("plugin has no create function!");n[e]=t}};e.cEngine=n}("undefined"!=typeof window?window:void 0)},{"./vendors/polyfils":2}],2:[function(e,n,t){"function"!=typeof Object.assign&&!function(){Object.assign=function(e){"use strict";if(void 0===e||null===e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),t=1;t<arguments.length;t++){var i=arguments[t];if(void 0!==i&&null!==i)for(var o in i)i.hasOwnProperty(o)&&(n[o]=i[o])}return n}}()},{}]},{},[1]);


},{}],3:[function(require,module,exports){
!function e(i,n,t){function o(r,d){if(!n[r]){if(!i[r]){var a="function"==typeof require&&require;if(!d&&a)return a(r,!0);if(s)return s(r,!0);throw new Error("Cannot find module '"+r+"'")}var l=n[r]={exports:{}};i[r][0].call(l.exports,function(e){var n=i[r][1][e];return o(n?n:e)},l,l.exports,e,i,n,t)}return n[r].exports}for(var s="function"==typeof require&&require,r=0;r<t.length;r++)o(t[r]);return o}({1:[function(e,i,n){"use strict";!function(e){!function(){var e=function(e,i,n){n=n||window;var t=!1,o=function(){t||(t=!0,requestAnimationFrame(function(){n.dispatchEvent(new CustomEvent(i)),t=!1}))};n.addEventListener(e,o)};e("resize","optimizedResize")}(),e.extend("fill",{create:function(e){e=e||{};var i={cEnginePlugin:{name:"fill",version:"0.0.2"},mode:e.mode,useFixedResolution:!1,aspectRetion:"undefined"!=typeof e.aspectRetion&&e.aspectRetion,useResolutionDevider:"undefined"!=typeof e.useResolutionDevider&&e.useResolutionDevider,resolutionDevider:e.resolutionDevider||2,engine:void 0,initHeight:void 0,initWidth:void 0,init:function(e){i.engine=e,i.initWidth=e.width,i.initHeight=e.height,"fill"===i.mode?(window.addEventListener("optimizedResize",i.resizeTo,!1),i.resizeTo()):(i.aspectRetion&&(window.addEventListener("optimizedResize",i.resizeToRatio,!1),i.resizeToRatio()),"stretch"===i.mode&&("static"===e.domElement.style.position&&(e.domElement.style.position="relative"),e.canvas.style.position="absolute",e.canvas.style.top="0",e.canvas.style.left="0",e.canvas.style.width="100%",e.canvas.style.height="100%",e.width=e.domElement.clientWidth,e.height=e.domElement.clientHeight))},destroy:function(){window.removeEventListener("optimizedResize",i.resizeTo,!1),window.removeEventListener("optimizedResize",i.resizeToRatio,!1)},resizeToRatio:function(){var e=i.engine.domElement.clientWidth/i.engine.domElement.clientHeight;i.engine.canvas.height=i.initHeight,i.engine.canvas.width=i.engine.canvas.height*e,i.engine.width=i.engine.domElement.clientWidth,i.engine.height=i.engine.domElement.clientHeight},resizeTo:function(){if(i.useResolutionDevider){i.engine.canvas.width=i.engine.domElement.clientWidth/i.engine.resolutionDevider,i.engine.canvas.height=i.engine.domElement.clientHeight/i.engine.resolutionDevider,i.engine.canvas.style.transformOrigin="0% 0%";var e=i.resolutionDevider;i.engine.canvas.style.transform="scale("+e+", "+e+")"}else i.engine.canvas.width=i.engine.domElement.clientWidth,i.engine.canvas.height=i.engine.domElement.clientHeight;i.engine.width=i.engine.domElement.clientWidth,i.engine.height=i.engine.domElement.clientHeight}};return i}})}(cEngine)},{}]},{},[1]);


},{}],4:[function(require,module,exports){
!function e(n,t,i){function r(s,p){if(!t[s]){if(!n[s]){var f="function"==typeof require&&require;if(!p&&f)return f(s,!0);if(o)return o(s,!0);throw new Error("Cannot find module '"+s+"'")}var u=t[s]={exports:{}};n[s][0].call(u.exports,function(e){var t=n[s][1][e];return r(t?t:e)},u,u.exports,e,n,t,i)}return t[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)r(i[s]);return r}({1:[function(e,n,t){"use strict";!function(e){e.extend("frameRate",{create:function(e){e=e||{};var n={cEnginePlugin:{name:"frameRate",version:"0.0.1"},fps:e.fps||60,fpsInterval:void 0,currentFrame:0,init:function(e){n.setFps(n.fps),n.engine=e,n.engine.loop=n.loop},start:function(){n.engine.stepTimeNow=Date.now(),n.engine.stepTimeThen=n.engine.stepTimeNow},setFps:function(e){n.fps=e,n.fpsInterval=1e3/n.fps},postStep:function(){n.currentFrame++},loop:function(){n.engine.isRunning&&(n.engine.stepTimeNow=(new Date).getTime(),n.engine.stepTimeElapsed=n.engine.stepTimeNow-n.engine.stepTimeThen,n.engine.stepTimeElapsed>n.fpsInterval&&(n.engine.stepFn(),n.engine.stepTimeThen=n.engine.stepTimeNow-n.engine.stepTimeElapsed%n.fpsInterval),requestAnimationFrame(n.loop))}};return n}})}(cEngine)},{}]},{},[1]);


},{}],5:[function(require,module,exports){
!function e(n,o,t){function i(r,c){if(!o[r]){if(!n[r]){var d="function"==typeof require&&require;if(!c&&d)return d(r,!0);if(u)return u(r,!0);throw new Error("Cannot find module '"+r+"'")}var s=o[r]={exports:{}};n[r][0].call(s.exports,function(e){var o=n[r][1][e];return i(o?o:e)},s,s.exports,e,n,o,t)}return o[r].exports}for(var u="function"==typeof require&&require,r=0;r<t.length;r++)i(t[r]);return i}({1:[function(e,n,o){"use strict";!function(e){var n="MOUSE_LEFT_TOUCH",o={create:function(e){e=e||{};var t={cEnginePlugin:{name:"inputPlugin",version:"0.0.8"},engine:void 0,keys:{},touches:[],init:function(e){t.engine=e,"ontouchstart"in window?(t.engine.canvas.addEventListener("touchstart",t.touchstart),window.document.addEventListener("touchmove",t.touchmove),window.document.addEventListener("touchend",t.touchend),window.document.addEventListener("touchcancel",t.touchend)):(t.engine.canvas.addEventListener("mousedown",t.mousedown),window.document.addEventListener("mousemove",t.mousemove),window.document.addEventListener("mouseup",t.mouseup)),window.document.addEventListener("keydown",t.onKeydown),window.document.addEventListener("keyup",t.onKeyup)},destroy:function(){t.engine.canvas.removeEventListener("touchstart",t.touchstart),window.document.removeEventListener("touchmove",t.touchmove),window.document.removeEventListener("touchend",t.touchend),window.document.removeEventListener("touchcancel",t.touchend),t.engine.canvas.removeEventListener("mousedown",t.mousedown),window.document.removeEventListener("mousemove",t.mousemove),window.document.removeEventListener("mouseup",t.mouseup),window.document.removeEventListener("keydown",t.onKeydown),window.document.removeEventListener("keyup",t.onKeyup)},mousedown:function(e){1==e.which&&(e.preventDefault(),t.mouseIsTouching=!0,e.identifier=n,t.touches.push(t.createTouch(e)))},mousemove:function(e){if(1==e.which&&(e.preventDefault(),t.mouseIsTouching)){e.identifier=n;var o=t.ongoingTouchIndexById(e.identifier);o>=0&&t.touches.splice(o,1,t.createTouch(e))}},mouseup:function(e){if(1==e.which){e.preventDefault(),t.mouseIsTouching=!1,e.identifier=n;var o=t.ongoingTouchIndexById(e.identifier);o>=0&&t.touches.splice(o,1)}},touchstart:function(e){for(var n=e.changedTouches,o=0;o<n.length;o++)t.touches.push(t.createTouch(n[o]))},touchmove:function(e){for(var n=e.changedTouches,o=0;o<n.length;o++){var i=t.ongoingTouchIndexById(n[o].identifier);i>=0&&t.touches.splice(i,1,t.createTouch(n[o]))}},touchend:function(e){for(var n=e.changedTouches,o=0;o<n.length;o++){var i=t.ongoingTouchIndexById(n[o].identifier);i>=0&&t.touches.splice(i,1)}},ongoingTouchIndexById:function(e){for(var n=0;n<t.touches.length;n++){var o=t.touches[n].identifier;if(o==e)return n}return-1},onKeydown:function(e){t.keys[o.KeyCode[e.keyCode]]=!0},onKeyup:function(e){t.keys[o.KeyCode[e.keyCode]]=!1},createTouch:function(e){var n=t.engine.canvas.getBoundingClientRect(),o={identifier:e.identifier,x:e.clientX-n.left,y:e.clientY-n.top};return t.engine.useResolutionDevider&&(o.x=o.x/t.engine.resolutionDevider,o.y=o.y/t.engine.resolutionDevider),o}};return t},KeyCode:{27:"ESC",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z"}};e.extend("input",o)}(cEngine)},{}]},{},[1]);


},{}],6:[function(require,module,exports){
module.exports=function(){'use strict';function getNthRoot(value,n){return Math.pow(value,1/n)}function isValidNoteName(noteName){var validNameRegex=/^[A-G][b#]?[0-8]$/;return'string'==typeof noteName&&validNameRegex.test(noteName)}function isScaleTypeDefined(scaleName){return scaleDefs.hasOwnProperty(scaleName)}function isValidScaleName(scaleName){var scaleNameRegex=/^[A-Za-z\-\_ ]+$/;return'string'==typeof scaleName&&scaleNameRegex.test(scaleName)}function isValidScaleDefinition(scaleDef){return Array.isArray(scaleDef)&&scaleDef.every(isPositiveIntegerGreaterThanZero)}function isPositiveIntegerGreaterThanZero(value){return'number'==typeof value&&value%1===0&&value>0}function getNoteByInterval(reference,interval){var frequency=reference*Math.pow(TWELFTH_ROOT,interval);return frequency=frequency>MAX_FREQUENCY?MAX_FREQUENCY:frequency,frequency=MIN_FREQUENCY>frequency?MIN_FREQUENCY:frequency,Math.round(100*frequency)/100}function getCentsByInterval(interval){return interval*CENTS_PER_SEMITONE}function getIntervalFromA4(noteName,octave){var semitonesInOctave=12,A4Octave=4,intervalsRelativeToA={C:-9,D:-7,E:-5,F:-4,G:-2,A:0,B:2};return intervalsRelativeToA[noteName]+(octave-A4Octave)*semitonesInOctave}function getIntervalAdjustment(sharpOrFlat){var adjustments={'#':1,b:-1};return'#'!==sharpOrFlat&&'b'!==sharpOrFlat?0:adjustments[sharpOrFlat]}function getScaleNames(){var scaleName,scaleNames=[];for(scaleName in scaleDefs)scaleDefs.hasOwnProperty(scaleName)&&scaleNames.push(scaleName);return scaleNames}function getNote(noteString){if(!isValidNoteName(noteString))throw new Error('Invalid argument noteString: getNote(noteString) noteString should be a valid note name, eg. "Ab0", "C7"');var intervalFromA,adjustedInterval,noteNameMatch=noteString.match(/^[A-G]/g),sharpOrFlatMatch=noteString.match(/[b#]/g),octaveMatch=noteString.match(/[0-8]/g),noteName=noteNameMatch?noteNameMatch[0]:null,sharpOrFlat=sharpOrFlatMatch?sharpOrFlatMatch[0]:null,octave=octaveMatch?parseInt(octaveMatch[0],10):null;return intervalFromA=getIntervalFromA4(noteName,octave),adjustedInterval=intervalFromA+getIntervalAdjustment(sharpOrFlat),getNoteByInterval(REF_FREQUENCIES.A4,adjustedInterval)}function makeScale(scaleType,startNote,noteCount){if(arguments.length<3)throw new Error('Missing argument(s): makeScale() expects three arguments');if(!isValidScaleName(scaleType))throw new Error('Invalid argument scaleType: makeScale(scaleType, startNote, noteCount) expects scaleType to be a string consisting of lower or upper case letters (A-Z, a-z), spaces, hyphens(-) or underscores(_) only');if(!isScaleTypeDefined(scaleType))throw new Error('Scale type is undefined: makeScale(scaleType, startNote, noteCount) scale with name provided for scaleType is not defined – make sure you choose from available scale types');if(!isPositiveIntegerGreaterThanZero(noteCount))throw new Error('Invalid argument noteCount: makeScale(scaleType, startNote, noteCount) expects noteCount to be a positive integer greater than 0');if(!isValidNoteName(startNote))throw new Error('Invalid argument startNote: makeScale(scaleType, startNote, noteCount) startNote should be a valid note name, eg. "Ab0", "C7"');var i,scaleDef=scaleDefs[scaleType],scaleInHertz=[],scaleInCents=[],scaleInSemitones=[],intervalsFromStartNote=0,intervalCounter=0,startFrequency=getNote(startNote);for(scaleInHertz.push(startFrequency),scaleInCents.push(0),scaleInSemitones.push(0),i=0;noteCount-1>i;i+=1)intervalsFromStartNote+=scaleDef[intervalCounter],scaleInHertz.push(getNoteByInterval(startFrequency,intervalsFromStartNote)),scaleInCents.push(getCentsByInterval(intervalsFromStartNote)),scaleInSemitones.push(intervalsFromStartNote),intervalCounter=intervalCounter===scaleDef.length-1?0:intervalCounter+1;return{startNote:startFrequency,inHertz:scaleInHertz,inCents:scaleInCents,inSemiTones:scaleInSemitones}}function addScale(name,scaleDef){if(arguments.length<2)throw new Error('Missing argument(s): addScale() expects two arguments');if(!isValidScaleName(name))throw new Error('Invalid argument name: addScale(name, scaleDef) expects name to be a string consisting of lower or upper case letters (A-Z, a-z), spaces, hyphens(-) or underscores(_) only');if(isScaleTypeDefined(name))throw new Error('Scale type already defined: addScale(name, scaleDef) scale with value of name argument is already defined – make sure you choose a scale name not already in use');if(!isValidScaleDefinition(scaleDef))throw new Error('Invalid argument scaleDef: addScale(name, scaleDef) expects scaleDef to be an array of only positive integers greater than 0');scaleDefs[name]=scaleDef}var TWELFTH_ROOT=getNthRoot(2,12),REF_FREQUENCIES={A4:440,C0:16.35,B8:7902.13},MIN_FREQUENCY=REF_FREQUENCIES.C0,MAX_FREQUENCY=REF_FREQUENCIES.B8,CENTS_PER_SEMITONE=100,scaleDefs={};return scaleDefs.chromatic=[1],scaleDefs.wholeTone=[2],scaleDefs.major=[2,2,1,2,2,2,1],scaleDefs.majorPentatonic=[2,2,3,2,3],scaleDefs.minorPentatonic=[3,2,2,3,2],scaleDefs.kuomiPentatonic=[1,4,2,1,4],scaleDefs.chinesePentatonic=[4,2,1,4,1],scaleDefs.naturalMinor=[2,1,2,2,1,2,2],scaleDefs.harmonicMinor=[2,1,2,2,1,3,1],scaleDefs.melodicMinor=[2,1,2,2,2,2,1],{makeScale:makeScale,getNote:getNote,addScale:addScale,getScaleNames:getScaleNames,test:{getIntervalFromA4:getIntervalFromA4,getIntervalAdjustment:getIntervalAdjustment,getCentsByInterval:getCentsByInterval,getNoteByInterval:getNoteByInterval,isValidNoteName:isValidNoteName,isValidScaleName:isValidScaleName,isValidScaleDefinition:isValidScaleDefinition,isPositiveIntegerGreaterThanZero:isPositiveIntegerGreaterThanZero,isScaleTypeDefined:isScaleTypeDefined}}}();
},{}],7:[function(require,module,exports){
var css = ".cosmosControl {\n  touch-action: none;\n  position: absolute;\n  border: 5px dashed transparent;\n  bottom: 0;\n  border-radius: 50%;\n  left: 50%;\n  transform: translate(-50%,50%);\n  z-index: 1;\n  pointer-events: none;\n  opacity: 1;\n  transition: bottom 1s ease-in-out, \n                opacity 1s ease-in-out;\n}\n.cosmosControl.hide {\n  bottom: -100%;\n  opacity: 0;\n}\n.cosmosControl.active,\n.cosmosControl:active {\n  border: 5px dashed rgba(255,255,255,.5);\n}\nsvg,\n#reset {\n  touch-action: none;\n  box-sizing: border-box;\n  transition: padding .1s ease-in-out;\n  cursor: pointer;\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Safari */\n  -khtml-user-select: none;\n  /* Konqueror HTML */\n  -moz-user-select: none;\n  /* Firefox */\n  -ms-user-select: none;\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n                                supported by Chrome and Opera */\n  pointer-events: all;\n}\nsvg.active,\nsvg:active {\n  padding: 10px;\n  cursor: pointer;\n  cursor: -webkit-grabbing;\n}\nsvg#moon #superHappyFace {\n  display: none !important;\n}\nsvg#moon.active #superHappyFace,\nsvg#moon:active #superHappyFace {\n  display: inline !important;\n}\nsvg#moon.active #happyFace,\nsvg#moon:active #happyFace {\n  display: none !important;\n}\nsvg#sun #superHappyFace {\n  display: none !important;\n}\nsvg#sun.active #superHappyFace,\nsvg#sun:active #superHappyFace {\n  display: inline !important;\n}\nsvg#sun.active #happyFace,\nsvg#sun:active #happyFace {\n  display: none !important;\n}\nsvg#sun.active #shines,\nsvg#sun:active #shines {\n  animation-duration: 3s;\n}\nsvg#cloud {\n  display: none;\n  width: 200px;\n  height: 200px;\n  overflow: visible;\n  position: absolute;\n  left: -100px;\n  top: 50px;\n  transform: translate(-50%, -50%);\n  animation: sun .7s linear infinite alternate;\n}\nsvg#cloud2 {\n  display: none;\n  width: 200px;\n  height: 200px;\n  overflow: visible;\n  position: absolute;\n  left: 260px;\n  top: 170px;\n  transform: translate(-50%, -50%);\n  animation: sun .7s linear infinite alternate;\n}\n#moon-wrapper {\n  position: absolute;\n  width: 200px;\n  height: 200px;\n  left: 50%;\n  top: 100%;\n  transform: translate(-50%, -50%);\n}\nsvg#moon {\n  width: 160px;\n  height: 160px;\n  overflow: visible;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  animation: sun .7s linear infinite alternate;\n}\nsvg#moon #hfEyeLeft,\nsvg#moon #hfEyeRight,\nsvg#moon #shfEyeLeft,\nsvg#moon #shfEyeRight {\n  transform-origin: center;\n  transform: rotateX(0deg) rotateY(0deg);\n  animation: eye .7s linear infinite alternate;\n}\nsvg#moon #hfMouth,\nsvg#moon #shfMouth {\n  transform-origin: center;\n  transform: scale(1);\n  animation: mouth .7s linear infinite alternate;\n}\nsvg#moon #glow {\n  transform-origin: center;\n  transform: scale(1);\n  animation: glow .7s linear infinite alternate;\n}\n#sun-wrapper {\n  position: absolute;\n  width: 200px;\n  height: 200px;\n  left: 50%;\n  top: 0%;\n  transform: translate(-50%, -50%);\n}\nsvg#sun {\n  width: 200px;\n  height: 200px;\n  overflow: visible;\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  animation: sun .7s linear infinite alternate;\n}\nsvg#sun #hfEyeLeft,\nsvg#sun #hfEyeRight,\nsvg#sun #shfEyeLeft,\nsvg#sun #shfEyeRight {\n  transform-origin: center;\n  transform: rotateX(0deg) rotateY(0deg);\n  animation: eye .7s linear infinite alternate;\n}\nsvg#sun #shines {\n  transform-origin: center;\n  transform: rotateZ(0deg);\n  animation: shine 5s linear infinite;\n}\nsvg#sun #hfMouth,\nsvg#sun #shfMouth {\n  transform-origin: center;\n  transform: scale(1);\n  animation: mouth .7s linear infinite alternate;\n}\nsvg#sun #glow {\n  transform-origin: center;\n  transform: scale(1);\n  animation: glow .7s linear infinite alternate;\n}\n@keyframes shine {\n  0% {\n    transform: rotateZ(0deg);\n  }\n\n  100% {\n    transform: rotateZ(360deg);\n  }\n}\n@keyframes mouth {\n  0% {\n    transform: scale(1);\n  }\n\n  100% {\n    transform: scale(0.96);\n  }\n}\n@keyframes glow {\n  0% {\n    transform: scale(1);\n  }\n\n  100% {\n    transform: scale(1.05);\n  }\n}\n@keyframes eye {\n  0% {\n    transform: rotateX(0deg) rotateY(0deg);\n  }\n\n  100% {\n    transform: rotateX(20deg) rotateY(-5deg);\n  }\n}\n@keyframes sun {\n  0% {\n    transform: translate(-50%, -50%);\n  }\n\n  100% {\n    transform: translate(-50%, -52%);\n  }\n}\n#reset {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  min-width: 80px;\n  padding-left: 10px;\n  padding-right: 10px;\n  height: 80px;\n  line-height: 53px;\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 50px;\n  text-align: center;\n  border: 1px solid rgba(255, 255, 255, 0.63);\n  color: white;\n  opacity: 1;\n  transition: opacity 0.5s ease-in-out;\n  font-family: Arial;\n}\n#reset.hide {\n  opacity: 0;\n}\n"; (require("browserify-css").createStyle(css, { "href": "src/css/cosmosControl.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":1}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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
    lineWidth   : 0,
    lastLineUpdate: 0,
    type : 'Circle',

    /* stroke start and end angle */
    startAngle  : Math.random() * (2 * Math.PI), 
    endAngle    : ((Math.random() * (2 * Math.PI)) + Math.random() * 10) % (2 * Math.PI),
    
    /* the rate of change, each step, in ms */
    startAngleChange : Math.random()/5000,
    endAngleChange   : (Math.random()/5000) * 2,

    death       : false,
    // in ms
    lifeTime    : 30000 * Math.random(),

    /* how long alive */
    timeAlive:0,

    /**
     *  Entity update method to change status and appearance.
     *
     *  @public
     *  @parm {int} stepTimeElapsed - time elapsed since last step
     */
    update: (stepTimeElapsed) => {
      circle.startAngle = (circle.startAngle + (circle.startAngleChange*stepTimeElapsed)) % (2 * Math.PI)
      circle.endAngle   = (circle.endAngle   + (circle.endAngleChange*stepTimeElapsed))   % (2 * Math.PI)

      circle.x         += ((Math.random() - 0.5)/100)*stepTimeElapsed
      circle.y         -= ((Math.random() - 0.5)/100)*stepTimeElapsed

      circle.timeAlive += stepTimeElapsed
      circle.death = circle.timeAlive > circle.lifeTime
    },

    /**
     *  Entity draw method. Draws stroke of circle from start- to end-angle.
     *
     *  @public
     *  @param {CanvasRenderingContext2D} context - canvas context
     */
    draw: (context, data) => {
      context.beginPath()
      context.lineCap = "round";
      context.arc(
        circle.x, 
        circle.y, 
        circle.radius, 
        circle.startAngle, 
        circle.endAngle)
      
      if (circle.lastLineUpdate == 0 || circle.lastLineUpdate > 100) {
        circle.lineWidth = Math.max(1, circle.timeAlive / 10000) + ((Math.random() - 0.5) * (circle.timeAlive / 10000))
        circle.lastLineUpdate = 0 
      }
      circle.lastLineUpdate += data.stepTimeElapsed

      context.lineWidth = circle.lineWidth
      
      context.shadowColor = context.strokeStyle = 'rgba(255,255,255,0.7)'

      if (data.countTouches > 0 && Math.random() > 0.1) {
        context.shadowColor = context.strokeStyle = 'rgba(255,255,255,0.1)'
      }

      context.stroke()   
    }
  }

  return circle
}

module.exports = Circle

},{}],10:[function(require,module,exports){
/******************************************************************************
 * cosmosControl.js
 *
 * @author Rene Müller <rene.mueller.code@gmail.com>
 *****************************************************************************/

require('./../css/cosmosControl.css');

/**
 *  
 */
const CosmosControl = function (options){

    /* new instance */
  
    const cosmosControl = {
  
        sunSvg: require('./../svgs/sun.svg'),
        moonSvg: require('./../svgs/moon.svg'),
        cloudSvg: require('./../svgs/cloud.svg'),
        
        isTouching: false,
        touch_last_pos:{
            x:undefined,
            y:undefined
        },
        current_rotation: 0,
        
        max_speed: 5,
        rotation_speed: 0,
        
        onUpdateDayCallbacks: [],
        onResetClickCallbacks: [],

        createDom: (hours) => {

            cosmosControl.$cosmosControl = document.createElement("div");
            cosmosControl.$cosmosControl.classList = "cosmosControl";

            if (!options.showCosmosControl) {
                cosmosControl.$cosmosControl.classList.add("hide");
            }

            cosmosControl.windowResizeEventHandler();

            options.domElement.appendChild(cosmosControl.$cosmosControl);

            cosmosControl.$sun_wrapper = document.createElement("div");
            cosmosControl.$sun_wrapper.id = "sun-wrapper";
            cosmosControl.$sun_wrapper.innerHTML = cosmosControl.sunSvg;
            cosmosControl.$cosmosControl.appendChild(cosmosControl.$sun_wrapper);

            cosmosControl.$moon_wrapper = document.createElement("div");
            cosmosControl.$moon_wrapper.id = "moon-wrapper";
            cosmosControl.$moon_wrapper.innerHTML = cosmosControl.moonSvg;
            cosmosControl.$cosmosControl.appendChild(cosmosControl.$moon_wrapper);

            cosmosControl.$reset = document.createElement("div");
            cosmosControl.$reset.id = "reset";
            cosmosControl.$reset.innerHTML = options.resetTextCosmosControl;
            cosmosControl.$reset.classList.add("hide");
            cosmosControl.$cosmosControl.appendChild(cosmosControl.$reset);

            cosmosControl.updateDay(hours);
        
            cosmosControl.addEventListeners();
        },

        addEventListeners: function () {
            cosmosControl.$sun_wrapper.addEventListener("mousedown", cosmosControl.mousedownEventHandler);
            cosmosControl.$moon_wrapper.addEventListener("mousedown", cosmosControl.mousedownEventHandler);
            window.addEventListener("mousemove", cosmosControl.mousemoveEventHandler);
            window.addEventListener("mouseup"  , cosmosControl.mouseupEventHandler);

            cosmosControl.$sun_wrapper.addEventListener('touchstart', cosmosControl.touchstartEventHandler)
            cosmosControl.$moon_wrapper.addEventListener('touchstart', cosmosControl.touchstartEventHandler)
            window.document.addEventListener('touchmove', cosmosControl.touchmoveEventHandler)
            window.document.addEventListener('touchend', cosmosControl.touchendEventHandler)
            window.document.addEventListener('touchcancel', cosmosControl.touchendEventHandler)
            window.addEventListener("resize", cosmosControl.windowResizeEventHandler);

            cosmosControl.$reset.addEventListener("click", cosmosControl.reset_click_event_handler);
        },

        reset_click_event_handler: function () {
            cosmosControl.hide_reset();
            cosmosControl.rotation_speed = 0;
            cosmosControl.emitResetClick();
            cosmosControl.$reset.blur()
        },

        show_reset: function(){
            cosmosControl.$reset.classList.remove("hide");
        },

        hide_reset: function(){
            cosmosControl.$reset.classList.add("hide");
        },

        windowResizeEventHandler: function () {
            var boundingClientRect = options.domElement.getBoundingClientRect();
            cosmosControl.$cosmosControl.style.width = (Math.min(boundingClientRect.height, boundingClientRect.width)*0.9) + "px";
            cosmosControl.$cosmosControl.style.height = cosmosControl.$cosmosControl.style.width;
        },

        /* Mouse Interaction */

        mousedownEventHandler: function (event) {
            if (event.which == 1 && !cosmosControl.isTouching) {
                event.preventDefault();
                cosmosControl.touchStart(event.clientX, event.clientY);
            }
        },
        mousemoveEventHandler: function (event) {
            if (event.which == 1 && cosmosControl.isTouching) {
                event.preventDefault();
                cosmosControl.touchMove(event.clientX, event.clientY);
            }
        },
        mouseupEventHandler: function (event) {
            if (event.which == 1 && cosmosControl.isTouching) {
                event.preventDefault();
                cosmosControl.touchEnd(event.clientX, event.clientY)
            }
        },

        /* Touch Interaction */

        touchstartEventHandler: function (event) {
            if (!cosmosControl.isTouching) {
                event.preventDefault();
                cosmosControl.touchStart(event.touches[0].clientX, event.touches[0].clientY);
            }
        },
        touchmoveEventHandler: function (event) {
            if (cosmosControl.isTouching) {
                event.preventDefault()
                cosmosControl.touchMove(event.touches[0].clientX, event.touches[0].clientY);
            }
        },
        touchendEventHandler: function (event) {
            if (cosmosControl.isTouching) {
                event.preventDefault();
                cosmosControl.touchEnd(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
            }
        },

        /* General Interaction */

        touchStart: function (clientX, clientY) {
            var boundingClientRect = options.domElement.getBoundingClientRect();
            clientX -= boundingClientRect.x;
            clientY -= boundingClientRect.y;

            cosmosControl.isTouching = true;
            cosmosControl.setActive();
            
            cosmosControl.touch_last_pos.x = clientX;
            cosmosControl.touch_last_pos.y = clientY;
            cosmosControl.start_current_rotation = cosmosControl.current_rotation;
            
            cosmosControl.rotation_speed = 0;

            cosmosControl.show_reset();
        },
        touchMove: function (clientX, clientY) {
            var boundingClientRect = options.domElement.getBoundingClientRect();
            clientX -= boundingClientRect.x;
            clientY -= boundingClientRect.y;

            var alt_rotation = cosmosControl.current_rotation;
            
            cosmosControl.calculateCurrentRotation(clientX, clientY);
            
            /* Rotation Speed */

            cosmosControl.rotation_speed = cosmosControl.current_rotation - alt_rotation;
            if (Math.abs(cosmosControl.rotation_speed) > cosmosControl.max_speed) {
                cosmosControl.rotation_speed = (cosmosControl.rotation_speed > 0 ? 1 : -1) * cosmosControl.max_speed;
            }

            /* Emit */

            cosmosControl.emitUpdateDay();
        },
        touchEnd: function (clientX, clientY) {
            var boundingClientRect = options.domElement.getBoundingClientRect();
            clientX -= boundingClientRect.x;
            clientY -= boundingClientRect.y;

            cosmosControl.calculateCurrentRotation(clientX, clientY);

            /* Emit */

            cosmosControl.emitUpdateDay();

            cosmosControl.isTouching = false;
            cosmosControl.clearActive();
        },

        setActive: function () {
            cosmosControl.$sun_wrapper.firstElementChild.classList.add('active')
            cosmosControl.$moon_wrapper.firstElementChild.classList.add('active')
            cosmosControl.$cosmosControl.classList.add('active')
        },
        clearActive: function () {
            cosmosControl.$sun_wrapper.firstElementChild.classList.remove('active')
            cosmosControl.$moon_wrapper.firstElementChild.classList.remove('active')
            cosmosControl.$cosmosControl.classList.remove('active')
        },

        calculateCurrentRotation: function (clientX, clientY) {
            var cosmosControlTopLeftX = cosmosControl.$cosmosControl.offsetLeft - (cosmosControl.$cosmosControl.offsetWidth * 0.5)
            var cosmosControlTopLeftY = cosmosControl.$cosmosControl.offsetTop  + (cosmosControl.$cosmosControl.offsetWidth * 0.5)

            var middleX = cosmosControlTopLeftX + (cosmosControl.$cosmosControl.offsetWidth  / 2);
            var middleY = cosmosControlTopLeftY + (cosmosControl.$cosmosControl.offsetHeight / 2);

            var dAx = middleX - cosmosControl.touch_last_pos.x;
            var dAy = middleY - cosmosControl.touch_last_pos.y;
            var dBx = middleX - clientX;
            var dBy = middleY - clientY;
            var angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
            var degree_angle = angle * (180 / Math.PI);

            cosmosControl.current_rotation = cosmosControl.start_current_rotation + degree_angle;
            cosmosControl.current_rotation = cosmosControl.current_rotation % 360;

            if (cosmosControl.current_rotation < 0 ) {
                cosmosControl.current_rotation += 360;
            }
        },

        /* Update Handler */

        updateDay: function(hour, localTimeHour){
           
            if (!cosmosControl.isTouching) {

                if (cosmosControl.rotation_speed != 0) {

                    cosmosControl.current_rotation = (cosmosControl.current_rotation + cosmosControl.rotation_speed) % 360;
    
                    if (cosmosControl.current_rotation < 0 ) {
                        cosmosControl.current_rotation += 360;
                    }
    
                    cosmosControl.emitUpdateDay();

                    if (cosmosControl.rotation_speed > 0) {
                        cosmosControl.rotation_speed -= 0.01;
                    } else {
                        cosmosControl.rotation_speed += 0.01;
                    }
    
                    if (Math.abs(cosmosControl.rotation_speed) < 0.1) {
                        cosmosControl.rotation_speed = 0;
                    }
    
                } else {
                    cosmosControl.current_rotation = cosmosControl.convertHourToAngle(hour);
                }
            }
            /*
            Calculate position of current time:
            var localTimeHour_rotation = cosmosControl.convertHourToAngle(localTimeHour);
            localTimeHour_rotation_diff = (cosmosControl.current_rotation - localTimeHour_rotation)%360;
            var localTimeHour_rotation_x = cosmosControl.$cosmosControl.offsetWidth/2 * Math.cos((cosmosControl.current_rotation-localTimeHour_rotation_diff)*Math.PI/180);
            var localTimeHour_rotation_y = cosmosControl.$cosmosControl.offsetWidth/2 * Math.sin((cosmosControl.current_rotation-localTimeHour_rotation_diff)*Math.PI/180);
            */
            
            cosmosControl.updateAngle();
        },
        updateAngle: function () {
            cosmosControl.$cosmosControl.style.transform = "translate(-50%,50%) rotateZ(" + cosmosControl.current_rotation + "deg)"; 

            if (cosmosControl.current_rotation < 180) {
                cosmosControl.$sun_wrapper.style.transform = "translate(-50%,-50%) rotateZ(" + -cosmosControl.current_rotation + "deg) scaleX(-1)"; 
            } else {
                cosmosControl.$sun_wrapper.style.transform = "translate(-50%,-50%) rotateZ(" + -cosmosControl.current_rotation + "deg)"; 
            }
            if (cosmosControl.current_rotation < 180) {
                cosmosControl.$moon_wrapper.style.transform = "translate(-50%,-50%) rotateZ(" + -cosmosControl.current_rotation + "deg) scaleX(-1)"; 
            } else {
                cosmosControl.$moon_wrapper.style.transform = "translate(-50%,-50%) rotateZ(" + -cosmosControl.current_rotation + "deg)"; 
            }

            cosmosControl.$reset.style.transform = "translate(-50%,-50%) rotateZ(" + -cosmosControl.current_rotation + "deg)"; 
        },

        convertAngleToHour: function (angle) {
            if (angle > 180) {
                angle -= 360;
            }

            return (angle / (360 / 24)) + 12;
        },
        convertHourToAngle: function (hour) {
            var angle = (hour / 24) * 360;
            return (angle + 180) % 360;
        },

        /* Events */

        onUpdateDay: function(callback){
            cosmosControl.onUpdateDayCallbacks.push(callback)
        },
        emitUpdateDay:function(){
            var hour = cosmosControl.convertAngleToHour(cosmosControl.current_rotation);
            cosmosControl.onUpdateDayCallbacks.forEach(callback => callback(hour));
        },

        onResetClick: function (callback) {
            cosmosControl.onResetClickCallbacks.push(callback);
        },
        emitResetClick: function () {
            cosmosControl.onResetClickCallbacks.forEach(callback => callback());
        },

        /* Show/Hide */

        hide: () => {
            cosmosControl.$cosmosControl.classList.add('hide')
        },

        show: () => {
            cosmosControl.$cosmosControl.classList.remove('hide')
        }
    }

    return cosmosControl
}
  
module.exports =  CosmosControl
  
},{"./../css/cosmosControl.css":7,"./../svgs/cloud.svg":16,"./../svgs/moon.svg":17,"./../svgs/sun.svg":18}],11:[function(require,module,exports){
/******************************************************************************
 * dayTimeTypes.js
 *
 * @author Rene Müller <rene.mueller.code@gmail.com>
 *****************************************************************************/

module.exports = {
    MORNING     : 1, 
    DAY         : 2, 
    AFTERNOON   : 3,
    NIGHT       : 4
};

},{}],12:[function(require,module,exports){
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

/* modules */

var CosmosControl = require('./cosmosControl');
var DayTimeTypes = require('./dayTimeTypes');

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

    cosmosControl: undefined,

    /* HTMLElements for each daytime */
    $day       : document.createElement('div'), //  6 - 18
    $night     : document.createElement('div'), // 18 -  6 
    $morning   : document.createElement('div'), //  3 -  9 
    $afternoon : document.createElement('div'), // 15 - 21

    currentSetHour: undefined,

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

      if (options.renderCss) {
        var css = ".rm_atmo-day-color{color:"+dayTime.colors.day+"}";
        css    += ".rm_atmo-day-background-color{background-color:"+dayTime.colors.day+"}"; 
        css    += ".rm_atmo-day-border-color{border-color:"+dayTime.colors.day+"}"; 

        css    += ".rm_atmo-night-color{color:"+dayTime.colors.night+"}";
        css    += ".rm_atmo-night-background-color{background-color:"+dayTime.colors.night+"}";
        css    += ".rm_atmo-night-border-color{border-color:"+dayTime.colors.night+"}"; 

        css    += ".rm_atmo-morning-color{color:"+dayTime.colors.morning+"}";
        css    += ".rm_atmo-morning-background-color{background-color:"+dayTime.colors.morning+"}"; 
        css    += ".rm_atmo-morning-border-color{border-color:"+dayTime.colors.morning+"}"; 

        css    += ".rm_atmo-afternoon-color{color:"+dayTime.colors.afternoon+"}";
        css    += ".rm_atmo-afternoon-background-color{background-color:"+dayTime.colors.afternoon+"}"; 
        css    += ".rm_atmo-afternoon-border-color{border-color:"+dayTime.colors.afternoon+"}"; 

        var style = document.createElement("style");
        style.type = 'text/css';
        style.id = "rm_atmo_static_styles";
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
      }

      if (options.enableCosmosControl) {
        dayTime.addCosmosControl(dayTime.getHours());
      }
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

    setHours: function (hour) {
      if (dayTime.cosmosControl) {
        dayTime.cosmosControl.show_reset();
      }
      dayTime.currentSetHour = Number.isInteger(hour) ? Math.min(23, Math.max(0, Math.floor(hour))) : undefined;
    },

    setToLocalTime: function () {
      if (dayTime.cosmosControl) {
        dayTime.cosmosControl.hide_reset();
      }
      dayTime.currentSetHour = undefined
    },
    
    getHours:         () => typeof dayTime.currentSetHour === 'undefined' ? dayTime.getLocalTimeHour() : dayTime.currentSetHour,
    
    getLocalTimeHour: () => new Date().getHours(),

    getDayTime: function () {
      var hour = dayTime.getHours();
      if      (hour >= 3  && hour <= 9)  return DayTimeTypes.MORNING;
      else if (hour >= 15 && hour <= 21) return DayTimeTypes.AFTERNOON;
      else if (hour >= 6  && hour <= 18) return DayTimeTypes.DAY;
      else                               return DayTimeTypes.NIGHT;
    },

    addCosmosControl: function () {
      dayTime.cosmosControl = CosmosControl(options);
      dayTime.cosmosControl.createDom();
      dayTime.cosmosControl.onUpdateDay(hour => dayTime.currentSetHour = hour);
      dayTime.cosmosControl.onResetClick(() => { dayTime.setToLocalTime(); });
    },



    /**
     *  Entity update method to change daytime status.
     *
     *  @public
     */
    update: () => {
      const hour = dayTime.getHours()
      
      if (dayTime.cosmosControl) {
        dayTime.cosmosControl.updateDay(hour, dayTime.getLocalTimeHour());
      }

      if (dayTime.lastSetHour != hour) {

        dayTime.$day.style.opacity       = (hour >= 6  && hour <= 18) ? 1                                   : 0
        dayTime.$night.style.opacity     = (hour >= 6  && hour <= 18) ? 0                                   : 1
        dayTime.$morning.style.opacity   = (hour >= 3  && hour <= 9 ) ? (-0.1 * Math.pow(hour - 6 , 2)) + 1 : 0 
        dayTime.$afternoon.style.opacity = (hour >= 15 && hour <= 21) ? (-0.1 * Math.pow(hour - 18, 2)) + 1 : 0

        if (options.renderCss) {

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
        }
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
      css    += ".rm_atmo-daytime-border-color{border-color:"+color+"}";

      var style = document.createElement("style");
      style.type = 'text/css';
      style.id = "rm_atmo_dynamic_styles";
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    },

    hideCosmosControl: () => {
      if (dayTime.cosmosControl) {
        dayTime.cosmosControl.hide()
      } 
    },

    showCosmosControl: () => {
      if (dayTime.cosmosControl) {
        dayTime.cosmosControl.show()
      } 
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

},{"./cosmosControl":10,"./dayTimeTypes":11}],13:[function(require,module,exports){
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
     *  @parm {int} stepTimeElapsed - time elapsed since last step
     */
    update: (stepTimeElapsed) => {
      entityList.entities.forEach(entity => {

        if (!entity.death) {

          entity.update(stepTimeElapsed)

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
     *  @param {object} data - custom data
     */
    draw: (context, data) => {
      entityList.entities.forEach(entity => {
        if (!entity.death){
          entity.draw(context, data)         
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
    },

    count: (type) => {
      var num = 0;

      entityList.entities.forEach(entity => {
        if (!entity.death && entity.type == type){
          num++
        }
      })

      return num;
    }
  }

  return entityList
}

module.exports =  EntityList

},{}],14:[function(require,module,exports){
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
 *
 * @author Rene Müller <rene.mueller.code@gmail.com>
 *****************************************************************************/

/*eslint no-console:0*/

/* vendor */

var ScaleMaker   = require('../../node_modules/scale-maker/lib/node/scaleMaker.min');
var DayTimeTypes = require('./dayTimeTypes');

// global statics
window.AudioContext = window.AudioContext || window.webkitAudioContext

var AudioContext    = undefined;
var MorningScale    = ScaleMaker.makeScale('chinesePentatonic', "A3" , 11);
var AfternoonScale  = ScaleMaker.makeScale('kuomiPentatonic'  , "Bb3", 11);
var DayScale        = ScaleMaker.makeScale('majorPentatonic'  , "G#3", 11);
var NightScale      = ScaleMaker.makeScale('minorPentatonic'  , "F#3", 11);

var last_audioContext_state = undefined

/**
 *  Factory for a new userTap instance.
 * 
 *  @param {object}       data             - position data of user interaction
 *  @param {DayTimeTypes} dayTime          - the time of the day 
 *  @param {bool}         muted            - is user tap muted, true if yes
 *  @param {number}       volumeMultiplier - multiply volume, from 0 to 1
 */
const UserTap = function  (
  data, 
  dayTime, 
  muted = false, 
  volumeMultiplier = 1
){

  /* new instance */

  const userTap = {

    data        : data,
    death       : false,
    lifeTime    : 1000, // in ms
    timeAlive   : 0,
    type        : 'UserTap',
    
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

      if (typeof AudioContext === "undefined") {
        AudioContext = new window.AudioContext()
      }

      var noteLength  = 0.5,
          scale       = getScale(dayTime),
          oscillator  = AudioContext.createOscillator(),
          gainNode    = AudioContext.createGain(),
          volume      = muted ? 0 : Math.min(1, (0.10 * userTap.data.y) * Math.min(1, volumeMultiplier)),
          time        = AudioContext.currentTime,
          noteInHertz = scale.inHertz[Math.floor(userTap.data.x * scale.inHertz.length)]

      if (noteInHertz) {

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(noteInHertz, AudioContext.currentTime); // value in hertz
        gainNode.gain.value = 0;
        gainNode.connect(AudioContext.destination);
        oscillator.connect(gainNode);

        oscillator.start(time);
        gainNode.gain.setValueAtTime(0, time); // initial
        gainNode.gain.linearRampToValueAtTime(volume, time + 0.5); // attack
        gainNode.gain.setValueAtTime(volume, time + noteLength - 0.5); // sustain
        gainNode.gain.linearRampToValueAtTime(0, time + noteLength + 0.5); // release
        oscillator.stop(time + noteLength + 0.5); // kill
      }

      if (AudioContext.state === 'suspended') {
        if (last_audioContext_state === 'suspended') {
          // now we know we can not play sound -> first firefox state is
          // suspended, so at the second time, we know
          console.log("not allowed!")
        }
        last_audioContext_state = AudioContext.state
      }
    },

    /**
     *  Entity update method to change status.
     *
     *  @public
     *  @parm {int} stepTimeElapsed - time elapsed since last step
     */
    update: (stepTimeElapsed) => {
      userTap.timeAlive += stepTimeElapsed
      userTap.death = userTap.timeAlive > userTap.lifeTime
    },

    /**
     *  Entity draw method. Draws circle of touch position.
     *
     *  @public
     *  @param {CanvasRenderingContext2D} context - canvas context
     */
    draw: (context) => {

      const lifePercent = (userTap.lifeTime - userTap.timeAlive) / userTap.lifeTime 

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

      context.lineWidth = ((Math.random() - 0.5) * (userTap.timeAlive/100))

      context.shadowColor = context.strokeStyle = 'rgba(255, 255, 255, ' + Math.random() * lifePercent + ')'

      context.stroke()
    } 
  }
  
  userTap.init()

  return userTap;

  /**
   * Returns the scale for the daytime.
   * 
   * @param {DayTimeTypes} dayTime - the time of day.
   * @return {object} - The scale for the daytime. 
   */
  function getScale (dayTime) {
    switch (dayTime) {
      case DayTimeTypes.DAY       : { return DayScale;       }
      case DayTimeTypes.NIGHT     : { return NightScale;     }
      case DayTimeTypes.AFTERNOON : { return AfternoonScale; }
      case DayTimeTypes.MORNING   : { return MorningScale;   }
      default                     : { return DayScale;       }
    }
  }

}

module.exports =  UserTap

},{"../../node_modules/scale-maker/lib/node/scaleMaker.min":6,"./dayTimeTypes":11}],15:[function(require,module,exports){
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
        enableCosmosControl: false,
        showCosmosControl: true,
        resetTextCosmosControl: 'Reset',
        renderCss: false,
        colors: {
          day: '#00ADFF',
          night: '#3F2850',
          morning: '#E883E5',
          afternoon: '#7D8DF9'
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
         *  Time between each UserTab.
         *  @type number
         *  @private
         */
        timeBetweenUserTabs: 50,

        /**
         *  Max time added to timeBetweenUserTabs.
         *  @type number
         *  @private
         */
        maxOffsetBetweenUserTabs: 200,

        /**
         *  Times of last UserTab.
         *  @type object
         *  @private
         */
        lastUserTabTimes: {},

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
          autoClear: false,
          /* add cEgnine Plug-Ins */
          plugins: {
            /* frame-rate limiter */
            frameRate: cEngine.frameRate.create({
              fps: 60
            }),
            /* canvas resize to full root element size */
            fill: cEngine.fill.create({
              mode: 'stretch',
              aspectRetion: true
            }),
            /* user interaction (desktop and mobile) */
            input: cEngine.input.create({

            })
          },
          /* add custom render step for cEngine  */
          /* -> background circle animation */
          step: (context, width, height, stepTimeElapsed, plugins) => {
             
            rM_AtMo.engine.clear();
            
            if (rM_AtMo.frame % 100 == 0 || (rM_AtMo.frame < 3)) {
              // not more than 6 circles
              if (rM_AtMo.entityList.count("Circle") <= 5) {
                rM_AtMo.entityList.add(Circle(Math.random() * width, Math.random() * height))
              }
            }
            
            rM_AtMo.entityList.update(stepTimeElapsed) 

            context.shadowBlur = 24

            rM_AtMo.entityList.draw(context, {
              countTouches: plugins.input.touches.length,
              stepTimeElapsed: stepTimeElapsed
            })
        
            rM_AtMo.frame++;

            plugins.input.touches.forEach(function(touch){
                
              var muted = true;
              var showUserTab = false;
              var volume = 0;

              if ((typeof rM_AtMo.lastUserTabTimes[touch.identifier] === 'undefined')) {

                showUserTab = true;
                muted = rM_AtMo.muted;
                volume = 1;

              } else if ((Date.now() - rM_AtMo.lastUserTabTimes[touch.identifier]) > (rM_AtMo.timeBetweenUserTabs+(Math.random()*rM_AtMo.maxOffsetBetweenUserTabs))) { // Add random offset, so each played note is not fixed length apart -> avoid ticking
                showUserTab = true;

                muted = rM_AtMo.muted;
                // less chance for high notes in a row -> sounds better
                volume = (Math.random()*Math.random()); // https://pixelero.wordpress.com/2008/04/24/various-functions-and-various-distributions-with-mathrandom/
                
                if (Math.random() > (1/plugins.input.touches)) {
                  volume *= Math.random();
                }

                rM_AtMo.lastTimeNotePlayed = Date.now()
              }

              if (showUserTab) {
                const data = {
                  x: touch.x/options.domElement.offsetWidth,
                  y: touch.y/options.domElement.offsetHeight
                }
                rM_AtMo.entityList.add(UserTab(data, rM_AtMo.dayTime.getDayTime(), muted, volume));
                rM_AtMo.emitOnTap(data);
                rM_AtMo.lastUserTabTimes[touch.identifier] = Date.now()
              }
            })
  
            for (var identifier in rM_AtMo.lastUserTabTimes) {
              if (rM_AtMo.lastUserTabTimes.hasOwnProperty(identifier)) {
                var found = false;
                for (let i = 0; i < plugins.input.touches.length; i++) {
                  if (plugins.input.touches[i].identifier == identifier) {
                    found = true;
                    break;
                  }
                }
                if (!found) {
                  rM_AtMo.lastUserTabTimes[identifier] = undefined;
                }
              }
            }

            rM_AtMo.dayTime.update()
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
 
            if (rM_AtMo.song) {
              rM_AtMo.song.init()
            }

            options.domElement.style.touchAction = "None"

            rM_AtMo.engine.start()

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

      return {

        mute: () => {
          rM_AtMo.muted = true
        },

        unMute: () => {
          rM_AtMo.muted = false
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
          rM_AtMo.entityList.add(UserTab(data, rM_AtMo.dayTime.getDayTime(), rM_AtMo.muted || muted))
        },

        setHours: hour => {
          rM_AtMo.dayTime.setHours(hour)
        },
    
        setToLocalTime: () => {
          rM_AtMo.dayTime.setToLocalTime()
        },
        
        hideCosmosControl: () => {
          rM_AtMo.dayTime.hideCosmosControl()
        },

        showCosmosControl: () => {
          rM_AtMo.dayTime.showCosmosControl()
        }
      }
    }
  }

}(typeof window !== 'undefined' ? window : this))

},{"../node_modules/cengine/dist/cEngine-min":2,"../node_modules/cengine/dist/plugins/cEngine.fill-min":3,"../node_modules/cengine/dist/plugins/cEngine.frameRate-min":4,"../node_modules/cengine/dist/plugins/cEngine.input-min":5,"./modules/backgroundSong":8,"./modules/circle":9,"./modules/daytime":12,"./modules/entityList":13,"./modules/userTab":14}],16:[function(require,module,exports){
module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 15.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\r\n<svg version=\"1.1\" id=\"cloud\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t width=\"304px\" height=\"195.25px\" viewBox=\"0 0 304 195.25\" enable-background=\"new 0 0 304 195.25\" xml:space=\"preserve\">\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" fill=\"#FFFFFF\" d=\"M63.63,195C28.49,195,0,166.53,0,131.41s28.49-63.58,63.63-63.58\r\n\tc1.39,0,2.77,0.04,4.13,0.14C74.7,29.33,108.51,0,149.17,0c32.39,0,60.43,18.6,74,45.7c1.94-0.15,3.91-0.23,5.89-0.23\r\n\tC270.45,45.47,304,79,304,120.36c0,41.36-33.55,74.89-74.94,74.89\"/>\r\n</svg>\r\n";

},{}],17:[function(require,module,exports){
module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 15.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\r\n<svg version=\"1.1\" id=\"moon\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t width=\"272px\" height=\"272px\" viewBox=\"0 0 272 272\" style=\"enable-background:new 0 0 272 272;\" xml:space=\"preserve\">\r\n<g id=\"body\">\r\n\t<g id=\"bodyShadow\">\r\n\t\t<g>\r\n\t\t\t<circle style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#D8D9D9;\" cx=\"138\" cy=\"137\" r=\"122\"/>\r\n\t\t</g>\r\n\t</g>\r\n\t<g id=\"bodyLight\">\r\n\t\t<g>\r\n\t\t\t<circle style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#F8F7F7;\" cx=\"132.5\" cy=\"131.5\" r=\"116.5\"/>\r\n\t\t</g>\r\n\t</g>\r\n\t<g id=\"happyFace\">\r\n\t\t<g id=\"hfEyeLeft\">\r\n\t\t\t<g>\r\n\t\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#010202;\" d=\"M80.781,139.643c-0.745-4.478-7.812,3.083-15.758,6.092\r\n\t\t\t\t\tc-7.946,3.01-13.764,0.329-13.018,4.806c0.746,4.478,7.792,5.668,15.738,2.658C75.689,150.189,81.527,144.12,80.781,139.643z\"/>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t\t<g id=\"hfEyeRight\">\r\n\t\t\t<g>\r\n\t\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#010202;\" d=\"M166.111,108.27c-0.545-4.507-7.942,2.729-16.015,5.381\r\n\t\t\t\t\tc-8.073,2.65-13.765-0.288-13.22,4.219c0.545,4.506,7.53,6.01,15.604,3.359C160.553,118.577,166.656,112.775,166.111,108.27z\"/>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t\t<g id=\"hfMouth\">\r\n\t\t\t<g>\r\n\t\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#010202;\" d=\"M143.169,180.187c-2.359-7.466-11.067-5.408-20.624-2.393\r\n\t\t\t\t\tc-9.557,3.015-16.344,5.846-13.984,13.312s10.925,8.646,20.482,5.63C138.6,193.721,145.528,187.652,143.169,180.187z\"/>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t</g>\r\n\t<g id=\"craters\">\r\n\t\t<g id=\"crater3\" style=\"opacity:0.4784;\">\r\n\t\t\t<g>\r\n\t\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#B8B8B8;\" d=\"M225.095,136.173c-7.386-6.688-18.563-4.802-24.967,4.216\r\n\t\t\t\t\tc-6.403,9.017-5.607,21.749,1.777,28.438c7.386,6.688,18.563,4.802,24.967-4.216\r\n\t\t\t\t\tC233.275,155.595,232.479,142.862,225.095,136.173z\"/>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t\t<g id=\"crater2\" style=\"opacity:0.4784;\">\r\n\t\t\t<g>\r\n\t\t\t\t<path style=\"fill:#BDBCBC;\" d=\"M87.205,66.881c-2.361-8.992-12.012-12.758-21.554-8.412S50.288,73.627,52.649,82.618\r\n\t\t\t\t\tc2.361,8.992,12.012,12.758,21.554,8.412S89.566,75.872,87.205,66.881z\"/>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t\t<g id=\"crater1\" style=\"opacity:0.4784;\">\r\n\t\t\t<g>\r\n\t\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#C8C7C7;\" d=\"M71.332,184.373c-3.051-5.457-9.701-8.033-14.854-5.754\r\n\t\t\t\t\tc-5.154,2.279-6.859,8.551-3.81,14.008c3.051,5.457,9.701,8.033,14.854,5.754C72.677,196.102,74.382,189.83,71.332,184.373z\"/>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t</g>\r\n\t<g id=\"superHappyFace\">\r\n\t\t<g id=\"shfEyeLeft\">\r\n\t\t\t<g>\r\n\t\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#010202;\" d=\"M80.867,142.194c-0.851-4.459-7.923-5.484-15.796-2.289\r\n\t\t\t\t\tc-7.873,3.194-13.567,9.398-12.716,13.857c0.85,4.459,7.737-3.265,15.611-6.459C75.839,144.108,81.717,146.651,80.867,142.194z\"\r\n\t\t\t\t\t/>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t\t<g id=\"shfEyeRight\">\r\n\t\t\t<g>\r\n\t\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#010202;\" d=\"M166.332,111.632c-0.487-4.513-7.452-6.107-15.559-3.561\r\n\t\t\t\t\tc-8.106,2.547-14.284,8.27-13.797,12.782c0.487,4.514,7.977-2.626,16.083-5.174\r\n\t\t\t\t\tC161.166,113.133,166.818,116.145,166.332,111.632z\"/>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t\t<g id=\"shfMouth\">\r\n\t\t\t<g>\r\n\t\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#010202;\" d=\"M143.352,180.137c-2.359-7.466-11.067-5.408-20.624-2.393\r\n\t\t\t\t\tc-9.557,3.015-16.344,5.846-13.984,13.312s10.925,8.646,20.482,5.63C138.782,193.671,145.711,187.603,143.352,180.137z\"/>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t\t<path id=\"shfBlushRight\" style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#EE6F48;\" d=\"M42.713,166.43\r\n\t\t\tc1.895-4.119,6.442-6.012,10.159-4.227c3.715,1.784,5.192,6.569,3.298,10.688c-1.895,4.119-6.442,6.011-10.159,4.227\r\n\t\t\tC42.295,175.333,40.819,170.548,42.713,166.43z\"/>\r\n\t\t\r\n\t\t\t<ellipse id=\"shfBlushLeft\" transform=\"matrix(0.8204 0.5718 -0.5718 0.8204 104.607 -82.2129)\" style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#EE6F48;\" cx=\"183.164\" cy=\"125.399\" rx=\"10.769\" ry=\"10.832\"/>\r\n\t</g>\r\n</g>\r\n<g id=\"glow\" style=\"opacity:0.2392;\">\r\n\t<g>\r\n\t\t<circle style=\"fill:#D8D9D9;\" cx=\"136\" cy=\"136\" r=\"136\"/>\r\n\t</g>\r\n</g>\r\n</svg>\r\n";

},{}],18:[function(require,module,exports){
module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 15.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\r\n<svg version=\"1.1\" id=\"sun\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t width=\"349.361px\" height=\"349.362px\" viewBox=\"0 0 349.361 349.362\" style=\"enable-background:new 0 0 349.361 349.362;\"\r\n\t xml:space=\"preserve\">\r\n<g id=\"sunBody\">\r\n\t<g id=\"body\">\r\n\t\t<g id=\"bodyShadow\">\r\n\t\t\t<g>\r\n\t\t\t\t<circle style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#DDC518;\" cx=\"174.775\" cy=\"174.212\" r=\"122\"/>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t\t<g id=\"bodyFront\">\r\n\t\t\t<g>\r\n\t\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#FDEB2A;\" d=\"M261.06,87.927c-47.62-47.62-124.828-47.621-172.448,0\r\n\t\t\t\t\tC40.991,135.547,60.529,207,105.884,255.667c28.634,30.724,107.556,52.33,155.176,4.709\r\n\t\t\t\t\tC308.68,212.755,308.68,135.547,261.06,87.927z\"/>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t</g>\r\n\t<g id=\"happyFace\">\r\n\t\t<g id=\"hfMouth\">\r\n\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#020304;\" d=\"M169.288,185.641c-19.256,2.401,10.964,47.317,46.937,36.027\r\n\t\t\t\tc35.974-11.291,34.535-52.166,23.074-49.051L169.288,185.641z\"/>\r\n\t\t</g>\r\n\t\t<g id=\"hfEyeLeft\">\r\n\t\t\t<g>\r\n\t\t\t\t<circle style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#010202;\" cx=\"154.092\" cy=\"148.721\" r=\"15.5\"/>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t\t<g id=\"hfEyeRight\">\r\n\t\t\t<g>\r\n\t\t\t\t<circle style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#010202;\" cx=\"235.601\" cy=\"136.68\" r=\"15.5\"/>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t</g>\r\n\t<g id=\"superHappyFace\">\r\n\t\t<g id=\"shfMouth\">\r\n\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#020304;\" d=\"M169.288,185.641c-19.256,2.401,10.964,47.317,46.937,36.027\r\n\t\t\t\tc35.974-11.291,34.535-52.166,23.074-49.051L169.288,185.641z\"/>\r\n\t\t</g>\r\n\t\t<g id=\"shfEyeLeft\">\r\n\t\t\t<g>\r\n\t\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#010202;\" d=\"M149.886,133.403c8.22-2.389,16.82,2.339,19.209,10.56\r\n\t\t\t\t\tc2.389,8.22-6.854-0.436-15.075,1.953c-8.22,2.389-12.306,14.917-14.694,6.696C136.938,144.392,141.666,135.792,149.886,133.403\r\n\t\t\t\t\tz\"/>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t\t<g id=\"shfEyeRight\">\r\n\t\t\t<g>\r\n\t\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#010202;\" d=\"M250.716,132.948c-2.064-8.308-10.472-13.371-18.78-11.307\r\n\t\t\t\t\ts-13.37,10.471-11.307,18.779c2.063,8.308,7.186-4.346,15.494-6.41C244.431,131.947,252.779,141.256,250.716,132.948z\"/>\r\n\t\t\t</g>\r\n\t\t</g>\r\n\t\t\r\n\t\t\t<ellipse id=\"shfBlushLeft_2_\" transform=\"matrix(0.8204 0.5718 -0.5718 0.8204 132.498 -43.7131)\" style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#F39232;\" cx=\"135.831\" cy=\"189.052\" rx=\"12.652\" ry=\"12.725\"/>\r\n\t\t\r\n\t\t\t<ellipse id=\"shfBlushRight_2_\" transform=\"matrix(0.9927 -0.1202 0.1202 0.9927 -18.1233 33.3341)\" style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#F39232;\" cx=\"267.243\" cy=\"166.89\" rx=\"10.525\" ry=\"11.528\"/>\r\n\t</g>\r\n\t<g id=\"glow\" style=\"opacity:0.2392;\">\r\n\t\t<g style=\"display:inline;\">\r\n\t\t\t<circle style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#F6EB5D;\" cx=\"174.275\" cy=\"172.712\" r=\"131.5\"/>\r\n\t\t</g>\r\n\t</g>\r\n</g>\r\n<g id=\"shines\">\r\n\t<g id=\"shine8\">\r\n\t\t<g>\r\n\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#FDEB2E;\" d=\"M14.021,88.67c1.396-2.697,4.717-3.751,7.413-2.354\r\n\t\t\t\tl26.638,13.8c2.697,1.397,3.751,4.717,2.354,7.414c-1.397,2.696-4.717,3.75-7.414,2.354L16.375,96.083\r\n\t\t\t\tC13.678,94.687,12.624,91.367,14.021,88.67z\"/>\r\n\t\t</g>\r\n\t</g>\r\n\t<g id=\"shine7\">\r\n\t\t<g>\r\n\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#FDEB2E;\" d=\"M299.135,241.454c1.429-2.68,4.76-3.694,7.441-2.266\r\n\t\t\t\tl26.472,14.116c2.68,1.429,3.694,4.761,2.265,7.44c-1.429,2.681-4.761,3.695-7.441,2.266L301.4,248.896\r\n\t\t\t\tC298.72,247.466,297.705,244.135,299.135,241.454z\"/>\r\n\t\t</g>\r\n\t</g>\r\n\t<g id=\"shine6\">\r\n\t\t<g>\r\n\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#FDEB2E;\" d=\"M3.837,220.56l28.593-9.077\r\n\t\t\t\tc2.896-0.919,5.988,0.683,6.907,3.578c0.919,2.895-0.683,5.986-3.578,6.906l-28.594,9.077c-2.896,0.919-5.987-0.683-6.906-3.578\r\n\t\t\t\tC-0.66,224.571,0.941,221.479,3.837,220.56z\"/>\r\n\t\t</g>\r\n\t</g>\r\n\t<g id=\"shine5\">\r\n\t\t<g>\r\n\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#FDEB2E;\" d=\"M313.559,127.032l28.699-8.737\r\n\t\t\t\tc2.906-0.885,5.979,0.754,6.863,3.659c0.885,2.906-0.753,5.979-3.66,6.863l-28.699,8.737c-2.906,0.885-5.979-0.754-6.863-3.659\r\n\t\t\t\tC309.015,130.989,310.653,127.917,313.559,127.032z\"/>\r\n\t\t</g>\r\n\t</g>\r\n\t<g id=\"shine4\">\r\n\t\t<g>\r\n\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#FDEB2E;\" d=\"M86.317,327.928l13.8-26.638\r\n\t\t\t\tc1.397-2.697,4.717-3.751,7.414-2.354s3.75,4.717,2.354,7.413l-13.801,26.638c-1.396,2.697-4.716,3.751-7.413,2.354\r\n\t\t\t\tC85.974,333.944,84.92,330.625,86.317,327.928z\"/>\r\n\t\t</g>\r\n\t</g>\r\n\t<g id=\"shine3\">\r\n\t\t<g>\r\n\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#FDEB2E;\" d=\"M239.19,42.787l14.116-26.472\r\n\t\t\t\tc1.429-2.681,4.76-3.695,7.441-2.266c2.68,1.429,3.694,4.761,2.265,7.441l-14.115,26.472c-1.43,2.68-4.761,3.694-7.441,2.265\r\n\t\t\t\tC238.775,48.799,237.761,45.467,239.19,42.787z\"/>\r\n\t\t</g>\r\n\t</g>\r\n\t<g id=\"shine2\">\r\n\t\t<g>\r\n\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#FDEB2E;\" d=\"M215.061,310.025c2.895-0.919,5.987,0.683,6.906,3.578\r\n\t\t\t\tl9.078,28.594c0.919,2.896-0.683,5.987-3.578,6.906c-2.895,0.919-5.987-0.683-6.906-3.578l-9.078-28.594\r\n\t\t\t\tC210.564,314.037,212.166,310.944,215.061,310.025z\"/>\r\n\t\t</g>\r\n\t</g>\r\n\t<g id=\"shine1\">\r\n\t\t<g>\r\n\t\t\t<path style=\"fill-rule:evenodd;clip-rule:evenodd;fill:#FDEB2E;\" d=\"M121.955,0.24c2.906-0.885,5.979,0.754,6.863,3.66\r\n\t\t\t\tl8.738,28.699c0.884,2.906-0.754,5.979-3.66,6.863s-5.979-0.754-6.863-3.659l-8.738-28.7\r\n\t\t\t\tC117.411,4.198,119.049,1.125,121.955,0.24z\"/>\r\n\t\t</g>\r\n\t</g>\r\n</g>\r\n</svg>\r\n";

},{}]},{},[15]);
