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