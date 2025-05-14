import { move, preced } from './bonus/bonus.js'
import { questions } from './data/data.js'
 
const formQuiz = document.getElementById("form-quiz")
const buttonStart = document.getElementById("button-start")
const myProgress = document.getElementById("myProgress");

let score = 0;
let questionIndex = 0;

if (localStorage.getItem("questionIndex") !== null) {
    console.log(localStorage.getItem("questionIndex"));
    questionIndex = parseInt(localStorage.getItem("questionIndex"))
    // move(0, 100 * (questionIndex - 1) / questions.length, 100 * (questionIndex) / questions.length);
}

if (localStorage.getItem("score") !== null) score = parseInt(localStorage.getItem("score"))

function showQuestion(questionIndex) {
    let html = "<legend>" + questions[questionIndex].question + "</legend>";

    Object.entries(questions[questionIndex].answers).forEach(([index, answer]) => {
        html += "<div>";
        html += "<input type='radio' id='answer" + index + "' name='answer' value='" + index + "'>";
        html += "<label for='answer" + index + "'>" + answer + "</label>";
        html += "</div>";
    });

    if(questionIndex != 0) html += "<button type='submit' id='preced'>Revenir</button>";

    const buttonText = (questionIndex === questions.length - 1) ? "Valider" : "Suivant";
    html += "<button type='submit' id='button-submit'>" + buttonText + "</button>";

    formQuiz.innerHTML = html;
    formQuiz.getElementsByTagName("input")[0].checked = true;

    // const buttonPreced = document.getElementById("preced");
    // buttonPreced.addEventListener("click", preced())
}

buttonStart.addEventListener("click", (e) => {
    e.target.style.display = "none";
    myProgress.style.display = "block";
    showQuestion(questionIndex);
    
});

formQuiz.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload
    const formData = new FormData(formQuiz);
    const data = Object.fromEntries(formData.entries());

    if (data.answer === questions[questionIndex].correct) {
        score += 1;
    }

    questionIndex += 1;

    if (questionIndex < questions.length) {
        showQuestion(questionIndex);
        move(0, 100 * (questionIndex - 1) / questions.length, 100 * (questionIndex) / questions.length);
    } else {
        formQuiz.innerHTML = "<legend>Votre score est de " + score + "/" + questions.length + "</legend>";
        move(0, 100 * (questionIndex - 1) / questions.length, 100);
        questionIndex = 0;
        score = 0;
        localStorage.removeItem("questionIndex");
        localStorage.removeItem("score");
        console.log("cocuo");

        buttonStart.style.display = "block";
        buttonStart.innerHTML = "Recommencer le quiz";
    }

    localStorage.setItem("questionIndex", questionIndex);
    localStorage.setItem("score", score);
});



