import { Question } from "../questions/types";
import { QuizMaster } from "../game/QuizMaster";
import { FetchTemplate } from "./FetchTemplate";
import { AddButton } from "./AddButton";
import { Quiz } from "../game/Quiz";

/*
window.onbeforeunload = function () {
    localStorage.clear()
};*/

window.onload = function () {
    //localStorage.clear()
    const quizMaster = new QuizMaster();
    let quiz = quizMaster.newQuiz();
    
    if(quiz.hasQuestionsLeft()){
        buildQuizPage(quizMaster, quiz);
    }
    else{
        localStorage.clear()
        //window.location.pathname = 'gameEnds.html';
    }


/*
    let retrievePreviousScore = localStorage.getItem("quizScore");
    localStorage.removeItem('quizScore');
    if(retrievePreviousScore !== null){
        quiz.score= JSON.parse(retrievePreviousScore);
    }
*/
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