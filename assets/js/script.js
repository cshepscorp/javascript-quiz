window.onload = function() {
  prepareEventHandlers();
}

// gameplay/ quiz stuff
var startQuizBtn = document.querySelector("#start-quiz-btn");
var currentQuestion = document.querySelector("#current-question");
// buttons serving as quiz answer options
var option1 = document.querySelector("#btn-0");
var option2 = document.querySelector("#btn-1");
var option3 = document.querySelector("#btn-2");
var option4 = document.querySelector("#btn-3");

var validationMsg = document.querySelector("#validation-msg");

var optionDiv = document.querySelector("#options");
// score related stuff
var seeHighScore = document.querySelector("#see-high-score");
var submitInitialsBtn = document.querySelector("#submit-initials-btn");
var currentScore = document.querySelector("#final-score");
var initialInput = document.querySelector("#enter-initials");
var clearHighScores = document.querySelector("#clear-high-scores-btn");
var highScoreList = document.querySelector("#list-of-high-scores");
var listOfHighScores = document.querySelector("#high-score-list");
var paddingHighScores = document.querySelector("#padding-high-scores");

// time-related
var timeLeft = document.querySelector("#timer");
var infoMsg = document.querySelector("#info-msg");
var timeZeroMsg = document.querySelector("#time-zero-msg");
var timer = document.querySelector("#timer");

// sections
var introDiv = document.querySelector("#intro");
var quizDiv = document.querySelector("#quiz-section");
var resultsDiv = document.querySelector("#results-section");
var highScoreDiv = document.querySelector("#highscore-section");

var seconds = 45;
function startQuiz() {
  infoMsg.classList.add("hide");
  timeZeroMsg.classList.remove("hide");
  introDiv.classList.add("hide");
  quizDiv.classList.remove("hide");
  // seeHighScore.classList.add("hide");
  seeHighScore.innerHTML = '<a href="./index.html" >Exit Game</a>';

  var timeStart = setInterval(function() {
    seconds--;
    timeLeft.innerHTML = "Time Left: " + seconds;
    if(seconds <= 0 || questionIndexPos > 4) {
      quizEnd();
      clearInterval(timeStart);
    }
    },1000);
    
    showQuestions();
}

questionIndexPos = 0;
function showQuestions(){
  
  var question = questions[questionIndexPos]['question'];
  $("#current-question").text(question);

  var opt1 = questions[questionIndexPos]['choices'][0];
  $("#btn-0").text(opt1);

  var opt2 = questions[questionIndexPos]['choices'][1];
  $("#btn-1").text(opt2);

  var opt3 = questions[questionIndexPos]['choices'][2];
  $("#btn-2").text(opt3);

  var opt4 = questions[questionIndexPos]['choices'][3];
  $("#btn-3").text(opt4);

  console.log("current index pos: " + questionIndexPos);
}

currentScore = 0;
function newAnswerValid(answer){
  
  // questionsIndexPos should be iterating by 1 each time this runs
  // does selected answer match the actual one from array
  if (questions[questionIndexPos].answer === questions[questionIndexPos].choices[answer]) {
    currentScore+=10;      
    $("#validation-msg")
      .text("Correct!")
      .addClass("div-line");
    
    console.log('correct!')
    console.log(currentScore)
  } else {
    seconds-=10;
    console.log('incorrect!')
    $("#validation-msg").text("Wrong!");
  }
  questionIndexPos++;
  if(questionIndexPos < questions.length) {
    showQuestions();
  } else {
    quizEnd();
  }
}

function selected1() { // selected1 sycned to event listener
  newAnswerValid(0); // does the answer user chose match one saved in array
}
function selected2() { 
  newAnswerValid(1); 
} 
function selected3() { 
  newAnswerValid(2); 
} 
function selected4() { 
  newAnswerValid(3); 
} 

