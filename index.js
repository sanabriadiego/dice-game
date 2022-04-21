const instructionsTitle = document.getElementById("instructions-title")
const player1Score = document.getElementById("player1-score")
const player1Dice = document.getElementById("player1-dice")
const player2Score = document.getElementById("player2-score")
const player2Dice = document.getElementById("player2-dice")
const rollDiceBtn = document.getElementById("roll-dice-btn")
let countPlayer1 = 0
let countPlayer2 = 0
let player1Turn = true

function getRandomNumber(){
    return Math.floor(Math.random()*6)+1
}

function addValuesPlayer1(){
    const randomNum = getRandomNumber()
    countPlayer1 += randomNum
    player1Score.textContent = countPlayer1
    player1Dice.textContent = randomNum
}

function addValuesPlayer2(){
    const randomNum = getRandomNumber()
    countPlayer2 += randomNum
    player2Score.textContent = countPlayer2
    player2Dice.textContent = randomNum
}

function whoseFirst(){
    addValuesPlayer1()
    addValuesPlayer2()

    if(countPlayer1 > countPlayer2){
        instructionsTitle.textContent = "Player 1 Starts!"
        rollDiceBtn.textContent = "Start Game 🎲"
        rollDiceBtn.removeEventListener("click", whoseFirst)
        rollDiceBtn.addEventListener("click", newGame)
        
    }else if(countPlayer1 < countPlayer2){
        instructionsTitle.textContent = "Player 2 Starts!"
        rollDiceBtn.textContent = "Start Game 🎲"
        player1Turn = false
        rollDiceBtn.removeEventListener("click", whoseFirst)
        rollDiceBtn.addEventListener("click", newGame)

    }else{
        instructionsTitle.textContent = "No winner"
        rollDiceBtn.textContent = "Retry 🎲"
    }

}

function resetValues(){
    countPlayer1 = 0
    player1Score.textContent = countPlayer1
    player1Dice.textContent = "-"
    player1Dice.classList.remove("shadow")
    countPlayer2 = 0
    player2Score.textContent = countPlayer2
    player2Dice.textContent = "-"
    player2Dice.classList.remove("shadow")
    rollDiceBtn.textContent = "Roll Dice 🎲"
}

function newGame(){
    instructionsTitle.textContent = player1Turn ? "Player 1 Turn" : "Player 2 Turn"
    resetValues()
    rollDiceBtn.removeEventListener("click", newGame)
    rollDiceBtn.addEventListener("click", whoseTurn)
}

function checkShadow(){
    if(player1Turn){
        player1Dice.classList.remove("shadow")
        player2Dice.classList.add("shadow")
        
    }else{
        player2Dice.classList.remove("shadow")
        player1Dice.classList.add("shadow")
    }
}

function renderPlayer1(){
    addValuesPlayer1()
    instructionsTitle.textContent = "Player 2 Turn"
    checkShadow()
    checkWinner()
}

function renderPlayer2(){
    addValuesPlayer2()
    instructionsTitle.textContent = "Player 1 Turn"
    checkShadow()
    checkWinner()
}

function whoseTurn(){
    if (player1Turn){
        renderPlayer1()
        player1Turn = false
    }else{
        renderPlayer2()
        player1Turn = true
    }
}

function checkWinner(){
    if(countPlayer1 >= 21){
        instructionsTitle.textContent = "Player 1 Won 🎉"
        endGame()
    }else if(countPlayer2 >= 21){
        instructionsTitle.textContent = "Player 2 Won 🎉"
        endGame()
    }
}

function endGame(){
    rollDiceBtn.removeEventListener("click", whoseTurn)
    rollDiceBtn.textContent = "Reset Game 🔁"
    rollDiceBtn.addEventListener("click", resetGame)
}

function resetGame(){
    instructionsTitle.textContent = "Who's First? 🙂"
    resetValues()
    rollDiceBtn.removeEventListener("click", resetGame)
    rollDiceBtn.addEventListener("click", whoseFirst)
}


rollDiceBtn.addEventListener("click", whoseFirst)