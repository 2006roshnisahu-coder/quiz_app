
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "High Text Machine Language"
        ],
        correct: 0
    },

    {
        question: "Which CSS property changes text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "background-color"
        ],
        correct: 2
    },

    {
        question: "Which keyword declares a variable in JavaScript?",
        options: [
            "variable",
            "var",
            "v",
            "int"
        ],
        correct: 1
    },

    {
        question: "Which tag is used to create a hyperlink?",
        options: [
            "<p>",
            "<img>",
            "<h1>",
            "<a>"
        ],
        correct: 3
    },

    {
        question: "Which language is used for database queries?",
        options: [
            "HTML",
            "CSS",
            "SQL",
            "Python"
        ],
        correct: 2
    }
];

// Get HTML elements

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");

const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");

const scoreElement = document.getElementById("score");
const percentageElement = document.getElementById("percentage");
const messageElement = document.getElementById("message");

const progress = document.getElementById("progress");
const questionNumber = document.getElementById("question-number");
const progressText = document.getElementById("progress-text");
const feedback = document.getElementById("feedback");

const restartButton = document.getElementById("restart-btn");

// Variables

let currentQuestion = 0;
let score = 0;
let answered = false;

// Display question

function showQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    const percent = (currentQuestion / questions.length) * 100;

    progress.style.width = percent + "%";
    progressText.textContent = Math.round(percent) + "% Completed";

    optionsElement.innerHTML = "";
    feedback.textContent = "";

    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
        ? "See Result →"
        : "Next Question →";

    // Create options

    q.options.forEach((option, index) => {

        const div = document.createElement("div");

        div.textContent = option;

        div.classList.add("option");

        div.onclick = () => selectOption(index);

        optionsElement.appendChild(div);

    });
}

// Select answer

function selectOption(index) {

    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].correct;

    const options = document.querySelectorAll(".option");

    options.forEach((option, i) => {

        option.classList.add("disabled");

        if (i === correctAnswer) {
            option.classList.add("correct");
        }

    });

    if (index === correctAnswer) {

        score++;

        feedback.textContent = "✓ Correct Answer! Well done!";

        feedback.style.color = "#059669";

    } else {

        options[index].classList.add("wrong");

        feedback.textContent = "✗ Incorrect! Check the green answer.";

        feedback.style.color = "#dc2626";

    }

    nextButton.disabled = false;

}

// Next question

nextButton.addEventListener("click", () => {

    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});

// Show result

function showResult() {

    quizBox.style.display = "none";

    resultBox.style.display = "block";

    const percent = Math.round((score / questions.length) * 100);

    scoreElement.textContent =
        `${score} / ${questions.length}`;

    percentageElement.textContent =
        `${percent}% Score`;

    if (percent === 100) {

        messageElement.textContent = "Excellent! You got all answers correct! 🎉";

    } else if (percent >= 60) {

        messageElement.textContent = "Great job! Keep learning and improving!";

    } else {

        messageElement.textContent = "Good try! Practice more and try again!";

    }

    progress.style.width = "100%";

}

// Restart quiz

restartButton.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    resultBox.style.display = "none";

    quizBox.style.display = "block";

    showQuestion();

});

// Start quiz

showQuestion();
