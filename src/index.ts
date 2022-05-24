import { multipleChoiceQuestions } from "./Questions/multipleChoiceQuestions.js";
import { singleChoiceQuestions } from "./Questions/singleChoiceQuestions.js";
import { textInputQuestions } from "./Questions/textInputQuestions.js";

let b = multipleChoiceQuestions;
let c = singleChoiceQuestions;
let d = textInputQuestions;

const button = document.querySelector("#start")
button.addEventListener("click", buildQuizPage);

function buildQuizPage() {
    let body = document.body;
    body.removeChild(body.children[1]);

    /* create score bar */
    let scoreBar = document.createElement('div');
    scoreBar.className = 'center bar header';
    scoreBar.textContent = 'Number of answered questions:';
    scoreBar.appendChild(document.createElement('br'));

    for (let i = 1; i < 7; i++) {
        let circle = document.createElement('span');
        circle.className = 'circle';
        circle.id = 'Question'+i;
        scoreBar.appendChild(circle);
    }
    body.appendChild(scoreBar);
    body.appendChild(document.createElement('br'));

    /* create container for question, answer options & submit button  */
    let questionContainer = document.createElement('div');
    questionContainer.className = 'center container';

    let submitButton = document.createElement('button');
    submitButton.className = 'btn submit';
    submitButton.setAttribute('type', 'button');
    submitButton.textContent = 'SUBMIT';
    questionContainer.appendChild(submitButton);
    body.appendChild(questionContainer);
};