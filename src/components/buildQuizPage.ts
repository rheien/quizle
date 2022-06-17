import { Question, QuestionType } from "../questions/types";
import { QuizMaster } from "./QuizMaster";
import { compile } from "handlebars";

function buildQuizPage(): void {
    const quizMaster = new QuizMaster();
    const quiz = quizMaster.handleQuizRound();
    let questionCards: Question[] = quiz.questions;
    let round = quiz.round;

    let body: HTMLElement = document.body;

    /* create score bar */
    let scoreBar: HTMLElement = document.createElement('div');
    scoreBar.className = 'center bar';
    scoreBar.textContent = 'Number of answered questions:';
    scoreBar.appendChild(document.createElement('br'));

    for (let i = 1; i < 7; i++) {
        let circle: HTMLElement = document.createElement('span');
        circle.className = 'circle';
        circle.id = 'Question' + i;
        scoreBar.appendChild(circle);
    }
    let header: HTMLElement = document.getElementsByTagName('header')[0];
    header.appendChild(scoreBar);
    body.appendChild(document.createElement('br'));

    fill_template(questionCards[round])
};

function fill_template(question: Question) {
    let data = {
        question: question.question,
        answers: question.answers,
    };

    let questionTemplate : string = null;
    if(question.type === QuestionType.FREE_TEXT){
        questionTemplate = 'freeTextQuestion.hbs';
    } else if ( question.type === QuestionType.SINGLE_CHOICE){
        questionTemplate = 'singleChoiceQuestion.hbs';
    } else if (question.type === QuestionType.MULTIPLE_CHOICE){
        questionTemplate = 'multipleChoiceQuestion.hbs';
    }

    fetch(questionTemplate)
        .then(response => {
            if (!response.ok) {
                throw new Error("no templates found")
            }
            return response.text();
        })
        .then(response => {
            const template = compile(response);
            const filled = template(data);
            document.getElementById('quizData').innerHTML = filled;
        });
};

buildQuizPage();