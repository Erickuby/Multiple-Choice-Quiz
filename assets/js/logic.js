let score = 0;
let timer = 30; //set initial time
let timerId;
let currentQuestion = 0;

//start quiz when button is clicked
document.getElementById("start").addEventListener("click", startQuiz);

function startQuiz(){
    //hide start screen
    document.getElementById("start-screen").classList.add("hide");
    //show questions
    document.getElementById("questions").classList.remove("hide");
    //start timer
    timerId = setInterval(function(){
        timer--;
        document.getElementById("time").innerHTML = timer;
        if(timer === 0 || currentQuestion === questions.length){
            endQuiz();
        }
    }, 1000);
    //display first question
    displayQuestion();
}

function displayQuestion(){
    let question = questions[currentQuestion].question;
    let choices = questions[currentQuestion].choices;

    document.getElementById("question-title").innerHTML = question;

    let choicesHtml = "";
    for(let i = 0; i < choices.length; i++){
        choicesHtml += "<button onclick='checkAnswer(" + i + ")'>" + choices[i] + "</button>";
    }
    document.getElementById("choices").innerHTML = choicesHtml;
}

function checkAnswer(answer){
    //check if answer is correct
    if(answer === questions[currentQuestion].answer){
        score++;
        document.getElementById("feedback").innerHTML = "Correct!";
    } else {
        timer -= 10; // subtract 10 seconds from the clock
        document.getElementById("feedback").innerHTML = "Wrong!";
    }
    document.getElementById("feedback").classList.remove("hide");
    setTimeout(() => {
        document.getElementById("feedback").classList.add("hide");
    }, 1000);
    //go to next question
    currentQuestion++;
    if(currentQuestion === questions.length){
        endQuiz();
    } else {
        displayQuestion();
    }
}



function endQuiz(){
    clearInterval(timerId);
    //display final score
    document.getElementById("final-score").innerHTML = score;
    //show end screen
    document.getElementById("end-screen").classList.remove("hide");

    //add event listener for submit button
    document.getElementById("submit").addEventListener("click", saveScore);
    
    // retrieve high scores from local storage
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    let highscoresList = "";
    for (let i = 0; i < highscores.length; i++) {
        highscoresList += "<li>" + highscores[i].initials + " - " + highscores[i].score + "</li>";
    }
    document.getElementById("highscores").innerHTML = highscoresList;
}



function saveScore(){
    //get initials and score
    let initials = document.getElementById("initials").value;
    let highscore = {
        initials: initials,
        score: score
    };

    //get existing highscores
    let highscores = JSON.parse(localStorage.getItem("highscores")) || [];

    //add new highscore
    highscores.push(highscore);

    //sort highscores by score
    highscores.sort((a, b) => b.score - a.score);

    //save highscores to local storage
    localStorage.setItem("highscores", JSON.stringify(highscores));

    //redirect to highscores page
    window.location.href = "highscores.html";
}
