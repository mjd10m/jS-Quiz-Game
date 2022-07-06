const startButtonE1 = document.getElementById('start-btn')
const startContainerE1 = document.getElementById('start-container')
const questionAnswerContainerE1 = document.getElementById('qa-container')
let shuffledQuestionsArray, currentQuestion
const questionE1 = document.getElementById('question')
const answerE1 = document.getElementById('answers')
const startingTimeSeconds = 90;
let currentTime = startingTimeSeconds
const timerE1 = document.getElementById('timer')

startButtonE1.addEventListener("click", startGame)



function startGame() {
    console.log("Started");
    startContainerE1.classList.add('hide');
    shuffledQuestionsArray = questions.sort(()=> Math.random() - .5)
    currentQuestion = 0
    questionAnswerContainerE1.classList.remove('hide')
    setInterval(updateTimer, 1000);
    setNextQuestion()

}

function setNextQuestion() {
    resetquestion();
    displayQuestion(shuffledQuestionsArray[currentQuestion]);
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
        setNextQuestion()
    } else {
        console.log('gameover')
    }

}

function isAnswerCorrect(selectedAnswerButton, correct) {
    //clearAnswerCorrect(element)
    const answerMessage = document.getElementById('answer-message');
    //answerE1.children.classList.remove('correct')
    //answerE1.childElementCount.classList.remove('incorrect')
    if (correct) {
        console.log('correct')
        answerMessage.innerText = "Correct"
        answerMessage.classList.remove('hide')
        selectedAnswerButton.classList.add('correct')
    } else {
        console.log('incorrect')
        answerMessage.innerText = 'Incorrect'
        answerMessage.classList.remove('hide')
        selectedAnswerButton.classList.add('incorrect')
    }
}


function resetquestion() {
    while (answerE1.firstChild) {
        answerE1.removeChild(answerE1.firstChild);
    }
}

function updateTimer() {
    const minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    timerE1.innerHTML = "Time Remaing:" + minutes + ": " + seconds;
    currentTime--;
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