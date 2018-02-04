const EntityList = function  () {

  const entityList = {
    numDeath: 0,
    entities: [],

    add: (entity) => {
      entityList.entities.push(entity)
    },

    update: () => {
      entityList.entities.forEach(entity => {

        if (!entity.death) {

          entity.update()

          if (entity.death) {
            entityList.numDeath++
          }       
        }
      })

      if (entityList.numDeath > 50) {
        entityList.clearDeath()
      }
    },

    clearDeath: () => {
      let tmp = []

      entityList.entities.forEach(entity => {
        if (!entity.death){
          tmp.push(entity)
        }
      })

      entityList.entities = tmp
    },
    
    draw: (context, height, width) => {
      entityList.entities.forEach(entity => {
        if (!entity.death){
          entity.draw(context, height, width)         
        }
      })
    }
  }

  return entityList
}

module.exports =  EntityList