function quizEnd() {
  quizDiv.classList.add("hide");
  resultsDiv.classList.remove("hide");
  
    document.getElementById("final-score").innerHTML = "Your final score is " + currentScore;
    if (currentScore === 50){
      document.getElementById("score-based-msg").innerHTML = "You're a JavaScript master!";
    }
    if (currentScore === 40){
      document.getElementById("score-based-msg").innerHTML = "Great job! You're pretty knowledgable about JavaScript.";
    } 
    if (currentScore === 30){
      document.getElementById("score-based-msg").innerHTML = "Decent job, but there's room for improvement.";
    } 
    if (currentScore <= 20){
      document.getElementById("score-based-msg").innerHTML = "You can do better. Google is your friend!";
    } 
    
}

function setHighScores(event) {
  event.preventDefault();

  var highScoresSaved = localStorage.getItem("high scores");
  var savedScores;

  // if there are no saved scores, create array to save them
  if(highScoresSaved === null) {
    savedScores = [];
  } else {
    // use JSON.parse to allow array to save stringified values 
    savedScores = JSON.parse(highScoresSaved);
  }
  var saveUserScore = {
    initials: initialInput.value,
    score: currentScore
  };
  console.log(saveUserScore);
  savedScores.push(saveUserScore);

  // use JSON.stringify to allow local storage to save values 
  var savedScoresString = JSON.stringify(savedScores);
  window.localStorage.setItem("high scores", savedScoresString)
  console.log(savedScoresString);

  displayHighScore();
}

function displayHighScore() {
  timeLeft.classList.add("hide");
  highScoreDiv.classList.remove("hide");
  introDiv.classList.add("hide");
  seeHighScore.classList.add("hide");
  resultsDiv.classList.add("hide");
  // get saved scores from LS
  var highScoresSaved = localStorage.getItem("high scores");
  console.log(typeof highScoresSaved); // string

  // are there any scores saved in LS?
  if (highScoresSaved === null) {
    return;
  }
    
    var highScoreListItems = JSON.parse(highScoresSaved);
    console.log("after parsing")
    console.log(typeof highScoreListItems); // object

    // sort high scores
    var sortedHighScores = highScoreListItems;
    sortedHighScores.sort(function(a, b){return b.score - a.score});

    console.log(sortedHighScores);

    for (var i = 0; i < 5; i++) {
      var eachNewHighScore = $('<li>');
      eachNewHighScore.text(sortedHighScores[i]['initials'] + ": " + sortedHighScores[i]['score']);
      
      $("#list-of-high-scores")
        .append(eachNewHighScore);
    }
    
}

function resetHighScores() {
  window.localStorage.clear();
  highScoreList.classList.add("hide");
  paddingHighScores.classList.remove("hide");
}

// event listeners
function prepareEventHandlers() {
  startQuizBtn.addEventListener("click", startQuiz);
  // when user selects an answer, run selected_ to check selected answer to actual answer
  option1.addEventListener("click", selected1);
  option2.addEventListener("click", selected2);
  option3.addEventListener("click", selected3);
  option4.addEventListener("click", selected4);

  // score related stuff
  submitInitialsBtn.addEventListener("click", setHighScores);
  clearHighScores.addEventListener("click", resetHighScores);
  seeHighScore.addEventListener("click", displayHighScore);

}
//Questions to be asked
var questions = [
  {
  question: "Commonly used data types DO NOT include:",
  choices: ["1. alerts", "2. strings", "3. booleans", "4. numbers"],
  answer: "1. alerts"
}, {
  question: "The condition of an if/else statement is enclosed within _____:",
  choices: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
  answer: "3. parentheses" 
}, {
  question: "Arrays in Javascript can be used to store _______.",
  choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
  answer: "4. all of the above"
}, {
  question: "String values must be enclosed within _____ when being assigned to variables:",
  choices: ["1. quotations", "2. curly brackets", "3. commas", "4. square brackets"],
  answer: "1. quotations" 
}, {
  question: "A very useful tool used during development and debugging for printing content to the debugger is:",
  choices: ["1. localstorage.print()", "2. document.print()", "3. console.log()", "4. window.print()"],
  answer: "3. console.log()"
}]