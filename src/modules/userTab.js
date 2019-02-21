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
