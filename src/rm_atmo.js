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
