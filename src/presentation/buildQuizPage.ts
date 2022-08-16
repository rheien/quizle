import { Question } from "../questions/types";
import { QuizMaster } from "../game/QuizMaster";
import { FetchTemplate } from "./FetchTemplate";
import { AddButton } from "./AddButton";

window.onload = function () {
    const quizMaster = new QuizMaster();
    quizMaster.quizGameFlow();
};

/**
 * Build the Quiz Page 
 */
export function buildQuizPage(quizMaster: QuizMaster): void {
    const questionCards: Question[] = quizMaster.quiz.questions;

    /* create score bar */
    let scoreBar: HTMLElement = document.createElement('div');
    scoreBar.className = 'center bar';
    scoreBar.id = 'scorebar';
    scoreBar.textContent = 'Number of answered questions:';
    scoreBar.appendChild(document.createElement('br'));

    for (let i = 1; i <= quizMaster.quiz.maxRound; i++) {
        let circle: HTMLElement = document.createElement('span');
        circle.className = 'circle';
        circle.id = 'Question' + i;
        scoreBar.appendChild(circle);
    }
    let header: HTMLElement = document.getElementsByTagName('header')[0];
    header.appendChild(scoreBar);

    const fetchTemplate = new FetchTemplate();
    fetchTemplate.fillTemplate(questionCards[quizMaster.quiz.round])

    const addButton = new AddButton();
    addButton.displaySubmitButton(quizMaster);
    addButton.displayNextButton(quizMaster);
};