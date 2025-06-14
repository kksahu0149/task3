 // Quiz Data
 const quizData = [
    {
        question: "What is the capital of France?",
        options: [
            { text: "London", correct: false },
            { text: "Paris", correct: true },
            { text: "Berlin", correct: false },
            { text: "Rome", correct: false },
        ],
    },
    {
        question: "What is the highest mountain in the world?",
        options: [
            { text: "K2", correct: false },
            { text: "Kangchenjunga", correct: false },
            { text: "Mount Everest", correct: true },
            { text: "Lhotse", correct: false },
        ],
    },
    {
        question: "What is the chemical symbol for gold?",
        options: [
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
            { text: "Fe", correct: false },
            { text: "Cu", correct: false },
        ],
    },
     {
        question: "Which planet is known as the 'Red Planet'?",
        options: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "What is the largest ocean on Earth?",
        options: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ],
    },
];

// Quiz Elements
const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit-quiz");
const resultsContainer = document.getElementById("results-container");
const finalScoreDisplay = document.getElementById("final-score");
const resultsDisplay = document.getElementById("results");
const restartQuizButton = document.getElementById("restart-quiz");

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

// Function to display a question
function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    const questionElement = document.createElement("div");
    questionElement.className = "question";
    questionElement.textContent = currentQuestion.question;

    const optionsElement = document.createElement("div");
    optionsElement.className = "options";

    currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = `question-${currentQuestionIndex}`;
        radioInput.value = index;
        optionElement.appendChild(radioInput);
        optionElement.appendChild(document.createTextNode(option.text));
        optionsElement.appendChild(optionElement);
    });

    quizContainer.innerHTML = "";
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);

     // Disable the submit button if no answer is selected
    submitButton.disabled = true;
    const radioButtons = document.querySelectorAll(`input[name="question-${currentQuestionIndex}"]`);
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            submitButton.disabled = false; // Enable submit button when an option is selected
        });
    });
}

// Function to get the selected answer
function getSelectedAnswer() {
    const radioButtons = document.querySelectorAll(`input[name="question-${currentQuestionIndex}"]`);
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return parseInt(radioButtons[i].value);
        }
    }
    return null;
}

// Function to display the results
function displayResults() {
    const totalQuestions = quizData.length;
    resultsDisplay.innerHTML = "";

    quizData.forEach((question, index) => {
        const userAnswerIndex = userAnswers[index];
        const isCorrect = userAnswerIndex !== null && question.options[userAnswerIndex].correct;

        const resultElement = document.createElement("p");
        resultElement.textContent = `Question ${index + 1}: ${
            isCorrect ? "Correct" : "Incorrect"
        }`;
        resultElement.style.fontWeight = "bold";
        if (isCorrect) {
            resultElement.classList.add("correct-answer");
        } else {
            resultElement.classList.add("wrong-answer");
        }
        resultsDisplay.appendChild(resultElement);
    });

    finalScoreDisplay.textContent = `${score} / ${totalQuestions}`;
    quizContainer.style.display = "none";
    resultsContainer.style.display = "block";
}

// Event listener for the submit button
submitButton.addEventListener("click", () => {
    const selectedAnswer = getSelectedAnswer();
    if (selectedAnswer !== null) {
        userAnswers[currentQuestionIndex] = selectedAnswer;
        if (quizData[currentQuestionIndex].options[selectedAnswer].correct) {
            score++;
        }
        currentQuestionIndex++;

        if (currentQuestionIndex < quizData.length) {
            displayQuestion();
        } else {
            displayResults();
        }
    }
});

// Event listener for the restart quiz button
restartQuizButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    resultsContainer.style.display = "none";
    quizContainer.style.display = "block";
    displayQuestion();
});

// Initial display of the first question
displayQuestion();

// Image Carousel
const carouselImages = document.querySelector(".carousel-images");
const carouselControls = document.querySelector(".carousel-controls");
const prevButton = document.querySelector(".prev-btn");
const nextButton = document.querySelector(".next-btn");
const carouselIndicatorsContainer = document.querySelector(".carousel-indicators");
const images = document.querySelectorAll(".carousel-images img");
const numImages = images.length;
let currentImageIndex = 0;
let intervalId;

// Create carousel indicators
for (let i = 0; i < numImages; i++) {
    const indicator = document.createElement("div");
    indicator.className = "indicator";
    indicator.addEventListener("click", () => {
        currentImageIndex = i;
        updateCarousel();
        resetInterval();
    });
    carouselIndicatorsContainer.appendChild(indicator);
}

const indicators = document.querySelectorAll(".indicator");

// Function to update the carousel display
function updateCarousel() {
    carouselImages.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentImageIndex);
    });
}

// Function to go to the next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % numImages;
    updateCarousel();
}

// Function to go to the previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + numImages) % numImages;
    updateCarousel();
}

// Function to start auto-rotation
function startInterval() {
    intervalId = setInterval(nextImage, 3000); // Change image every 3 seconds
}

// Function to reset auto-rotation interval
function resetInterval() {
    clearInterval(intervalId);
    startInterval();
}

// Event listeners for the control buttons
nextButton.addEventListener("click", () => {
    nextImage();
    resetInterval();
});
prevButton.addEventListener("click", () => {
    prevImage();
    resetInterval();
});

// Start auto-rotation
startInterval();
updateCarousel(); //show the first image and set the first indicator to active.

// Fetch and display data from a public API
const apiDataContainer = document.getElementById("api-data");
const errorMessageDisplay = document.getElementById("error-message");

// Use a free API. I'll use the Joke API for this example: https://v2.jokeapi.dev/
const apiUrl = "https://v2.jokeapi.dev/joke/Any?safe-mode";

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Display the data, handling different joke types
        if (data.type === "single") {
            apiDataContainer.innerHTML = `<p>${data.joke}</p>`;
        } else if (data.type === "twopart") {
            apiDataContainer.innerHTML = `
                <p>Setup: ${data.setup}</p>
                <p>Delivery: ${data.delivery}</p>
            `;
        } else {
            apiDataContainer.innerHTML = `<p>Error: Unexpected joke format.</p>`;
        }
    })
    .catch(error => {
        errorMessageDisplay.textContent = `Error fetching data: ${error}`;
        apiDataContainer.innerHTML = ""; // Clear any previous content
    });