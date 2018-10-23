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
    draw: (context, data) => {
      context.beginPath()
      context.lineCap = "round";
      context.arc(
        circle.x, 
        circle.y, 
        circle.radius, 
        circle.startAngle, 
        circle.endAngle)
        
      context.lineWidth = Math.max(1, circle.framesAlive / 100) + ((Math.random() - 0.5) * (circle.framesAlive / 10))
      
      context.shadowColor = context.strokeStyle = 'white'

      if (data.countTouches > 0 && Math.random() > 0.1) {
        context.shadowColor = context.strokeStyle = 'rgba(255,255,255,0.1)'
      }

      context.stroke()   
    }
  }

  return circle
}

module.exports = Circle
