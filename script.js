const questions = [
    {
        question: "What does CSS stand for?",
        choices: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which built-in  method sorts elements of an array alphabetically?",
        choices: ["order()", "sort()", "sortArray()"],
        answer: "sort()"
    },
    {
        question: "Which operator is udes to assign a value to a variable?",
        choices: ["=", "-", "*"],
        answer: "="
    },
    {
        question: "What oes HTML stand for?",
        choices: ["HighText Machine Language", "HyperText Markup Language", "HyperText Links Markup Language"],
        answer: "HyperText Markup Language"
    }
];

const startContainer = document.getElementById('start-container');
const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackElement = document.getElementById('feedback');
const scoreContainer = document.getElementById('score-container');
const scoreForm = document.getElementById('score-form');
const initialsInput = document.getElementById('initials');
const submitButton = document.getElementById('submit-btn');
const timerElement = document.getElementById('time-left');

let currentQuestionIndex;
let timeLeft;
let timerInterval;
let score = 0;

startButton.addEventListener('click', startQuiz);
scoreForm.addEventListener('submit', saveScore);

function startQuiz() {
    startContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    setTimer(timeLeft);
    timerInterval = setInterval(function() {
        timeleft--;
        setTimer(timeLeft);
        if (timeLeft ===0 || currentQuestionIndex === questions.length) {
            endQuiz();
        }
    }, 1000);
    showQuestion();
}

function setTimer(time) {
    timerElement.textContent = `Time: ${time}`;
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    choicesElement.innerHTML = '';
    question.choices.forEach(function(choice) {
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener('click', function() {
            checkAnswer(choice, question.answer);
        });
        choicesElement.appendChild(button);
    })
}

function checkAnswer(choice, answer) {
    if (choice === answer) {
        score ++;
        showFeedback('Correct', 'green');
    } else {
        timeLeft -= 10;
        showFeedback('Wrong', 'red');
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function showFeedback(message, color) {
    feedbackElement.textContent = message;
    feedbackElement.style.color = color;
    feedbackContainer.classList.remove('hidden');
    setTimeout(function() {
      feedbackContainer.classList.add('hidden');
    }, 1000);
}

function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
}

function saveScore(event) {
    event.preventDefault();
    const initials = initialsInput.ariaValueMax.toUpperCase();
    const scoreEntry = {
        initials: initials,
        score: score
    };

    console.log(scoreEntry);
}
