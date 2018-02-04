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