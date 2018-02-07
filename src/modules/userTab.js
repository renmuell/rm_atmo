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
 */
const UserTap = function  (data){

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
            volume      = 0.10 * userTap.data.y,
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
