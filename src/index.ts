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
    body.removeChild(body.children[1])

    /* create score bar */
    let scoreBar = document.createElement('div');
    scoreBar.className = 'center bar';
    scoreBar.textContent = 'Number of answered questions:';

    let circleList = document.createElement('ul');
    for (let i = 1; i < 7; i++) {
        let circle = document.createElement('li');
        circleList.id = 'Question' + i;
        circleList.appendChild(circle);
        scoreBar.appendChild(circleList);
    }
    let header = document.getElementsByClassName('header')[0];
    header.appendChild(scoreBar);

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