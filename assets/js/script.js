var questions = [{
    prompt: "Which is not a data type?",
    choices: ["Alert", "Undefined", "Boolean", "Symbol"],
    answer: "Alert"
},
{
    prompt: "How do we define 'or'?",
    choices: ["&&", "||", "!=", "=="],
    answer: "||"
},
{
    prompt: "Which variable delcaration is block scoped?",
    choices: ["const", "var", "let", "else"],
    answer: "let"
},
{
    prompt: "Which conditional statement executes multiple blocks of code?",
    choices: ["if", "else", "else if", "switch"],
    answer: "switch"
},
{
    prompt: "Which is not a type of form input?",
    choices: ["carousel", "radio", "checkbox", "dropdown"],
    answer: "carousel"
}
]

var score = 0;
var question = -1;
var timeLeft = 0;
var timer;

function start() {

timeLeft = 50;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    
    if (timeLeft <= 0) {
        clearInterval(timer);
        end(); 
    }
}, 1000);

nextQuestion();
}
 
function end() {
clearInterval(timer);

var quizContent = `
<h3>GAME OVER</h3>
<h3>You scored ` + score +  `/100</h3>
<input type="text" id="name" placeholder="Your name"> 
<button onclick="setScore()">Submit</button>`;

document.getElementById("quizDiv").innerHTML = quizContent;
}

function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
var quizContent = `
<h3>` + localStorage.getItem("highscoreName") + `'s highscore is:</h3>
<h3>` + localStorage.getItem("highscore") + `</h3><br> 

<button onclick="clearScore()">Reset Scores</button><button onclick="reset()">Play Again</button>

`;

document.getElementById("quizDiv").innerHTML = quizContent;
}

function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

reset();
}

function reset() {
clearInterval(timer);
score = 0;
question = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h2 class="pb-5">
Timed Multiple Choice Quiz
</h2>
<button onclick="start()">Start</button>`;

document.getElementById("quizDiv").innerHTML = quizContent;
}

function incorrect() {
timeLeft -= 10; 
nextQuestion();
}

function correct() {
score += 20;
nextQuestion();
}
 
function nextQuestion() {
question++;

if (question > questions.length - 1) {
    end();
    return;
}

var quizContent = "<h3>" + questions[question].prompt + "</h3>"

for (var buttonLoop = 0; buttonLoop < questions[question].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[question].choices[buttonLoop]);
    if (questions[question].choices[buttonLoop] == questions[question].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizDiv").innerHTML = quizContent;
}