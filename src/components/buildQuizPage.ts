import { Question, QuestionType } from "../questions/types";
import { QuizMaster } from "./QuizMaster";
import { compile } from "handlebars";
import { Quiz } from "./Quiz";

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

    for (let i = 1; i < 7; i++) {
        let circle: HTMLElement = document.createElement('span');
        circle.className = 'circle';
        circle.id = 'Question' + i;
        scoreBar.appendChild(circle);
    }
    let header: HTMLElement = document.getElementsByTagName('header')[0];
    header.appendChild(scoreBar);

    fill_template(questionCards[quiz.round])

    let button = document.createElement('button');
    button.className = 'btn submit hidden';
    button.id = 'submit';
    button.type = 'button';
    button.textContent = 'SUBMIT';
    button.addEventListener("click", function () {

        //nextButton();
        let collectedAnswers = collectSelectedAnswers();
        markTheCorrectness(quiz, collectedAnswers);
        quizMaster.handleQuizScore(quiz, collectedAnswers);
    
        if (quiz.hasReachedEnd()) {
            fill_result(quiz.score);
        }
        else {
            fill_template(questionCards[quiz.round]);
        }
        
    });
    let buttonContainer = document.createElement('div');
    buttonContainer.className = ('buttonContainer');
    buttonContainer.appendChild(button);
    let container = document.getElementById('container');
    container.appendChild(buttonContainer);

};



/**  */
function markTheCorrectness(quiz: Quiz, collectedAnswers: string[]){
    let question = quiz.questions[quiz.round];
    collectedAnswers.forEach(answer => {
        if (quiz.answeredCorrectly(question.correctAnswers, answer)) {
            let indexAnswer = question.answers.indexOf(answer);
            let coloredAnswer = document.getElementById(indexAnswer.toString());
            coloredAnswer?.setAttribute("id", "right");
        }
        else {
            let indexAnswer = question.answers.indexOf(answer);
            let coloredAnswer = document.getElementById(indexAnswer.toString());
            coloredAnswer?.setAttribute("id", "wrong");
        }
    });
};

/** change submit button to next */
function nextButton() {
    let button = document.querySelector('button');
    button.innerText = "NEXT";
};

/**
 * after the quiz the result template will show up
 */
function fill_result(score: number) {
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
            document.getElementById('container').innerHTML = filled;
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
            let template = compile(response);
            let filled = template(data);
            document.getElementById('questionContainer').innerHTML = filled;
        });
};


/* This method collect the answers for QuizMaster */
function collectSelectedAnswers(): string[] {
    let collectedAnswers: string[] = [];

    if(document.getElementById('0').type ==='text'){
        collectedAnswers.push(<HTMLInputElement>document.getElementById('0').value);
        return collectedAnswers;
    }

    else if (document.getElementById('0').type === 'checkbox') {
        for (let index = 0; index <= 3; index++) {
            const answerType = (<HTMLInputElement>document.getElementById(index.toString()));

            if (answerType.checked === true) {
                collectedAnswers.push(answerType.value);
            }
        }
        return collectedAnswers;
    }

    else if (document.getElementById('0').type === 'radio') {
        for (let index = 0; index <= 2; index++) {
            const answerType = (<HTMLInputElement>document.getElementById(index.toString()));

            if (answerType.checked === true) {
                collectedAnswers.push(answerType.value);
            }
        }
        return collectedAnswers;
    }
};