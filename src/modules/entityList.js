/******************************************************************************
 * enityList.js
 *
 * With this module all entires can be maintained. This data structure allows
 * to add new entities, call update and draw on all current entities. Also 
 * all entities not needed anymore will be cleared, after more than 50 entities
 * are dead.
 *
 * @author Rene Müller <rene.mueller.code@gmail.com>
 *****************************************************************************/

const EntityList = function  () {

  /* new instance */

  const entityList = {

    /**
     *  how many are dead
     *  @private
     *  @types {number}
     */
    numDeath: 0,

    /**
     *  list of all entities
     *  @private
     *  @types {array}
     */
    entities: [],

    /**
     *  Add new entity
     *
     *  @public
     *  @param {object} entity - new entity
     */
    add: (entity) => {
      entityList.entities.push(entity)
    },

    /**
     *  Call update on all entities. Also checks
     *  if there are enough dead entities, to
     *  clear them.
     *
     *  @public
     */
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

    /**
     *  Call draw on all entities.
     *
     *  @public
     *  @param {CanvasRenderingContext2D} context - canvas context
     *  @param {number} height - canvas height
     *  @param {number} width - canvas width
     */
    draw: (context, height, width) => {
      entityList.entities.forEach(entity => {
        if (!entity.death){
          entity.draw(context, height, width)         
        }
      })
    },

    /**
     *  Call update on all entities. Also checks
     *  if there are enough dead entities, to
     *  clear them.
     *
     *  @private
     */
    clearDeath: () => {
      let tmp = []

      entityList.entities.forEach(entity => {
        if (!entity.death){
          tmp.push(entity)
        }
      })

      entityList.entities = tmp
    }
  }

  return entityList
}

module.exports =  EntityList
