import { Question, QuestionType } from "../questions/types";
import { QuizMaster } from "./QuizMaster";
import { compile } from "handlebars";

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

    for (let i = 1; i < 7; i++) {
        let circle: HTMLElement = document.createElement('span');
        circle.className = 'circle';
        circle.id = 'Question' + i;
        scoreBar.appendChild(circle);
    }
    let header: HTMLElement = document.getElementsByTagName('header')[0];
    header.appendChild(scoreBar);
    body.appendChild(document.createElement('br'));

    fill_template(questionCards[quiz.round])

    /* using a new template after each submit */
    let submitButton = document.querySelector('button');
    submitButton.addEventListener("click", function () {
    quizMaster.handleQuizScore(quiz, collectSelectedAnswers());
        if(quiz.round===6){
            fill_result(quiz.score);
        }
        else{
            fill_template(questionCards[quiz.round]);
        }
    });
};

/**
 * after the quiz the result template will show up
 */
function fill_result(score : number) {
    fetch('quizResult.hbs')
        .then(response => {
            if (!response.ok) {
                throw new Error("no templates found")
            }
            return response.text();
        })
        .then(response => {
            const template = compile(response);
            const filled = template(score);
            document.getElementById('quizData').innerHTML = filled;
        });
}

/* fetch templates to quiz page */
function fill_template(question: Question) {
    let data = {
        question: question.question,
        answers: question.answers,
    };

    let questionTemplate: string = "null";
    if (question.type === QuestionType.FREE_TEXT) {
        questionTemplate = 'freeTextQuestion.hbs';
    } else if (question.type === QuestionType.SINGLE_CHOICE) {
        questionTemplate = 'singleChoiceQuestion.hbs';
    } else if (question.type === QuestionType.MULTIPLE_CHOICE) {
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


/* This method collect the answers for QuizMaster */
export function collectSelectedAnswers(): string[] {
    let collectedAnswers: string[] = [];
    let currentAnswerType = document.querySelector('input').type;
    
    if (currentAnswerType === 'text') {
        collectedAnswers.push((<HTMLInputElement>document.querySelector('input[type="text"]')).value);
        return collectedAnswers;
    }

    else if (currentAnswerType === 'checkbox') {
        for (let index = 0; index <= 3; index++) {
            const answerType = (<HTMLInputElement>document.querySelector('input[id="' + index + '"]'));
            
            if (answerType.checked === true) {
                collectedAnswers.push(answerType.value);
            }
        }
        return collectedAnswers;
    }
    
    else if (currentAnswerType === 'radio') {
        for (let index = 0; index <= 2; index++) {
            const answerType = (<HTMLInputElement>document.querySelector('input[id="' + index + '"]'));

            if (answerType.checked === true) {
                collectedAnswers.push(answerType.value);
            }
        }
        return collectedAnswers;
    }
};

buildQuizPage();