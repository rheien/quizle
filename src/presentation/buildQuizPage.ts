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

    noteBox();

    const fetchTemplate = new FetchTemplate();
    fetchTemplate.fillTemplate(questionCards[quizMaster.quiz.round])

    const addButton = new AddButton();
    addButton.displaySubmitButton(quizMaster);
    addButton.displayNextButton(quizMaster);
};

/**
 * This note will show up if the submitted answers for 
 * multiple choice are not fully answered
 */
function noteBox(): void {
    let noteContent = document.createElement("div");
    noteContent.className = 'note-content';

    let closeButton = document.createElement("span");
    closeButton.className = 'close';
    closeButton.innerHTML = '&times;';
    noteContent.appendChild(closeButton);
    
    let noteText = document.createElement("p");
    noteText.textContent = 'Some answers are missing';
    noteContent.appendChild(noteText);
    
    let note = document.createElement("div");
    note.className = "note";
    note.id = "popUp";
    note.appendChild(noteContent);
    
    let container = document.getElementById("container") as HTMLDivElement;
    container.appendChild(note);
};