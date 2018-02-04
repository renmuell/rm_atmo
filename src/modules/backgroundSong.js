const BackgroundSong = function (url) {

  const backgroundSong = {
    song: new Audio(url),
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