import { Question } from "../questions/types";
import { QuizMaster } from "./QuizMaster";
import { fill_template, fill_result } from "./fill_template";
import { collectSelectedAnswers, markTheAnswers } from "./collectSelectedAnswers";

window.onload = function () {
    buildQuizPage();
};


/**
 * Build the Quiz Page 
 */
function buildQuizPage(): void {
    const quizMaster = new QuizMaster();
    const quiz = quizMaster.newQuiz();
    const questionCards: Question[] = quiz.questions;

    let body: HTMLElement = document.body;

    /* create score bar */
    let scoreBar: HTMLElement = document.createElement('div');
    scoreBar.className = 'center bar';
    scoreBar.textContent = 'Number of answered questions:';
    scoreBar.appendChild(document.createElement('br'));

    for (let i = 1; i < quiz.maxRound+1; i++) {
        let circle: HTMLElement = document.createElement('span');
        circle.className = 'circle';
        circle.id = 'Question' + i;
        scoreBar.appendChild(circle);
    }
    let header: HTMLElement = document.getElementsByTagName('header')[0];
    header.appendChild(scoreBar);

    fill_template(questionCards[quiz.round])

    addSubmitButton(quizMaster, quiz);
    
};

function addSubmitButton(quizMaster,quiz) {
    let button = document.createElement('button');
    button.className = 'btn submit hidden';
    button.id = 'submit';
    button.type = 'button';
    button.textContent = 'SUBMIT';
    button.addEventListener("click", function () {

        //nextButton();
        let collectedAnswers = collectSelectedAnswers(quiz);
        markTheAnswers(quiz, collectedAnswers);
        quizMaster.handleQuizScore(quiz, collectedAnswers);

        if (quiz.hasReachedEnd()) {
            fill_result(quiz.score);
        }
        else {
            let questionCards = quiz.questions;
            fill_template(questionCards[quiz.round]);
        }

    });
    let buttonContainer = document.createElement('div');
    buttonContainer.className = ('buttonContainer');
    buttonContainer.appendChild(button);
    let container = document.getElementById('container');
    container.appendChild(buttonContainer);
}

/** change submit button to next */
function nextButton() {
    let button = document.querySelector('button');
    button.innerText = "NEXT";
};
