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