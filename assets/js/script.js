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

// score related stuff
var seeHighScore = document.getElementById("see-high-score");
var submitInitialsBtn = document.getElementById("submit-initials-btn");
var currentScore = document.getElementById("final-score");

// time-related
var timeLeft = document.getElementById("timer");
var infoMsg = document.getElementById("info-msg");
var timeZeroMsg = document.getElementById("time-zero-msg");
var timer = document.getElementById("timer");

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
  
  questionIndexPos = 0;
  seconds = 20;
 
  var timeStart = setInterval(function() {
    seconds--;
    timeLeft.innerHTML = "Time Left: " + seconds;
    if(seconds <= 0) {
      seconds = 0;
        // clearInterval(timeStart);
        if (questionIndexPos === questions.length) { 
            timer.classList.add("hide"); 
            clearInterval(timeStart);
            quizEnd();
        }
    }
},1000);
  showQuestions();
}

function showQuestions(){
    getQuestion();
}

function getQuestion(){

    currentQuestion.textContent = questions[questionIndexPos].question;
    // choice index position doesnt vary so index pos is set
    option1.textContent = questions[questionIndexPos].choices[0];
    option2.textContent = questions[questionIndexPos].choices[1];
    option3.textContent = questions[questionIndexPos].choices[2];
    option4.textContent = questions[questionIndexPos].choices[3];
  
}
currentScore = 0;
// let's check to see if they answered correctly and compare it to the 'answer' value in questions array

function answerValid(answer){
  
      // questionsIndexPos should be iterating by 1 each time this runs
      // does selected answer match the actual one from array
      if (questions[questionIndexPos].answer === questions[questionIndexPos].choices[answer]) {
        currentScore+=10;      
        console.log('correct!')
        console.log(currentScore)
      } else {
        seconds-=10;
        console.log('incorrect!')
      }
      questionIndexPos++;
      if(questionIndexPos < questions.length) {
        getQuestion();
      } else {
        quizEnd();
      }

}

function selected1() { // selected1 sycned to event listener
  answerValid(0); // does the answer user chose match one saved in array
}
function selected2() { // selected2 sycned to event listener
  answerValid(1); // does the answer user chose match one saved in array
} 
function selected3() { // selected3 sycned to event listener
  answerValid(2); // does the answer user chose match one saved in array
} 
function selected4() { // selected4 sycned to event listener
  answerValid(3); // does the answer user chose match one saved in array
} 

function quizEnd() {
  quizDiv.classList.add("hide");
  resultsDiv.classList.remove("hide");
  // timer.classList.add("hide");
  
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

// event listeners
function prepareEventHandlers() {
  startQuizBtn.addEventListener("click", startQuiz);
  // when user selects an answer, run selected_ to check selected answer to actual answer
  option1.addEventListener("click", selected1);
  option2.addEventListener("click", selected2);
  option3.addEventListener("click", selected3);
  option4.addEventListener("click", selected4);

  // score related stuff
  submitInitialsBtn.addEventListener("click", selected4);

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