import Game from './modules/Game.js'

addEventListener('load', ()=> {
    
    
    const playButton = document.getElementById('play-btn')
    const stopButton = document.getElementById('stop-btn')
    const newGameButton = document.getElementById('new-game')
    const newGameWrapper = document.getElementById('new-game-wrapper')
    const buttonsWrapper = document.getElementById('buttons-wrapper')
    const score = document.getElementById('score')
    const loops = document.getElementById('loops')
    const attempts= document.getElementById('attempts')

    //START GAME
    newGameButton.addEventListener('click', ()=> {

        const music = new Audio('./music/win.mp3')
        music.play()
        // Reset values in the DOM when new game instance created
        score.innerHTML = "0"
        loops.innerHTML = "0"
        attempts.innnerHTML = "3"

        const game = new Game()
        console.log(game)

        newGameWrapper.classList.toggle('invisible')
        newGameWrapper.classList.toggle('visible')
        buttonsWrapper.classList.remove('invisible')

        playButton.addEventListener('click', () => game.play())

        stopButton.addEventListener('click', () => {
            console.log('from index',game.numOne)
            game.stop()
        })
    })

    
})
    






