var timerContainerEl = document.querySelector('#timer-container')
var quizContainerEl = document.querySelector('#quiz-container')
var startBtnEl = document.querySelector('#start-btn')
var highscoresEl = document.querySelector('#highscores')
var questions = [
    {
    question: 'What is the capital of Lebannon?',
    answers: ['Beirut', 'Baku', 'Dubai', 'Damascus'],
    correctAnswer: 'Beirut'
    },
    {
        question: 'What year did the French revolution begin?',
        answers: ['1776', '1765', '1803', '1789'],
        correctAnswer: '1789'
    },
    {
        question: 'Which of these South American countries is land locked?',
        answers: ['Argentina', 'Paraguay', 'Uruguay', 'Columbia'],
        correctAnswer: 'Paraguay'
    },
]
var timer = 60
var currentQuestionIndex = 0;
var timerInterval;

function showQuestion(question) {
    quizContainerEl.innerHTML = '';
    var questionEl = document.createElement('h1');
    questionEl.classList.add('text-primary', 'justify-center');
    questionEl.textContent = question.question;

    var answersEl = document.createElement('ul');
    
    question.answers.forEach(function (answer) {
        var answerItemEl = document.createElement('button');
        answerItemEl.classList.add('btn', 'btn-dark', 'btn-block')
        answerItemEl.textContent = answer;
        answerItemEl.addEventListener('click', function () {
            handleAnswerClick(answer, question.correctAnswer);
        });

        answersEl.appendChild(answerItemEl);
    });

    quizContainerEl.appendChild(answersEl);
    quizContainerEl.appendChild(questionEl);
}

function handleAnswerClick(selectedAnswer, correctAnswer) {
    if (selectedAnswer === correctAnswer) {
        console.log('Correct!');
    } else {
        console.log('Incorrect!');
        timer-=5
        updateTimerDisplay();
    }

    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < questions.length) {
        // Show the next question
        showQuestion(questions[currentQuestionIndex]);
    } else {
        // Quiz is complete
        clearInterval(timerInterval)
        gameOver()
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    timer = 60
    timerInterval = setInterval(function () {
        timer--;
        updateTimerDisplay();

        if (timer <= 0) {
            clearInterval(timerInterval); 
            console.log('Time is up!');
            gameOver()
        }
    }, 1000);
    showQuestion(questions[currentQuestionIndex]);
    updateTimerDisplay()
}

function updateTimerDisplay() {
    var timerEl = timerContainerEl.querySelector('p');
    if(!timerEl){
    timerEl = document.createElement('p')
    timerEl.classList.add('justify-flex-end', 'align-start')
    timerContainerEl.appendChild(timerEl)
    }
    timerEl.textContent = 'Seconds: '+timer
}

function gameOver() {
    quizContainerEl.innerHTML = '';
    var gameOverEl = document.createElement('h1');
    gameOverEl.classList.add('text-primary', 'justify-center');
    gameOverEl.textContent = 'Game Over!'
    var scoreEl = document.createElement('h3')
    scoreEl.classList.add('text-primary', 'justify-center')
    scoreEl.textContent = 'Your Score! '+ timer
    localStorage.setItem('score',timer)
    var playagainEl = document.createElement('button');
    playagainEl.classList.add('btn', 'btn-info', 'btn-block')
    playagainEl.textContent = 'Play Again';
    quizContainerEl.appendChild(gameOverEl);
    quizContainerEl.appendChild(scoreEl)
    quizContainerEl.appendChild(playagainEl)
    playagainEl.addEventListener('click',startQuiz)
}

function displayHighscores () {
    quizContainerEl.innerHTML = '';
    var titleEl = document.createElement('h1');
    titleEl.classList.add('text-primary', 'justify-center');
    titleEl.textContent = 'High Scores!'
    var scores = localStorage.getItem('score')
    var scoresArray = scores ? [scores] : [];
    var scoresContainerEl = document.createElement('ul');
    scoresArray.forEach(function(score){
        var scoreEl = document.createElement('h3')
        scoreEl.classList.add('text-primary', 'justify-center')
        scoreEl.textContent = 'Your Score! '+ score
        scoresContainerEl.appendChild(scoreEl)
    })
    var goBackEl = document.createElement('button')
    goBackEl.classList.add('btn', 'btn-danger', 'btn-block')
    goBackEl.textContent = 'Go Back!'
    quizContainerEl.appendChild(titleEl)
    quizContainerEl.appendChild(scoresContainerEl)
    quizContainerEl.appendChild(goBackEl)
    goBackEl.addEventListener('click', function () {
        location.reload()
    })
}
startBtnEl.addEventListener('click', startQuiz)
highscoresEl.addEventListener('click', displayHighscores)