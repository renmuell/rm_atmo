(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=function(){'use strict';function getNthRoot(value,n){return Math.pow(value,1/n)}function isValidNoteName(noteName){var validNameRegex=/^[A-G][b#]?[0-8]$/;return'string'==typeof noteName&&validNameRegex.test(noteName)}function isScaleTypeDefined(scaleName){return scaleDefs.hasOwnProperty(scaleName)}function isValidScaleName(scaleName){var scaleNameRegex=/^[A-Za-z\-\_ ]+$/;return'string'==typeof scaleName&&scaleNameRegex.test(scaleName)}function isValidScaleDefinition(scaleDef){return Array.isArray(scaleDef)&&scaleDef.every(isPositiveIntegerGreaterThanZero)}function isPositiveIntegerGreaterThanZero(value){return'number'==typeof value&&value%1===0&&value>0}function getNoteByInterval(reference,interval){var frequency=reference*Math.pow(TWELFTH_ROOT,interval);return frequency=frequency>MAX_FREQUENCY?MAX_FREQUENCY:frequency,frequency=MIN_FREQUENCY>frequency?MIN_FREQUENCY:frequency,Math.round(100*frequency)/100}function getCentsByInterval(interval){return interval*CENTS_PER_SEMITONE}function getIntervalFromA4(noteName,octave){var semitonesInOctave=12,A4Octave=4,intervalsRelativeToA={C:-9,D:-7,E:-5,F:-4,G:-2,A:0,B:2};return intervalsRelativeToA[noteName]+(octave-A4Octave)*semitonesInOctave}function getIntervalAdjustment(sharpOrFlat){var adjustments={'#':1,b:-1};return'#'!==sharpOrFlat&&'b'!==sharpOrFlat?0:adjustments[sharpOrFlat]}function getScaleNames(){var scaleName,scaleNames=[];for(scaleName in scaleDefs)scaleDefs.hasOwnProperty(scaleName)&&scaleNames.push(scaleName);return scaleNames}function getNote(noteString){if(!isValidNoteName(noteString))throw new Error('Invalid argument noteString: getNote(noteString) noteString should be a valid note name, eg. "Ab0", "C7"');var intervalFromA,adjustedInterval,noteNameMatch=noteString.match(/^[A-G]/g),sharpOrFlatMatch=noteString.match(/[b#]/g),octaveMatch=noteString.match(/[0-8]/g),noteName=noteNameMatch?noteNameMatch[0]:null,sharpOrFlat=sharpOrFlatMatch?sharpOrFlatMatch[0]:null,octave=octaveMatch?parseInt(octaveMatch[0],10):null;return intervalFromA=getIntervalFromA4(noteName,octave),adjustedInterval=intervalFromA+getIntervalAdjustment(sharpOrFlat),getNoteByInterval(REF_FREQUENCIES.A4,adjustedInterval)}function makeScale(scaleType,startNote,noteCount){if(arguments.length<3)throw new Error('Missing argument(s): makeScale() expects three arguments');if(!isValidScaleName(scaleType))throw new Error('Invalid argument scaleType: makeScale(scaleType, startNote, noteCount) expects scaleType to be a string consisting of lower or upper case letters (A-Z, a-z), spaces, hyphens(-) or underscores(_) only');if(!isScaleTypeDefined(scaleType))throw new Error('Scale type is undefined: makeScale(scaleType, startNote, noteCount) scale with name provided for scaleType is not defined – make sure you choose from available scale types');if(!isPositiveIntegerGreaterThanZero(noteCount))throw new Error('Invalid argument noteCount: makeScale(scaleType, startNote, noteCount) expects noteCount to be a positive integer greater than 0');if(!isValidNoteName(startNote))throw new Error('Invalid argument startNote: makeScale(scaleType, startNote, noteCount) startNote should be a valid note name, eg. "Ab0", "C7"');var i,scaleDef=scaleDefs[scaleType],scaleInHertz=[],scaleInCents=[],scaleInSemitones=[],intervalsFromStartNote=0,intervalCounter=0,startFrequency=getNote(startNote);for(scaleInHertz.push(startFrequency),scaleInCents.push(0),scaleInSemitones.push(0),i=0;noteCount-1>i;i+=1)intervalsFromStartNote+=scaleDef[intervalCounter],scaleInHertz.push(getNoteByInterval(startFrequency,intervalsFromStartNote)),scaleInCents.push(getCentsByInterval(intervalsFromStartNote)),scaleInSemitones.push(intervalsFromStartNote),intervalCounter=intervalCounter===scaleDef.length-1?0:intervalCounter+1;return{startNote:startFrequency,inHertz:scaleInHertz,inCents:scaleInCents,inSemiTones:scaleInSemitones}}function addScale(name,scaleDef){if(arguments.length<2)throw new Error('Missing argument(s): addScale() expects two arguments');if(!isValidScaleName(name))throw new Error('Invalid argument name: addScale(name, scaleDef) expects name to be a string consisting of lower or upper case letters (A-Z, a-z), spaces, hyphens(-) or underscores(_) only');if(isScaleTypeDefined(name))throw new Error('Scale type already defined: addScale(name, scaleDef) scale with value of name argument is already defined – make sure you choose a scale name not already in use');if(!isValidScaleDefinition(scaleDef))throw new Error('Invalid argument scaleDef: addScale(name, scaleDef) expects scaleDef to be an array of only positive integers greater than 0');scaleDefs[name]=scaleDef}var TWELFTH_ROOT=getNthRoot(2,12),REF_FREQUENCIES={A4:440,C0:16.35,B8:7902.13},MIN_FREQUENCY=REF_FREQUENCIES.C0,MAX_FREQUENCY=REF_FREQUENCIES.B8,CENTS_PER_SEMITONE=100,scaleDefs={};return scaleDefs.chromatic=[1],scaleDefs.wholeTone=[2],scaleDefs.major=[2,2,1,2,2,2,1],scaleDefs.majorPentatonic=[2,2,3,2,3],scaleDefs.minorPentatonic=[3,2,2,3,2],scaleDefs.kuomiPentatonic=[1,4,2,1,4],scaleDefs.chinesePentatonic=[4,2,1,4,1],scaleDefs.naturalMinor=[2,1,2,2,1,2,2],scaleDefs.harmonicMinor=[2,1,2,2,1,3,1],scaleDefs.melodicMinor=[2,1,2,2,2,2,1],{makeScale:makeScale,getNote:getNote,addScale:addScale,getScaleNames:getScaleNames,test:{getIntervalFromA4:getIntervalFromA4,getIntervalAdjustment:getIntervalAdjustment,getCentsByInterval:getCentsByInterval,getNoteByInterval:getNoteByInterval,isValidNoteName:isValidNoteName,isValidScaleName:isValidScaleName,isValidScaleDefinition:isValidScaleDefinition,isPositiveIntegerGreaterThanZero:isPositiveIntegerGreaterThanZero,isScaleTypeDefined:isScaleTypeDefined}}}();
},{}],2:[function(require,module,exports){
const BackgroundSong = function (url) {

  const backgroundSong = {
    song: new Audio(url),
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
},{}],3:[function(require,module,exports){
const Circle = function (x, y){

  const circle = { 

    x           : x, 
    y           : y, 
    radius      : 100 * Math.random(), 
    startAngle  :   Math.random() * (2 * Math.PI), 
    endAngle    : ((Math.random() * (2 * Math.PI)) + Math.random() * 10) % (2 * Math.PI),
    
    startAngleChange :  Math.random()/10 ,
    endAngleChange   : (Math.random()/10) * 2,

    death       : false, 
    lifeTime    : 500 * Math.random(),
    framesAlive : 0, 

    update: () => {
      circle.startAngle = (circle.startAngle + circle.startAngleChange) % (2 * Math.PI)
      circle.endAngle   = (circle.endAngle   + circle.endAngleChange)   % (2 * Math.PI)

      circle.x         += (Math.random() - 0.5)
      circle.y         -= (Math.random() - 0.5)

      circle.death = ++circle.framesAlive > circle.lifeTime
    },

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
},{}],4:[function(require,module,exports){
const DayTime = function (domElement){

  const dayTime = {

    $day       : document.createElement('div'), //  6 - 18
    $night     : document.createElement('div'), // 18 -  6 
    $morning   : document.createElement('div'), //  3 -  9 
    $afternoon : document.createElement('div'), // 15 - 21

    init: () => {
      dayTime.createDom()
    },

    createDom: () => {
      dayTime.appendChild(dayTime.$day       , '#00ADFF')
      dayTime.appendChild(dayTime.$night     , '#3F2850')
      dayTime.appendChild(dayTime.$morning   , '#7D8DF9')
      dayTime.appendChild(dayTime.$afternoon , '#E883E5')
    },

    appendChild: (child, color) => {

      child.style.position        = 'absolute'

      child.style.left            = 0
      child.style.right           = 0
      child.style.top             = 0
      child.style.bottom          = 0

      child.style.zIndex          = -1000000
      child.style.opacity         = 0
      child.style.backgroundColor = color

      domElement.appendChild(child)
    },

    update: () => {
      const hour = new Date().getHours()

      dayTime.$day.style.opacity       = (hour >= 6  && hour <= 18) ? 1                                   : 0
      dayTime.$night.style.opacity     = (hour >= 6  && hour <= 18) ? 0                                   : 1
      dayTime.$morning.style.opacity   = (hour >= 3  && hour <= 9 ) ? (-0.1 * Math.pow(hour - 6 , 2)) + 1 : 0 
      dayTime.$afternoon.style.opacity = (hour >= 15 && hour <= 21) ? (-0.1 * Math.pow(hour - 18, 2)) + 1 : 0
    }

  }

  dayTime.init()

  return dayTime
}

module.exports =  DayTime
},{}],5:[function(require,module,exports){
const EntityList = function  () {

  const entityList = {
    numDeath: 0,
    entities: [],

    add: (entity) => {
      entityList.entities.push(entity)
    },

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

    clearDeath: () => {
      let tmp = []

      entityList.entities.forEach(entity => {
        if (!entity.death){
          tmp.push(entity)
        }
      })

      entityList.entities = tmp
    },
    
    draw: (context, height, width) => {
      entityList.entities.forEach(entity => {
        if (!entity.death){
          entity.draw(context, height, width)         
        }
      })
    }
  }

  return entityList
}

module.exports =  EntityList
},{}],6:[function(require,module,exports){
/*eslint no-console:0*/

var ScaleMaker = require('../../node_modules/scale-maker/lib/node/scaleMaker.min');

// global statics
window.AudioContext = window.AudioContext || window.webkitAudioContext
const AudioContext = new window.AudioContext()
const noteLength = 0.5
const scale = ScaleMaker.makeScale('major', 'G#4', 11)

const UserTap = function  (data){

  const userTap = {

    data        : data,

    death       : false,
    lifeTime    : 10,
    framesAlive : 0,

    init: () => {
      userTap.playNote()
    },

    playNote: () => {
      const oscillator = AudioContext.createOscillator(),
          gainNode = AudioContext.createGain(),
          volume = 0.10 * userTap.data.y,
          time = AudioContext.currentTime + noteLength,
          noteInHertz = scale.inHertz[Math.floor(userTap.data.x * scale.inHertz.length)]

      if (noteInHertz) {
        oscillator.type = 'sine';

        oscillator.frequency.value = noteInHertz;
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
    },

    update: () => {
      userTap.death = ++userTap.framesAlive > userTap.lifeTime
    },

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
},{"../../node_modules/scale-maker/lib/node/scaleMaker.min":1}],7:[function(require,module,exports){

(function (global){

  require('../vendor/cEngine/cEngine-min');
  require('../vendor/cEngine/plugins/cEngine.frameRate-min');
  require('../vendor/cEngine/plugins/cEngine.fill-min');
  require('../vendor/cEngine/plugins/cEngine.input-min');

  var DayTime        = require('./modules/daytime');
  var UserTab        = require('./modules/userTab');
  var Circle         = require('./modules/circle');
  var EntityList     = require('./modules/entityList');
  var BackgroundSong = require('./modules/backgroundSong');

  global.rM_AtMo = {

    create: function (options) {
      
      options = Object.assign({}, {
        domElement: document.body,
        songSrc: undefined
      }, options)

      const rM_AtMo = {
        callbacks  : [],
        frame      : 0,
        entityList : EntityList(),
        song       : BackgroundSong(options.songSrc),
        dayTime    : DayTime(options.domElement),
        engine     : cEngine.create({
          domElement: options.domElement,
          height: 512,
          autoClear: true,
          plugins: {
            frameRate: cEngine.frameRate.create({
              fps: 10
            }),
            fill: cEngine.fill.create({
              mode: 'stretch',
              aspectRetion: true
            }),
            input: cEngine.input.create({
              onPan: (ev) => {
                const data = {
                  x: ev.x/options.domElement.scrollWidth,
                  y: ev.y/options.domElement.scrollHeight
                }
                rM_AtMo.entityList.add(UserTab(data)) 
                rM_AtMo.emitOnTap(data)
              },
              onTap: (ev) => {
                const data = {
                  x: ev.x/options.domElement.scrollWidth,
                  y: ev.y/options.domElement.scrollHeight
                }
                rM_AtMo.entityList.add(UserTab(data)) 
                rM_AtMo.emitOnTap(data)
              }
            })
          },

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

        init: () => {
          setTimeout(function(){
            rM_AtMo.song.init()
            rM_AtMo.engine.start()
          }, 500)
        },

        onTap: (callback) => {
          rM_AtMo.callbacks.push(callback)
        },

        emitOnTap: (data) => {
          rM_AtMo.callbacks.forEach(c => c(data))
        }
      }

      rM_AtMo.init()

      return rM_AtMo
    }
  }

}(typeof window !== 'undefined' ? window : this))


},{"../vendor/cEngine/cEngine-min":8,"../vendor/cEngine/plugins/cEngine.fill-min":9,"../vendor/cEngine/plugins/cEngine.frameRate-min":10,"../vendor/cEngine/plugins/cEngine.input-min":11,"./modules/backgroundSong":2,"./modules/circle":3,"./modules/daytime":4,"./modules/entityList":5,"./modules/userTab":6}],8:[function(require,module,exports){
!function n(e,t,i){function o(s,a){if(!t[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(r)return r(s,!0);throw new Error("Cannot find module '"+s+"'")}var c=t[s]={exports:{}};e[s][0].call(c.exports,function(n){var t=e[s][1][n];return o(t?t:n)},c,c.exports,n,e,t,i)}return t[s].exports}for(var r="function"==typeof require&&require,s=0;s<i.length;s++)o(i[s]);return o}({1:[function(n,e,t){"use strict";n("./vendors/polyfils"),function(n){var e={version:"0.1.5",create:function(n){var e={stepTimeThen:void 0,stepTimeNow:void 0,stepTimeElapsed:void 0,isRunning:!1,canvas:void 0,context:void 0,pluginList:[],requestAnimationFrameId:void 0,init:function(){e.createDomElement(),e.createPluginList(),e.callPlugins("init",[e])},start:function(){e.isRunning=!0,e.callPlugins("start"),e.loop()},stop:function(){e.isRunning=!1,e.requestAnimationFrameId&&window.cancelAnimationFrame(e.requestAnimationFrameId),e.callPlugins("stop")},stepFn:function(){e.autoClear&&e.clear(),e.callPlugins("preStep",[e.context,e.canvas.width,e.canvas.height,e.stepTimeElapsed]),e.step(e.context,e.canvas.width,e.canvas.height,e.stepTimeElapsed),e.callPlugins("postStep",[e.context,e.canvas.width,e.canvas.height,e.stepTimeElapsed])},clear:function(){e.context.clearRect(0,0,e.canvas.width,e.canvas.height)},loop:function(){e.isRunning&&(e.stepTimeNow=(new Date).getTime(),e.stepTimeElapsed=e.stepTimeNow-e.stepTimeThen,e.stepFn(),e.stepTimeThen=e.stepTimeNow,e.requestAnimationFrameId=window.requestAnimationFrame(e.loop))},createDomElement:function(){e.canvas=document.createElement("canvas"),e.domElement.appendChild(e.canvas),e.context=e.canvas.getContext("2d"),e.style&&e.setStyle(e.style),e.resizeTo(e.width||e.canvas.width,e.height||e.canvas.height)},destroy:function(){e.callPlugins("destroy"),e.canvas.remove()},setStyle:function(n){for(var t in n)e.canvas.style[t]=n[t]},resizeTo:function(n,t){e.width=e.canvas.width=n,e.height=e.canvas.height=t},callPlugins:function(n,t){e.pluginList.forEach(function(e){e[n]&&e[n].apply(void 0,t)})},createPluginList:function(){for(var n in e.plugins)e.plugins.hasOwnProperty(n)&&"undefined"!=typeof e.plugins[n]&&"undefined"!=typeof e.plugins[n].cEnginePlugin&&e.pluginList.push(e.plugins[n])}};Object.assign(e,{domElement:document.body,autoClear:!1,step:void 0,width:void 0,height:void 0,style:void 0,plugins:{}},n),e.init();var t={plugins:e.plugins,stop:function(){return e.stop(),t},step:function(n){return n&&n>1?(e.stepFn(),t.step(--n)):(e.stepFn(),t)},start:function(){return e.start(),t},clear:function(){return e.clear(),t},destroy:function(){e.stop(),e.destroy(),e=void 0}};return t},extend:function(n,t){if("undefined"==typeof n||"undefined"==typeof t)throw new Error("id or plugin is undefined!");if(""===n)throw new Error("id is empty!");if(e[n])throw new Error("skiped cEngine-plugin ["+n+']. Maybe already attached or uses intern blocked name like "create", "extend" or "version"!');if("undefined"==typeof t.create)throw new Error("plugin has no create function!");e[n]=t}};n.cEngine=e}("undefined"!=typeof window?window:void 0)},{"./vendors/polyfils":2}],2:[function(n,e,t){"function"!=typeof Object.assign&&!function(){Object.assign=function(n){"use strict";if(void 0===n||null===n)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(n),t=1;t<arguments.length;t++){var i=arguments[t];if(void 0!==i&&null!==i)for(var o in i)i.hasOwnProperty(o)&&(e[o]=i[o])}return e}}()},{}]},{},[1]);


},{}],9:[function(require,module,exports){
!function e(n,i,t){function o(s,d){if(!i[s]){if(!n[s]){var l="function"==typeof require&&require;if(!d&&l)return l(s,!0);if(r)return r(s,!0);throw new Error("Cannot find module '"+s+"'")}var a=i[s]={exports:{}};n[s][0].call(a.exports,function(e){var i=n[s][1][e];return o(i?i:e)},a,a.exports,e,n,i,t)}return i[s].exports}for(var r="function"==typeof require&&require,s=0;s<t.length;s++)o(t[s]);return o}({1:[function(e,n,i){"use strict";!function(e){e.extend("fill",{create:function(e){e=e||{};var n={cEnginePlugin:{name:"fill",version:"0.0.1"},mode:e.mode,useFixedResolution:!1,aspectRetion:"undefined"!=typeof e.aspectRetion?e.aspectRetion:!1,useResolutionDevider:"undefined"!=typeof e.useResolutionDevider?e.useResolutionDevider:!1,resolutionDevider:e.resolutionDevider||2,engine:void 0,initHeight:void 0,initWidth:void 0,init:function(e){n.engine=e,n.initWidth=e.width,n.initHeight=e.height,"fill"===n.mode?(window.addEventListener("resize",n.resizeTo,!1),n.resizeTo()):(n.aspectRetion&&(window.addEventListener("resize",n.resizeToRatio,!1),n.resizeToRatio()),"stretch"===n.mode&&("static"===e.domElement.style.position&&(e.domElement.style.position="relative"),e.canvas.style.position="absolute",e.canvas.style.top="0",e.canvas.style.left="0",e.canvas.style.width="100%",e.canvas.style.height="100%",e.width=e.domElement.clientWidth,e.height=e.domElement.clientHeight))},destroy:function(){window.removeEventListener("resize",n.resizeTo,!1),window.removeEventListener("resize",n.resizeToRatio,!1)},resizeToRatio:function(){var e=n.engine.domElement.clientWidth/n.engine.domElement.clientHeight;n.engine.canvas.height=n.initHeight,n.engine.canvas.width=n.engine.canvas.height*e,n.engine.width=n.engine.domElement.clientWidth,n.engine.height=n.engine.domElement.clientHeight},resizeTo:function(){if(n.useResolutionDevider){n.engine.canvas.width=n.engine.domElement.clientWidth/n.engine.resolutionDevider,n.engine.canvas.height=n.engine.domElement.clientHeight/n.engine.resolutionDevider,n.engine.canvas.style.transformOrigin="0% 0%";var e=n.resolutionDevider;n.engine.canvas.style.transform="scale("+e+", "+e+")"}else n.engine.canvas.width=n.engine.domElement.clientWidth,n.engine.canvas.height=n.engine.domElement.clientHeight;n.engine.width=n.engine.domElement.clientWidth,n.engine.height=n.engine.domElement.clientHeight}};return n}})}(cEngine)},{}]},{},[1]);


},{}],10:[function(require,module,exports){
!function e(n,t,i){function r(s,p){if(!t[s]){if(!n[s]){var f="function"==typeof require&&require;if(!p&&f)return f(s,!0);if(o)return o(s,!0);throw new Error("Cannot find module '"+s+"'")}var u=t[s]={exports:{}};n[s][0].call(u.exports,function(e){var t=n[s][1][e];return r(t?t:e)},u,u.exports,e,n,t,i)}return t[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)r(i[s]);return r}({1:[function(e,n,t){"use strict";!function(e){e.extend("frameRate",{create:function(e){e=e||{};var n={cEnginePlugin:{name:"frameRate",version:"0.0.1"},fps:e.fps||60,fpsInterval:void 0,currentFrame:0,init:function(e){n.setFps(n.fps),n.engine=e,n.engine.loop=n.loop},start:function(){n.engine.stepTimeNow=Date.now(),n.engine.stepTimeThen=n.engine.stepTimeNow},setFps:function(e){n.fps=e,n.fpsInterval=1e3/n.fps},postStep:function(){n.currentFrame++},loop:function(){n.engine.isRunning&&(n.engine.stepTimeNow=(new Date).getTime(),n.engine.stepTimeElapsed=n.engine.stepTimeNow-n.engine.stepTimeThen,n.engine.stepTimeElapsed>n.fpsInterval&&(n.engine.stepFn(),n.engine.stepTimeThen=n.engine.stepTimeNow-n.engine.stepTimeElapsed%n.fpsInterval),requestAnimationFrame(n.loop))}};return n}})}(cEngine)},{}]},{},[1]);


},{}],11:[function(require,module,exports){
!function t(e,n,i){function r(s,a){if(!n[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(o)return o(s,!0);throw new Error("Cannot find module '"+s+"'")}var h=n[s]={exports:{}};e[s][0].call(h.exports,function(t){var n=e[s][1][t];return r(n?n:t)},h,h.exports,t,e,n,i)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<i.length;s++)r(i[s]);return r}({1:[function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}var r=t("../vendors/hammer.min"),o=i(r);t("../vendors/hammer-time.min"),function(t){var e={create:function(t){t=t||{};var n={cEnginePlugin:{name:"inputPlugin",version:"0.0.3"},engine:void 0,keys:{},onTap:t.onTap||function(){},onPan:t.onPan||function(){},hammerManager:void 0,gestures:{singleTap:void 0,pan:void 0},init:function(t){n.engine=t,n.setupHammer(),window.document.addEventListener("keydown",n.onKeydown),window.document.addEventListener("keyup",n.onKeyup)},setupHammer:function(){n.hammerManager=new o["default"].Manager(n.engine.domElement),n.hammerManager.add(new o["default"].Tap({event:"singleTap"})),n.hammerManager.add(new o["default"].Pan({event:"pan"})),n.hammerManager.get("singleTap").recognizeWith("pan"),n.hammerManager.on("singleTap",function(t){n.gestures.singleTap=t.center}),n.hammerManager.on("pan",function(t){n.gestures.pan=t.center})},postStep:function(){n.gestures.singleTap&&(n.onTap(n.getCanvasPosition(n.gestures.singleTap)),n.gestures.singleTap=void 0),n.gestures.pan&&(n.onPan(n.getCanvasPosition(n.gestures.pan)),n.gestures.pan=void 0)},destroy:function(){n.hammerManager.destroy(),window.document.removeEventListener("keydown",n.onKeydown),window.document.removeEventListener("keyup",n.onKeyup)},onKeydown:function(t){n.keys[e.KeyCode[t.keyCode]]=!0},onKeyup:function(t){n.keys[e.KeyCode[t.keyCode]]=!1},getCanvasPosition:function(t){var e=n.engine.canvas.getBoundingClientRect();return t.x=t.x-e.left,t.y=t.y-e.top,n.engine.useResolutionDevider&&(t.x=t.x/n.engine.resolutionDevider,t.y=t.y/n.engine.resolutionDevider),t}};return n},KeyCode:{27:"ESC",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z"}};t.extend("input",e)}(cEngine)},{"../vendors/hammer-time.min":2,"../vendors/hammer.min":3}],2:[function(t,e,n){!function(){var t=window.MutationObserver||window.WebKitMutationObserver,e="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,n=void 0!==document.documentElement.style["touch-action"]||document.documentElement.style["-ms-touch-action"];if(!n&&e&&t){window.Hammer=window.Hammer||{};var i=/touch-action[:][\s]*(none)[^;'"]*/,r=/touch-action[:][\s]*(manipulation)[^;'"]*/,o=/touch-action/,s=!!navigator.userAgent.match(/(iPad|iPhone|iPod)/g),a=function(){try{var t=document.createElement("canvas");return!(!window.WebGLRenderingContext||!t.getContext("webgl")&&!t.getContext("experimental-webgl"))}catch(e){return!1}}(),u=a&&s;window.Hammer.time={getTouchAction:function(t){return this.checkStyleString(t.getAttribute("style"))},checkStyleString:function(t){return o.test(t)?i.test(t)?"none":r.test(t)?"manipulation":!0:void 0},shouldHammer:function(t){var e=this.hasParent(t.target);return e&&(!u||Date.now()-t.target.lastStart<125)?e:!1},touchHandler:function(t){var e=t.target.getBoundingClientRect(),n=e.top!==this.pos.top||e.left!==this.pos.left,i=this.shouldHammer(t);("none"===i||n===!1&&"manipulation"===i)&&("touchend"===t.type&&(t.target.focus(),setTimeout(function(){t.target.click()},0)),t.preventDefault()),this.scrolled=!1,delete t.target.lastStart},touchStart:function(t){this.pos=t.target.getBoundingClientRect(),u&&this.hasParent(t.target)&&(t.target.lastStart=Date.now())},styleWatcher:function(t){t.forEach(this.styleUpdater,this)},styleUpdater:function(t){if(t.target.updateNext)return void(t.target.updateNext=!1);var e=this.getTouchAction(t.target);return e?void("none"!==e&&(t.target.hadTouchNone=!1)):void(!e&&(t.oldValue&&this.checkStyleString(t.oldValue)||t.target.hadTouchNone)&&(t.target.hadTouchNone=!0,t.target.updateNext=!1,t.target.setAttribute("style",t.target.getAttribute("style")+" touch-action: none;")))},hasParent:function(t){for(var e,n=t;n&&n.parentNode;n=n.parentNode)if(e=this.getTouchAction(n))return e;return!1},installStartEvents:function(){document.addEventListener("touchstart",this.touchStart.bind(this)),document.addEventListener("mousedown",this.touchStart.bind(this))},installEndEvents:function(){document.addEventListener("touchend",this.touchHandler.bind(this),!0),document.addEventListener("mouseup",this.touchHandler.bind(this),!0)},installObserver:function(){this.observer=new t(this.styleWatcher.bind(this)).observe(document,{subtree:!0,attributes:!0,attributeOldValue:!0,attributeFilter:["style"]})},install:function(){this.installEndEvents(),this.installStartEvents(),this.installObserver()}},window.Hammer.time.install()}}()},{}],3:[function(t,e,n){!function(t,n,i,r){"use strict";function o(t,e,n){return setTimeout(c(t,n),e)}function s(t,e,n){return Array.isArray(t)?(a(t,n[e],n),!0):!1}function a(t,e,n){var i;if(t)if(t.forEach)t.forEach(e,n);else if(t.length!==r)for(i=0;i<t.length;)e.call(n,t[i],i,t),i++;else for(i in t)t.hasOwnProperty(i)&&e.call(n,t[i],i,t)}function u(e,n,i){var r="DEPRECATED METHOD: "+n+"\n"+i+" AT \n";return function(){var n=new Error("get-stack-trace"),i=n&&n.stack?n.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",o=t.console&&(t.console.warn||t.console.log);return o&&o.call(t.console,r,i),e.apply(this,arguments)}}function h(t,e,n){var i,r=e.prototype;i=t.prototype=Object.create(r),i.constructor=t,i._super=r,n&&ut(i,n)}function c(t,e){return function(){return t.apply(e,arguments)}}function l(t,e){return typeof t==lt?t.apply(e?e[0]||r:r,e):t}function p(t,e){return t===r?e:t}function d(t,e,n){a(g(e),function(e){t.addEventListener(e,n,!1)})}function f(t,e,n){a(g(e),function(e){t.removeEventListener(e,n,!1)})}function v(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function m(t,e){return t.indexOf(e)>-1}function g(t){return t.trim().split(/\s+/g)}function y(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var i=0;i<t.length;){if(n&&t[i][n]==e||!n&&t[i]===e)return i;i++}return-1}function T(t){return Array.prototype.slice.call(t,0)}function E(t,e,n){for(var i=[],r=[],o=0;o<t.length;){var s=e?t[o][e]:t[o];y(r,s)<0&&i.push(t[o]),r[o]=s,o++}return n&&(i=e?i.sort(function(t,n){return t[e]>n[e]}):i.sort()),i}function w(t,e){for(var n,i,o=e[0].toUpperCase()+e.slice(1),s=0;s<ht.length;){if(n=ht[s],i=n?n+o:e,i in t)return i;s++}return r}function b(){return gt++}function A(e){var n=e.ownerDocument||e;return n.defaultView||n.parentWindow||t}function S(t,e){var n=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){l(t.options.enable,[t])&&n.handler(e)},this.init()}function I(t){var e,n=t.options.inputClass;return new(e=n?n:Et?W:wt?F:Tt?U:L)(t,P)}function P(t,e,n){var i=n.pointers.length,r=n.changedPointers.length,o=e&Ct&&i-r===0,s=e&(xt|_t)&&i-r===0;n.isFirst=!!o,n.isFinal=!!s,o&&(t.session={}),n.eventType=e,C(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n}function C(t,e){var n=t.session,i=e.pointers,r=i.length;n.firstInput||(n.firstInput=_(e)),r>1&&!n.firstMultiple?n.firstMultiple=_(e):1===r&&(n.firstMultiple=!1);var o=n.firstInput,s=n.firstMultiple,a=s?s.center:o.center,u=e.center=M(i);e.timeStamp=ft(),e.deltaTime=e.timeStamp-o.timeStamp,e.angle=z(a,u),e.distance=O(a,u),D(n,e),e.offsetDirection=N(e.deltaX,e.deltaY);var h=R(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=h.x,e.overallVelocityY=h.y,e.overallVelocity=dt(h.x)>dt(h.y)?h.x:h.y,e.scale=s?H(s.pointers,i):1,e.rotation=s?k(s.pointers,i):0,e.maxPointers=n.prevInput?e.pointers.length>n.prevInput.maxPointers?e.pointers.length:n.prevInput.maxPointers:e.pointers.length,x(n,e);var c=t.element;v(e.srcEvent.target,c)&&(c=e.srcEvent.target),e.target=c}function D(t,e){var n=e.center,i=t.offsetDelta||{},r=t.prevDelta||{},o=t.prevInput||{};(e.eventType===Ct||o.eventType===xt)&&(r=t.prevDelta={x:o.deltaX||0,y:o.deltaY||0},i=t.offsetDelta={x:n.x,y:n.y}),e.deltaX=r.x+(n.x-i.x),e.deltaY=r.y+(n.y-i.y)}function x(t,e){var n,i,o,s,a=t.lastInterval||e,u=e.timeStamp-a.timeStamp;if(e.eventType!=_t&&(u>Pt||a.velocity===r)){var h=e.deltaX-a.deltaX,c=e.deltaY-a.deltaY,l=R(u,h,c);i=l.x,o=l.y,n=dt(l.x)>dt(l.y)?l.x:l.y,s=N(h,c),t.lastInterval=e}else n=a.velocity,i=a.velocityX,o=a.velocityY,s=a.direction;e.velocity=n,e.velocityX=i,e.velocityY=o,e.direction=s}function _(t){for(var e=[],n=0;n<t.pointers.length;)e[n]={clientX:pt(t.pointers[n].clientX),clientY:pt(t.pointers[n].clientY)},n++;return{timeStamp:ft(),pointers:e,center:M(e),deltaX:t.deltaX,deltaY:t.deltaY}}function M(t){var e=t.length;if(1===e)return{x:pt(t[0].clientX),y:pt(t[0].clientY)};for(var n=0,i=0,r=0;e>r;)n+=t[r].clientX,i+=t[r].clientY,r++;return{x:pt(n/e),y:pt(i/e)}}function R(t,e,n){return{x:e/t||0,y:n/t||0}}function N(t,e){return t===e?Mt:dt(t)>=dt(e)?0>t?Rt:Nt:0>e?Ot:zt}function O(t,e,n){n||(n=Wt);var i=e[n[0]]-t[n[0]],r=e[n[1]]-t[n[1]];return Math.sqrt(i*i+r*r)}function z(t,e,n){n||(n=Wt);var i=e[n[0]]-t[n[0]],r=e[n[1]]-t[n[1]];return 180*Math.atan2(r,i)/Math.PI}function k(t,e){return z(e[1],e[0],Xt)+z(t[1],t[0],Xt)}function H(t,e){return O(e[0],e[1],Xt)/O(t[0],t[1],Xt)}function L(){this.evEl=Ft,this.evWin=qt,this.allow=!0,this.pressed=!1,S.apply(this,arguments)}function W(){this.evEl=Kt,this.evWin=jt,S.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function X(){this.evTarget=Bt,this.evWin=Zt,this.started=!1,S.apply(this,arguments)}function Y(t,e){var n=T(t.touches),i=T(t.changedTouches);return e&(xt|_t)&&(n=E(n.concat(i),"identifier",!0)),[n,i]}function F(){this.evTarget=Qt,this.targetIds={},S.apply(this,arguments)}function q(t,e){var n=T(t.touches),i=this.targetIds;if(e&(Ct|Dt)&&1===n.length)return i[n[0].identifier]=!0,[n,n];var r,o,s=T(t.changedTouches),a=[],u=this.target;if(o=n.filter(function(t){return v(t.target,u)}),e===Ct)for(r=0;r<o.length;)i[o[r].identifier]=!0,r++;for(r=0;r<s.length;)i[s[r].identifier]&&a.push(s[r]),e&(xt|_t)&&delete i[s[r].identifier],r++;return a.length?[E(o.concat(a),"identifier",!0),a]:void 0}function U(){S.apply(this,arguments);var t=c(this.handler,this);this.touch=new F(this.manager,t),this.mouse=new L(this.manager,t)}function V(t,e){this.manager=t,this.set(e)}function K(t){if(m(t,re))return re;var e=m(t,oe),n=m(t,se);return e&&n?re:e||n?e?oe:se:m(t,ie)?ie:ne}function j(t){this.options=ut({},this.defaults,t||{}),this.id=b(),this.manager=null,this.options.enable=p(this.options.enable,!0),this.state=ae,this.simultaneous={},this.requireFail=[]}function G(t){return t&pe?"cancel":t&ce?"end":t&he?"move":t&ue?"start":""}function B(t){return t==zt?"down":t==Ot?"up":t==Rt?"left":t==Nt?"right":""}function Z(t,e){var n=e.manager;return n?n.get(t):t}function J(){j.apply(this,arguments)}function Q(){J.apply(this,arguments),this.pX=null,this.pY=null}function $(){J.apply(this,arguments)}function tt(){j.apply(this,arguments),this._timer=null,this._input=null}function et(){J.apply(this,arguments)}function nt(){J.apply(this,arguments)}function it(){j.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function rt(t,e){return e=e||{},e.recognizers=p(e.recognizers,rt.defaults.preset),new ot(t,e)}function ot(t,e){this.options=ut({},rt.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.element=t,this.input=I(this),this.touchAction=new V(this,this.options.touchAction),st(this,!0),a(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function st(t,e){var n=t.element;n.style&&a(t.options.cssProps,function(t,i){n.style[w(n.style,i)]=e?t:""})}function at(t,e){var i=n.createEvent("Event");i.initEvent(t,!0,!0),i.gesture=e,e.target.dispatchEvent(i)}var ut,ht=["","webkit","Moz","MS","ms","o"],ct=n.createElement("div"),lt="function",pt=Math.round,dt=Math.abs,ft=Date.now;ut="function"!=typeof Object.assign?function(t){if(t===r||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var i=arguments[n];if(i!==r&&null!==i)for(var o in i)i.hasOwnProperty(o)&&(e[o]=i[o])}return e}:Object.assign;var vt=u(function(t,e,n){for(var i=Object.keys(e),o=0;o<i.length;)(!n||n&&t[i[o]]===r)&&(t[i[o]]=e[i[o]]),o++;return t},"extend","Use `assign`."),mt=u(function(t,e){return vt(t,e,!0)},"merge","Use `assign`."),gt=1,yt=/mobile|tablet|ip(ad|hone|od)|android/i,Tt="ontouchstart"in t,Et=w(t,"PointerEvent")!==r,wt=Tt&&yt.test(navigator.userAgent),bt="touch",At="pen",St="mouse",It="kinect",Pt=25,Ct=1,Dt=2,xt=4,_t=8,Mt=1,Rt=2,Nt=4,Ot=8,zt=16,kt=Rt|Nt,Ht=Ot|zt,Lt=kt|Ht,Wt=["x","y"],Xt=["clientX","clientY"];S.prototype={handler:function(){},init:function(){this.evEl&&d(this.element,this.evEl,this.domHandler),this.evTarget&&d(this.target,this.evTarget,this.domHandler),this.evWin&&d(A(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&f(this.element,this.evEl,this.domHandler),this.evTarget&&f(this.target,this.evTarget,this.domHandler),this.evWin&&f(A(this.element),this.evWin,this.domHandler)}};var Yt={mousedown:Ct,mousemove:Dt,mouseup:xt},Ft="mousedown",qt="mousemove mouseup";h(L,S,{handler:function(t){var e=Yt[t.type];e&Ct&&0===t.button&&(this.pressed=!0),e&Dt&&1!==t.which&&(e=xt),this.pressed&&this.allow&&(e&xt&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:St,srcEvent:t}))}});var Ut={pointerdown:Ct,pointermove:Dt,pointerup:xt,pointercancel:_t,pointerout:_t},Vt={2:bt,3:At,4:St,5:It},Kt="pointerdown",jt="pointermove pointerup pointercancel";t.MSPointerEvent&&!t.PointerEvent&&(Kt="MSPointerDown",jt="MSPointerMove MSPointerUp MSPointerCancel"),h(W,S,{handler:function(t){var e=this.store,n=!1,i=t.type.toLowerCase().replace("ms",""),r=Ut[i],o=Vt[t.pointerType]||t.pointerType,s=o==bt,a=y(e,t.pointerId,"pointerId");r&Ct&&(0===t.button||s)?0>a&&(e.push(t),a=e.length-1):r&(xt|_t)&&(n=!0),0>a||(e[a]=t,this.callback(this.manager,r,{pointers:e,changedPointers:[t],pointerType:o,srcEvent:t}),n&&e.splice(a,1))}});var Gt={touchstart:Ct,touchmove:Dt,touchend:xt,touchcancel:_t},Bt="touchstart",Zt="touchstart touchmove touchend touchcancel";h(X,S,{handler:function(t){var e=Gt[t.type];if(e===Ct&&(this.started=!0),this.started){var n=Y.call(this,t,e);e&(xt|_t)&&n[0].length-n[1].length===0&&(this.started=!1),this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:bt,srcEvent:t})}}});var Jt={touchstart:Ct,touchmove:Dt,touchend:xt,touchcancel:_t},Qt="touchstart touchmove touchend touchcancel";h(F,S,{handler:function(t){var e=Jt[t.type],n=q.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:bt,srcEvent:t})}}),h(U,S,{handler:function(t,e,n){var i=n.pointerType==bt,r=n.pointerType==St;if(i)this.mouse.allow=!1;else if(r&&!this.mouse.allow)return;e&(xt|_t)&&(this.mouse.allow=!0),this.callback(t,e,n)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var $t=w(ct.style,"touchAction"),te=$t!==r,ee="compute",ne="auto",ie="manipulation",re="none",oe="pan-x",se="pan-y";V.prototype={set:function(t){t==ee&&(t=this.compute()),te&&this.manager.element.style&&(this.manager.element.style[$t]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return a(this.manager.recognizers,function(e){l(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),K(t.join(" "))},preventDefaults:function(t){if(!te){var e=t.srcEvent,n=t.offsetDirection;if(this.manager.session.prevented)return void e.preventDefault();var i=this.actions,r=m(i,re),o=m(i,se),s=m(i,oe);if(r){var a=1===t.pointers.length,u=t.distance<2,h=t.deltaTime<250;if(a&&u&&h)return}if(!s||!o)return r||o&&n&kt||s&&n&Ht?this.preventSrc(e):void 0}},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var ae=1,ue=2,he=4,ce=8,le=ce,pe=16,de=32;j.prototype={defaults:{},set:function(t){return ut(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(s(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=Z(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return s(t,"dropRecognizeWith",this)?this:(t=Z(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(s(t,"requireFailure",this))return this;var e=this.requireFail;return t=Z(t,this),-1===y(e,t)&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(s(t,"dropRequireFailure",this))return this;t=Z(t,this);var e=y(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){n.manager.emit(e,t)}var n=this,i=this.state;ce>i&&e(n.options.event+G(i)),e(n.options.event),t.additionalEvent&&e(t.additionalEvent),i>=ce&&e(n.options.event+G(i))},tryEmit:function(t){return this.canEmit()?this.emit(t):void(this.state=de)},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(de|ae)))return!1;t++}return!0},recognize:function(t){var e=ut({},t);return l(this.options.enable,[this,e])?(this.state&(le|pe|de)&&(this.state=ae),this.state=this.process(e),void(this.state&(ue|he|ce|pe)&&this.tryEmit(e))):(this.reset(),void(this.state=de))},process:function(t){},getTouchAction:function(){},reset:function(){}},h(J,j,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,n=t.eventType,i=e&(ue|he),r=this.attrTest(t);return i&&(n&_t||!r)?e|pe:i||r?n&xt?e|ce:e&ue?e|he:ue:de}}),h(Q,J,{defaults:{event:"pan",threshold:10,pointers:1,direction:Lt},getTouchAction:function(){var t=this.options.direction,e=[];return t&kt&&e.push(se),t&Ht&&e.push(oe),e},directionTest:function(t){var e=this.options,n=!0,i=t.distance,r=t.direction,o=t.deltaX,s=t.deltaY;return r&e.direction||(e.direction&kt?(r=0===o?Mt:0>o?Rt:Nt,n=o!=this.pX,i=Math.abs(t.deltaX)):(r=0===s?Mt:0>s?Ot:zt,n=s!=this.pY,i=Math.abs(t.deltaY))),t.direction=r,n&&i>e.threshold&&r&e.direction},attrTest:function(t){return J.prototype.attrTest.call(this,t)&&(this.state&ue||!(this.state&ue)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=B(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),h($,J,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[re]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&ue)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),h(tt,j,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[ne]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,r=t.deltaTime>e.time;if(this._input=t,!i||!n||t.eventType&(xt|_t)&&!r)this.reset();else if(t.eventType&Ct)this.reset(),this._timer=o(function(){this.state=le,this.tryEmit()},e.time,this);else if(t.eventType&xt)return le;return de},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===le&&(t&&t.eventType&xt?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=ft(),this.manager.emit(this.options.event,this._input)))}}),h(et,J,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[re]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&ue)}}),h(nt,J,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:kt|Ht,pointers:1},getTouchAction:function(){return Q.prototype.getTouchAction.call(this)},attrTest:function(t){var e,n=this.options.direction;return n&(kt|Ht)?e=t.overallVelocity:n&kt?e=t.overallVelocityX:n&Ht&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&n&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&dt(e)>this.options.velocity&&t.eventType&xt},emit:function(t){var e=B(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),h(it,j,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ie]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,r=t.deltaTime<e.time;if(this.reset(),t.eventType&Ct&&0===this.count)return this.failTimeout();if(i&&r&&n){if(t.eventType!=xt)return this.failTimeout();var s=this.pTime?t.timeStamp-this.pTime<e.interval:!0,a=!this.pCenter||O(this.pCenter,t.center)<e.posThreshold;this.pTime=t.timeStamp,this.pCenter=t.center,a&&s?this.count+=1:this.count=1,this._input=t;var u=this.count%e.taps;if(0===u)return this.hasRequireFailures()?(this._timer=o(function(){this.state=le,this.tryEmit()},e.interval,this),ue):le}return de},failTimeout:function(){return this._timer=o(function(){this.state=de},this.options.interval,this),de},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==le&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),rt.VERSION="2.0.6",rt.defaults={domEvents:!1,touchAction:ee,enable:!0,inputTarget:null,inputClass:null,preset:[[et,{enable:!1}],[$,{enable:!1},["rotate"]],[nt,{direction:kt}],[Q,{direction:kt},["swipe"]],[it],[it,{event:"doubletap",taps:2},["tap"]],[tt]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var fe=1,ve=2;ot.prototype={set:function(t){return ut(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?ve:fe},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var n,i=this.recognizers,r=e.curRecognizer;(!r||r&&r.state&le)&&(r=e.curRecognizer=null);for(var o=0;o<i.length;)n=i[o],e.stopped===ve||r&&n!=r&&!n.canRecognizeWith(r)?n.reset():n.recognize(t),!r&&n.state&(ue|he|ce)&&(r=e.curRecognizer=n),o++}},get:function(t){if(t instanceof j)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){if(s(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(s(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,n=y(e,t);-1!==n&&(e.splice(n,1),this.touchAction.update())}return this},on:function(t,e){var n=this.handlers;return a(g(t),function(t){n[t]=n[t]||[],n[t].push(e)}),this},off:function(t,e){var n=this.handlers;return a(g(t),function(t){e?n[t]&&n[t].splice(y(n[t],e),1):delete n[t]}),this},emit:function(t,e){this.options.domEvents&&at(t,e);var n=this.handlers[t]&&this.handlers[t].slice();if(n&&n.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var i=0;i<n.length;)n[i](e),i++}},destroy:function(){this.element&&st(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},ut(rt,{INPUT_START:Ct,INPUT_MOVE:Dt,INPUT_END:xt,INPUT_CANCEL:_t,STATE_POSSIBLE:ae,STATE_BEGAN:ue,STATE_CHANGED:he,STATE_ENDED:ce,STATE_RECOGNIZED:le,STATE_CANCELLED:pe,STATE_FAILED:de,DIRECTION_NONE:Mt,DIRECTION_LEFT:Rt,DIRECTION_RIGHT:Nt,DIRECTION_UP:Ot,DIRECTION_DOWN:zt,DIRECTION_HORIZONTAL:kt,DIRECTION_VERTICAL:Ht,DIRECTION_ALL:Lt,Manager:ot,Input:S,TouchAction:V,TouchInput:F,MouseInput:L,PointerEventInput:W,TouchMouseInput:U,SingleTouchInput:X,Recognizer:j,AttrRecognizer:J,Tap:it,Pan:Q,Swipe:nt,Pinch:$,Rotate:et,Press:tt,on:d,off:f,each:a,merge:mt,extend:vt,assign:ut,inherit:h,bindFn:c,prefixed:w});var me="undefined"!=typeof t?t:"undefined"!=typeof self?self:{};me.Hammer=rt,"function"==typeof define&&define.amd?define(function(){return rt}):"undefined"!=typeof e&&e.exports?e.exports=rt:t[i]=rt}(window,document,"Hammer")},{}]},{},[1]);


},{}]},{},[7]);