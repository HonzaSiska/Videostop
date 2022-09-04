export default class Game {
    
    constructor(){
        this.rounds = 0
        this.speed = 1000
        this.numOne = 0
        this.numTwo = 0
        this.numThree = 0
        this.score = 0
        this.attempts = 3
        this.gameOn = true
        this.isNewGame = true  
    }
    
    loop(){

        if(this.score > 9 && this.score < 20){
            this.speed = 800
        }else if(this.score > 19 && this.score < 30){
            this.speed = 600
        }else if(this.score > 29 ){
            this.speed = 400
        }else{
            this.speed
        }

        if(this.gameOn){
            this.numOne = Math.floor((Math.random() * 6) + 1)
                this.numTwo = Math.floor((Math.random() * 6) + 1)
                this.numThree = Math.floor((Math.random() * 6) + 1)
    
                document.getElementById('number-one').innerHTML = this.numOne
                document.getElementById('number-two').innerHTML = this.numTwo
                document.getElementById('number-three').innerHTML = this.numThree 
                
                setTimeout(() => {
                    this.loop()
                }, this.speed)
        } 
    }

    hideShowButtons(){
        document.getElementById('stop-btn').classList.toggle('invisible')
        document.getElementById('stop-btn').classList.toggle('visible')
        document.getElementById('play-btn').classList.toggle('invisible')
        document.getElementById('play-btn').classList.toggle('visible')
    }

    play(){
        if(this.isNewGame){
            this.reset()
            this.isNewGame = false
        }
        if(this.attempts >= 0) this.gameOn = true
        if(this.gameOn === true){
            this.hideShowButtons()
            this.loop()
            console.log(this.numOne, this.numTwo, this.numThree)
        }       
    }

    updateAttempts(num){
        document.getElementById('attempts').innerHTML = num
    }

    updateScore(score){
        document.getElementById('score').innerHTML = score
    }

    reset(){
        this.rounds = 1
        this.speed = 1000
        this.numOne = 0
        this.numTwo = 0
        this.numThree = 0
        this.score = 0
        this.attempts = 3
        this.gameOn = true
        document.getElementById('attempts').innerHTML='3'
        
    }

    stop(){

        this.gameOn = false
        const digits = document.querySelectorAll('.numbers')

        //DISABLE PLAY BUTTON FOR 2 SECONDS
        document.getElementById('play-btn').setAttribute('disabled', true)
        document.getElementById('play-btn').classList.toggle('transparent')

        setTimeout(()=> {
            document.getElementById('play-btn').removeAttribute('disabled')
            document.getElementById('play-btn').classList.toggle('transparent')
        },2000)

        //ADD ONE TO THE ATTEMPTS
        document.getElementById('loops').innerHTML = this.rounds ++

        
        this.hideShowButtons()

        console.log(this.numOne, this.numTwo, this.numThree)
        
        clearInterval(this.interval)

        if(this.numOne === this.numTwo && this.numTwo === this.numThree){
            const music = new Audio('./../music/notification.wav')
            music.play()

            this.score = this.score + 3
            this.updateScore(this.score)
            digits.forEach(digit => digit.classList.add('winning'))

        }else if(this.numOne === this.numTwo || this.numTwo === this.numThree || this.numOne === this.numThree){
            const music = new Audio('./../music/notification.wav')
            music.play()

            // MAKE DIGITS FLASH WHEN MATCH
            if(this.numOne === this.numTwo){
                digits[0].classList.add('winning')
                digits[1].classList.add('winning')    
            }else if(this.numTwo === this.numThree){
                digits[1].classList.add('winning')
                digits[2].classList.add('winning')  
            }else{
                digits[0].classList.add('winning')
                digits[2].classList.add('winning') 
            }

            this.score ++
            this.updateScore(this.score)

        }else{
            this.attempts --

            const music = new Audio('./../music/loss.mp3')
            music.play()

            if(this.attempts < 0){
                const music = new Audio('./../music/gameover.mp3')
                music.play()
                this.gameOn = false
                document.getElementById('buttons-wrapper').classList.add('invisible')
                document.getElementById('new-game-wrapper').classList.toggle('visible')
                document.getElementById('new-game-wrapper').classList.toggle('invisible')
                return
            } 
            this.updateAttempts(this.attempts)    
        }


        // FLASH RED WHEN NO MATCH
        if(this.numOne !== this.numTwo && this.numTwo !== this.numThree && this.numOne !== this.numThree){
            digits.forEach(digit => digit.classList.add('losing'))
        }

        // CLEAR ALL CLASSES THAT MAKE DIGITS FLASH
        setTimeout(()=> {
            digits.forEach(digit => digit.classList.remove('winning'))
            digits.forEach(digit => digit.classList.remove('losing'))
        }, 1000)
        
       
    }
}