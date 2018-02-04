
(function (global){

  require('../node_modules/cengine/dist/cEngine-min');
  require('../node_modules/cengine/dist/plugins/cEngine.frameRate-min');
  require('../node_modules/cengine/dist/plugins/cEngine.fill-min');
  require('../node_modules/cengine/dist/plugins/cEngine.input-min');

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

