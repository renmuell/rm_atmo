/******************************************************************************
 * backgroundSong.js
 *
 * With this module a background song can be looped.
 *
 * @author Rene Müller <rene.mueller.code@gmail.com>
 *****************************************************************************/

/**
 *  @param {string} url - song URL
 */
const BackgroundSong = function (url) {

  /* new instance */

  const backgroundSong = {

    /**
     *  background song
     *  @type {Audio}
     */
    song: new Audio(url),

    /**
     *  Attach and start the song
     *  
     *  @public  
     */
    init: () => {

      backgroundSong.song.addEventListener('canplaythrough', () => {
        backgroundSong.song.loop = true
        backgroundSong.song.play()
      })

      document.body.appendChild(backgroundSong.song)

      if (backgroundSong.song.readyState > 3) {
        backgroundSong.song.loop = true
        backgroundSong.song.play()
      }

    }
  }

  return backgroundSong
}

module.exports =  BackgroundSong
