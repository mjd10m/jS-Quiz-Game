const startButtonE1 = document.getElementById('start-btn');
const startContainerE1 = document.getElementById('start-container');
const questionAnswerContainerE1 = document.getElementById('qa-container');
let shuffledQuestionsArray, currentQuestion
const questionE1 = document.getElementById('question');
const answerE1 = document.getElementById('answers');
const startingTimeSeconds = 100;
let currentTime = startingTimeSeconds;
const timerE1 = document.getElementById('timer');
let timerPaused = true;
var timer = setInterval(updateTimer, 1000);
const gameOverContainerE1 = document.getElementById('game-over-container');
const submitHighScoreE1 = document.getElementById('save-initials-score');
const playAgainE1 = document.getElementById('play-again');
const homeE1 = document.getElementById('home');
const highscoresE1 = document.getElementById('highscores');
var scoreE1 = document.getElementById('score');
const initialsSubmissionBoxE1 = document.getElementById('initials-form');
const replayBtns = document.getElementById('replay-btns');
const updateGameOverMessage = document.getElementById('game-over-main');
const highscoreBtnE1 = document.getElementById('highscores');
var highscores = {
    initials: '',
    score: ''
};

highscoreBtnE1.addEventListener("click", loadHsPage);
startButtonE1.addEventListener("click", startGame);
submitHighScoreE1.addEventListener("click", addScore);
playAgainE1.addEventListener("click", restartGame);
homeE1.addEventListener("click", returnHome);



//starts the game and timer
function startGame() {
    timerPaused = false;
    console.log("Started");
    startContainerE1.classList.add('hide');
    shuffledQuestionsArray = questions.sort(()=> Math.random() - .5);
    currentQuestion = 0;
    questionAnswerContainerE1.classList.remove('hide');
    timerE1.classList.remove('hide');
    setNextQuestion();

}

//prepares game for the next question
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

//build the question and answer
function displayQuestion(question) {
    questionE1.innerHTML = question.question;
    question.answers.forEach(answer => {
        const newButton = document.createElement('button');
        newButton.innerText = answer.text;
        newButton.classList.add('btn');
        if (answer.correct) {
            newButton.dataset.correct = answer.correct;
        }
        newButton.addEventListener('click', selectAnswer);
        answerE1.appendChild(newButton);
    })
}

//identifies which answer the player has chosen
function selectAnswer(event) {
    const selectedAnswerButton = event.target;
    isAnswerCorrect(selectedAnswerButton, selectedAnswerButton.dataset.correct);
    if (shuffledQuestionsArray.length > currentQuestion + 1) {
        currentQuestion++;
        setTimeout(setNextQuestion, 1500);
    } else {
        clearInterval(timer);
        console.log('gameover');
        setTimeout(gameOver, 1500);
    }

}

//checks if answer is correct
function isAnswerCorrect(selectedAnswerButton, correct) {
    const answerMessage = document.getElementById('answer-message');
    if (correct) {
        console.log('correct');
        answerMessage.innerText = "Correct";
        answerMessage.classList.remove('hide');
        selectedAnswerButton.classList.add('correct');
        timerPaused = true;
    } else {
        console.log('incorrect');
        answerMessage.innerText = 'Incorrect';
        answerMessage.classList.remove('hide');
        selectedAnswerButton.classList.add('incorrect');
        currentTime = currentTime - 15;
        timerPaused = true;
    }
}

//removes answer message when next question is called
function resetAnswerMessage () {
    const updatedAnswerMessage = document.getElementById('answer-message');
    updatedAnswerMessage.classList.add('hide');
}

//resets question before next question is called
function resetquestion() {
    while (answerE1.firstChild) {
        answerE1.removeChild(answerE1.firstChild);
    }
}

//brings user to the end game screen 
function gameOver() {
    if(currentTime > 0) {
    questionAnswerContainerE1.classList.add('hide');
    timerE1.innerHTML = '';
    resetAnswerMessage();
    gameOverContainerE1.classList.remove('hide');
    updateGameOverMessage.innerHTML = 'Quiz Completed!';
    scoreE1.innerHTML = "Your score is " + currentTime;
    } else {
        questionAnswerContainerE1.classList.add('hide');
    timerE1.innerHTML = ''
    resetAnswerMessage();
    gameOverContainerE1.classList.remove('hide');
    updateGameOverMessage.innerHTML = 'You ran out of time!';
    scoreE1.innerHTML = "Feel free to try again";
    initialsSubmissionBoxE1.classList.add('hide');
    replayBtns.classList.remove('hide');

    }
}

//adds players score to local storage
function addScore(event) {
    event.preventDefault();
    highscores.initials = document.querySelector("input[name='player-initials']").value;
    highscores.score = currentTime;
    var currentHighscores = JSON.parse(localStorage.getItem("scores"));
    if (currentHighscores === null) {
        var newHighscore = [];
        newHighscore.push(highscores);
        localStorage.setItem("scores", JSON.stringify(newHighscore));
    } else {
        currentHighscores.push(highscores);
        localStorage.setItem("scores", JSON.stringify(currentHighscores));
    }
    replayBtns.classList.remove('hide');
    updateGameOverMessage.innerHTML = "Your score has been logged";
    scoreE1.innerHTML = highscores.initials + " - " + highscores.score;
    initialsSubmissionBoxE1.classList.add('hide');

}

//restarts the game from the end game screen
function restartGame() {
    replayBtns.classList.add('hide');
    initialsSubmissionBoxE1.classList.remove('hide');
    gameOverContainerE1.classList.add('hide');
    currentTime = startingTimeSeconds;
    timerE1.classList.remove('hide');
    timer = setInterval(updateTimer, 1000);
    startGame();
    

}

//updates the game timer allowing it to count down
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
        console.log('gameover');
        clearInterval(timer);
        gameOver();
    }

}
//load highscore page
function loadHsPage() {
    window.location = 'highscores.html'
}

//returns to the home page
function returnHome() {
    location.reload()
}

//question base
const questions = [
    {
        question: 'Javascript is an _______ language?',
        answers: [
            {text: 'Object-Oriented', correct: true},
            {text: 'Object-Based', correct: false},
            {text: 'Procedural', correct: false},
            {text: 'None of the Above', correct: false}
        ]
    },
    {
        question: 'Which of the following keywords is used to define a variable in Javascript?',
        answers: [
            {text: 'var', correct: false},
            {text: 'let', correct: false},
            {text: 'Both A and B', correct: true},
            {text: 'None of the Above', correct: false}
        ]
    },
    {
        question: 'Which of the following methods can be used to display data in some form using Javascript?',
        answers: [
            {text: 'document.write()', correct: false},
            {text: 'console.log()', correct: false},
            {text: 'window.alert()', correct: false},
            {text: 'All of the Above', correct: true}
        ]
    },
    {
        question: 'When an operator’s value is NULL, the typeof returned by the unary operator is:',
        answers: [
            {text: 'Boolean', correct: false},
            {text: 'Undefined', correct: false},
            {text: 'Object', correct: true},
            {text: 'Integer', correct: false}
        ]
    },
    {
        question: 'What is the use of the <noscript> tag in Javascript?',
        answers: [
            {text: 'The contents are displayed by non-JS-based browsers', correct: true},
            {text: 'Clears all the cookies and cache', correct: false},
            {text: 'Both A and B', correct: false},
            {text: 'None', correct: false}
        ]
    }
]

