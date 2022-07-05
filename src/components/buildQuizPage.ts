import { Question } from "../questions/types";
import { QuizMaster } from "./QuizMaster";
import { fillTemplate } from "./fetchTemplate";
import { displayNextButton, displaySubmitButton } from "./addButton";

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

    fillTemplate(questionCards[quiz.round])

    displaySubmitButton(quizMaster, quiz);
    displayNextButton(quiz);
};