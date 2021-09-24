window.onload = function() {
  prepareEventHandlers();
}

// gameplay/ quiz stuff
var startQuizBtn = document.getElementById("start-quiz-btn");
var currentQuestion = document.getElementById("current-question");
// buttons serving as quiz answer options
var option1 = document.getElementById("btn-0");
var option2 = document.getElementById("btn-1");
var option3 = document.getElementById("btn-2");
var option4 = document.getElementById("btn-3");

var validationMsg = document.getElementById("validation-msg");

var optionDiv = document.getElementById("options");
// score related stuff
var seeHighScore = document.getElementById("see-high-score");
var submitInitialsBtn = document.getElementById("submit-initials-btn");
var currentScore = document.getElementById("final-score");
var initialInput = document.getElementById("enter-initials");
var clearHighScores = document.getElementById("clear-high-scores-btn");

var listOfHighScores = document.getElementById("high-score-list");

// time-related
var timeLeft = document.getElementById("timer");
var infoMsg = document.getElementById("info-msg");
var timeZeroMsg = document.getElementById("time-zero-msg");
var timer = document.getElementById("timer");

// sections
var introDiv = document.getElementById("intro");
var quizDiv = document.getElementById("quiz-section");
var resultsDiv = document.getElementById("results-section");
var highScoreDiv = document.getElementById("highscore-section");

var seconds = 18;
function startQuiz() {
  infoMsg.classList.add("hide");
  timeZeroMsg.classList.remove("hide");
  introDiv.classList.add("hide");
  quizDiv.classList.remove("hide");

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
    getQuestion();
}

function getQuestion(){
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
    $("#validation-msg").text("Correct!");
    
    console.log('correct!')
    console.log(currentScore)
  } else {
    seconds-=10;
    console.log('incorrect!')
    $("#validation-msg").text("Wrong!");
  }
  questionIndexPos++;
  if(questionIndexPos < questions.length) {
    getQuestion();
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
  // timeLeft.classList.add("hide");
  
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
  
  // if(submitInitialsBtn.value === "") {
  //   alert("You need to enter your initials in order to save");
  //   return;
  // }
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
  console.log(highScoresSaved + " did this work");
    
  // Iterates over the 'list'
  // 
    // Creates a new variable 'toDoItem' that will hold a "<p>" tag
    // Sets the `list` item's value as text of this <p> element
    // var highScoreItem = $('<p>');
    // highScoreItem.text(highScoresSaved[i]);
    var highScoreListItems = JSON.parse(highScoresSaved);
    console.log("after parsing")
    console.log(typeof highScoreListItems); // object

    var sortedHighScores = highScoreListItems;
    sortedHighScores.sort(function(a, b){return b.score - a.score});
    sortedHighScores.splice(5,sortedHighScores.length);
    console.log("after attempted sorting")
    console.log(typeof sortedHighScores);
    console.log(sortedHighScores);
    for (var i = 0; i < sortedHighScores.length; i++) {
      var eachNewHighScore = sortedHighScores[i]['initials'] + ": " + sortedHighScores[i]['score'] + "<br>";
      $("#list-of-high-scores")
        .append(eachNewHighScore);
    }
    
}

function resetHighScores() {
  // $('#list-of-high-scores').val('');
  window.localStorage.clear();
  
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