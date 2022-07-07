import { Question } from "../questions/types";
import { QuizMaster } from "../game/QuizMaster";
import { FetchTemplate } from "./FetchTemplate";
import { AddButton } from "./AddButton";
import { Quiz } from "../game/Quiz";

window.onload = function () {
    const quizMaster = new QuizMaster();
    let quiz = quizMaster.newQuiz();
    
    let storageScore = localStorage.getItem("quizScore");
    if(storageScore !== null){
        quiz.score= JSON.parse(storageScore);
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

    const fetchTemplate = new FetchTemplate();
    fetchTemplate.fillTemplate(questionCards[quiz.round])
    
    const addButton = new AddButton();
    addButton.displaySubmitButton(quizMaster, quiz);
    addButton.displayNextButton(quiz);
};