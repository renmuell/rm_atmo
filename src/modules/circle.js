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
