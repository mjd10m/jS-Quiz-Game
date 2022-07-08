const startButtonE1 = document.getElementById('start-btn')
const startContainerE1 = document.getElementById('start-container')
const questionAnswerContainerE1 = document.getElementById('qa-container')
let shuffledQuestionsArray, currentQuestion
const questionE1 = document.getElementById('question')
const answerE1 = document.getElementById('answers')
const startingTimeSeconds = 90;
let currentTime = startingTimeSeconds
const timerE1 = document.getElementById('timer')
let timerPaused = true
var timer = setInterval(updateTimer, 1000);
const gameOverContainerE1 = document.getElementById('game-over-container')
const submitHighScoreE1 = document.getElementById('save-initials-score')
const playAgainE1 = document.getElementById('play-again');
const homeE1 = document.getElementById('home');
const highscoresE1 = document.getElementById('highscores');
var scoreE1 = document.getElementById('score');
const initialsSubmissionBoxE1 = document.getElementById('initials-form');
const replayBtns = document.getElementById('replay-btns');
const updateGameOverMessage = document.getElementById('game-over-main')
var highscores = {
    initials: '',
    score: ''
}


startButtonE1.addEventListener("click", startGame)
submitHighScoreE1.addEventListener("click", addScore)
playAgainE1.addEventListener("click", restartGame)
homeE1.addEventListener("click", returnHome)

function updateTimer() {
    if (currentTime >= 0){
        if(!timerPaused){
        const minutes = Math.floor(currentTime / 60);
        let seconds = currentTime % 60;
        if (seconds < 10){
            timerE1.innerHTML = "Time Remaing: " + minutes + ": " + "0" + seconds;
        } else {
            timerE1.innerHTML = "Time Remaing: " + minutes + ": " + seconds;
        }
        currentTime--;
        }
    } else {
        console.log('gameover')
        clearInterval(timer)
        gamerOver() 
    }

}

function returnHome() {
    location.reload()
}
function startGame() {
    timerPaused = false;
    console.log("Started");
    startContainerE1.classList.add('hide');
    shuffledQuestionsArray = questions.sort(()=> Math.random() - .5)
    currentQuestion = 0
    questionAnswerContainerE1.classList.remove('hide')
    timerE1.classList.remove('hide')
    setNextQuestion()

}

function setNextQuestion() {
    if (currentQuestion === 0){
        timerPaused = false;
        resetquestion();
        displayQuestion(shuffledQuestionsArray[currentQuestion]);
    } else {
        timerPaused = false;
        resetAnswerMessage();
        resetquestion();
        displayQuestion(shuffledQuestionsArray[currentQuestion]);
    } 
}

function displayQuestion(question) {
    questionE1.innerHTML = question.question
    question.answers.forEach(answer => {
        const newButton = document.createElement('button');
        newButton.innerText = answer.text;
        newButton.classList.add('btn');
        if (answer.correct) {
            newButton.dataset.correct = answer.correct
        }
        newButton.addEventListener('click', selectAnswer)
        answerE1.appendChild(newButton)
    })
}

function selectAnswer(event) {
    const selectedAnswerButton = event.target
    //const correctAnswer = selectedAnswerButton.dataset.correct
    isAnswerCorrect(selectedAnswerButton, selectedAnswerButton.dataset.correct)
    if (shuffledQuestionsArray.length > currentQuestion + 1) {
        currentQuestion++
        setTimeout(setNextQuestion, 3000)
    } else {
        clearInterval(timer)
        console.log('gameover')
        setTimeout(gameOver, 3000)
    }

}

function isAnswerCorrect(selectedAnswerButton, correct) {
    //clearAnswerCorrect(element)
    const answerMessage = document.getElementById('answer-message');
    //answerE1.children.classList.remove('correct')
    //answerE1.childElementCount.classList.remove('incorrect')
    if (correct) {
        console.log('correct');
        answerMessage.innerText = "Correct"
        answerMessage.classList.remove('hide')
        selectedAnswerButton.classList.add('correct')
        timerPaused = true;
    } else {
        console.log('incorrect');
        answerMessage.innerText = 'Incorrect'
        answerMessage.classList.remove('hide')
        selectedAnswerButton.classList.add('incorrect')
        currentTime = currentTime - 15
        timerPaused = true;
    }
}

function resetAnswerMessage () {
    const updatedAnswerMessage = document.getElementById('answer-message');
    updatedAnswerMessage.classList.add('hide')
}



function resetquestion() {
    while (answerE1.firstChild) {
        answerE1.removeChild(answerE1.firstChild);
    }
}

function gameOver() {
    
    questionAnswerContainerE1.classList.add('hide');
    timerE1.innerHTML = ''
    resetAnswerMessage();
    gameOverContainerE1.classList.remove('hide');
    updateGameOverMessage.innerHTML = 'Quiz Completed!'
    scoreE1.innerHTML = "Your score is " + currentTime

}

function addScore(event) {
    event.preventDefault();
    highscores.initials = document.querySelector("input[name='player-initials']").value;
    highscores.score = currentTime
    var getHighscores = JSON.parse(localStorage.getItem("scores"));
    var savedHighscores = []
    savedHighscores.push(getHighscores)
    if (getHighscores === null) {
        localStorage.setItem("scores", JSON.stringify(highscores));
    } else {
        savedHighscores.push(highscores);
        localStorage.setItem("scores", JSON.stringify(savedHighscores));
    }
    replayBtns.classList.remove('hide');
    updateGameOverMessage.innerHTML = "Your score has been logged"
    scoreE1.innerHTML = highscores.initials + " - " + highscores.score
    initialsSubmissionBoxE1.classList.add('hide')

}

function restartGame() {
    replayBtns.classList.add('hide');
    initialsSubmissionBoxE1.classList.remove('hide')
    gameOverContainerE1.classList.add('hide');
    currentTime = startingTimeSeconds
    timerE1.classList.remove('hide')
    timer = setInterval(updateTimer, 1000);
    startGame()
    

}
const questions = [
    {
        question: 'What is 2 + 2',
        answers: [
            {text: '4', correct: true},
            {text: '45', correct: false}
        ]
    },
    {
        question: 'What is 20 + 25',
        answers: [
            {text: '4', correct: false},
            {text: '45', correct: true}
        ]
    }
]