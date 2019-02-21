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
