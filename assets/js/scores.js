// Get elements from the HTML
const highscoresList = document.getElementById("highscores");
const clearButton = document.getElementById("clear");

// Get the stored scores from local storage
const scores = JSON.parse(localStorage.getItem("scores")) || [];

// Function to display the scores
function displayScores() {
  // Clear the list
  highscoresList.innerHTML = "";
  // Sort the scores by score in descending order
  scores.sort((a, b) => b.score - a.score);
  // Loop through the scores and create a list item for each one
  for (let i = 0; i < scores.length; i++) {
    const score = scores[i];
    const li = document.createElement("li");
    li.innerHTML = `${score.initials} - ${score.score}`;
    highscoresList.appendChild(li);
  }
}

// Function to clear the scores
function clearScores() {
  scores.length = 0;
  localStorage.removeItem("scores");
  displayScores();
}

// Add event listener for the clear button
clearButton.addEventListener("click", clearScores);

// Display the scores when the page loads
displayScores();
