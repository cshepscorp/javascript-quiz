// gameplay
var startQuizBtn = document.getElementById("start-quiz-btn");

// score related stuff
var seeHighScore = document.getElementById("see-high-score");

// time-related
var timeLeft = document.getElementById("time-left");
var infoMsg = document.getElementById("info-msg");
var timeZeroMsg = document.getElementById("time-zero-msg");

// sections
var introDiv = document.getElementById("intro");
var quizDiv = document.getElementById("quiz-section");
var resultsDiv = document.getElementById("results-section");

var seconds = 21;
function startQuiz() {
  infoMsg.classList.add("hide");
  timeZeroMsg.classList.remove("hide");
  introDiv.classList.add("hide");
  quizDiv.classList.remove("hide");
  
  questionsLeft = 0;
  seconds = 20;
  // timeLeft.innerHTML = seconds;

  var timer = setInterval(function(){ 
    if (seconds > 0)
    seconds--;
         document.getElementById("timer").innerHTML = "Time remaining: " + seconds;
    if (seconds <= 0){
    // if (seconds <= 0 || questionsLeft == 0)
    //  return window.location.assign("highscore.html");
      clearInterval(timer);
      resultsDiv.classList.remove("hide");
      quizDiv.classList.add("hide");  
     }
  }, 1000);  
}
function timesUp() {
  quizDiv.classList.remove("hide");
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
  answer: "2. document.print()"
}]


// event listeners
startQuizBtn.addEventListener("click", startQuiz);