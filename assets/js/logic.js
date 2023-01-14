// // Variables for the timer, score, and current question
// let time = 0;
// let score = 0;
// let currentQuestion = 0;

// // Get elements from the HTML
// const startQuiz = document.getElementById("start");
// const questionTitle = document.getElementById("question-title");
// const choices = document.getElementById("choices");
// const feedback = document.getElementById("feedback");
// const endScreen = document.getElementById("end-screen");
// const finalScore = document.getElementById("final-score");
// const initialsInput = document.getElementById("initials");
// const submitButton = document.getElementById("submit");

// // Add event listener for start button
// const startQuiz = document.getElementById("start");
// startQuiz.addEventListener("click", startQuiz);


// // Function to start the quiz
// function startQuiz() {
//   // Hide the start screen and display the questions
//   document.getElementById("start-screen").classList.add("hide");
//   document.getElementById("questions").classList.remove("hide");
//   // Start the timer
//   startTimer();
//   // Display the first question
//   displayQuestion();
// }

// // Function to start the timer
// function startTimer() {
//   // Update the time every second
//   setInterval(() => {
//     time++;
//     document.getElementById("time").innerHTML = time;
//     // End the quiz if the timer reaches 0
//     if (time === 0) {
//       endQuiz();
//     }
//   }, 1000);
// }

// // Function to display the current question
// function displayQuestion() {
//   // Get the current question from the questions array
//   const current = questions[currentQuestion];
//   // Update the question title
//   questionTitle.innerHTML = current.question;
//   // Clear the choices div
//   choices.innerHTML = "";
//   // Loop through the choices and create buttons for each one
//   for (let i = 0; i < current.choices.length; i++) {
//     const choice = document.createElement("button");
//     choice.innerHTML = current.choices[i];
//     // Add an event listener for when the choice is clicked
//     choice.addEventListener("click", (e) => {
//       // Check if the choice is correct
//       if (i === current.answer) {
//         // Display correct feedback
//         feedback.innerHTML = "Correct!";
//         feedback.classList.remove("hide");
//         // Wait 1 second before displaying the next question
//         setTimeout(() => {
//           feedback.classList.add("hide");
//           currentQuestion++;
//           // Check if there are more questions
//           if (currentQuestion < questions.length) {
//             displayQuestion();
//           } else {
//             // End the quiz if there are no more questions
//             endQuiz();
//           }
//         }, 1000);
//       } else {
//         // Display incorrect feedback and subtract time
//         feedback.innerHTML = "Incorrect. Ten seconds will be subtracted from your time.";
//         feedback.classList.remove("hide");
//         time -= 10;
//         // Wait 1 second before displaying the next question
//         setTimeout(() => {
//           feedback.classList.add("hide");
//           currentQuestion++;
//           // Check if there are more questions
//           if (currentQuestion < questions.length) {
//             display



var score = 0;
var currentQuestion = 0;
var counter;
var timer;

// Prepare all selector that we might need to point to the html element
var startButton = document.querySelector('#start');
var startScreenElement = document.querySelector('#start-screen');
var questionsContainer = document.querySelector('#questions-container');
var questionTitle = document.querySelector('#question-title');
var choicesContainer = document.querySelector('#choices-container');
var timerContainer = document.querySelector('#timer-container');
var endScreen = document.querySelector('#end-screen');
var finalScore = document.querySelector('#final-score');
var initialInput = document.querySelector('#initial-input');
var submitButton = document.querySelector('#submit-button');

function populateQuestion(question) {
var questionTitle = question.title;
var choices = question.choices;
choicesContainer.innerHTML = '';
questionTitle.textContent = questionTitle;
var choicesList = document.createElement('ul');
for (let i = 0; i < choices.length; i++) {
    var choice = document.createElement('li');
    choice.textContent = choices[i];
    choicesList.appendChild(choice);
}
choicesContainer.appendChild(choicesList)

}

function endGame() {
// When the game ends, it should display their score and give the user the ability to save their initials and their score
questionsContainer.setAttribute('class', 'hide');
endScreen.setAttribute('class', 'visible');
finalScore.textContent = "Your final score is: " + score;
clearInterval(timer);
}

function nextQuestion() {
currentQuestion++;
if (currentQuestion < questions.length) {
populateQuestion(questions[currentQuestion]);
} else {
endGame();
}
}

startButton.addEventListener('click', function() {
startScreenElement.setAttribute('class', 'hide');
questionsContainer.setAttribute('class', 'visible');

// show the first question
currentQuestion = 0;
populateQuestion(questions[currentQuestion]);

counter = 100;
timer = setInterval(function() {
    counter--;
    timerContainer.textContent = counter;
    if (counter <= 0) {
        endGame();
        clearInterval(timer);
    }
}, 1000);

});

choicesContainer.addEventListener('click', function(event) {
var choice = event.target;
if (choice.textContent === questions[currentQuestion].answer) {