import { Question } from "../questions/types";
import { QuizMaster } from "./QuizMaster";
import { fillTemplate } from "./fetchTemplate";
import { displayNextButton, displaySubmitButton } from "./addButton";
import { Quiz } from "./Quiz";

window.onload = function () {
    const quizMaster = new QuizMaster();
    let quiz = quizMaster.newQuiz();
    
    let scoreSession = sessionStorage.getItem("quizScore");
    if(scoreSession !== null){
        quiz.score= JSON.parse(scoreSession);
    }
    buildQuizPage(quizMaster, quiz);
};

/**
 * Build the Quiz Page 
 */
export function buildQuizPage(quizMaster: QuizMaster, quiz: Quiz): void {
    const questionCards: Question[] = quiz.questions;

    /* create score bar */
    let scoreBar: HTMLElement = document.createElement('div');
    scoreBar.className = 'center bar';
    scoreBar.id = 'scorebar';
    scoreBar.textContent = 'Number of answered questions:';
    scoreBar.appendChild(document.createElement('br'));

    for (let i = 1; i <= quiz.maxRound; i++) {
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