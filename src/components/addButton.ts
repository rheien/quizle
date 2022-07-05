import { collectSelectedAnswers } from "./collectSelectedAnswers";
import { fillResult, fillTemplate } from "./fetchTemplate";
import { hideButton } from "./hideButton";
import { Quiz } from "./Quiz";
import { QuizMaster } from "./QuizMaster";

export function displaySubmitButton(quizMaster: QuizMaster, quiz: Quiz) {
    let button = document.createElement('button');
    button.className = 'btn submit';
    button.id = 'submit';
    button.type = 'button';
    button.textContent = 'SUBMIT';
    button.addEventListener("click", function () {
        hideButton('submit');
        hideButton('next');

        let questions = quiz.questions[quiz.round];
        let collectedAnswers = collectSelectedAnswers(questions);
        quizMaster.handleQuizScore(quiz, collectedAnswers);
    });
    let buttonContainer = document.createElement('div');
    buttonContainer.id = ('buttonContainer');
    buttonContainer.appendChild(button);
    let container = document.getElementById('container');
    container.appendChild(buttonContainer);
};

export function displayNextButton(quiz: Quiz) {
    let button = document.createElement('button');
    button.className = 'btn next';
    button.id = 'next';
    button.type = 'button';
    button.textContent = 'NEXT';
    button.setAttribute("hidden", "true");
    button.addEventListener("click",function() {
        hideButton('next');
        hideButton('submit');

        if (quiz.hasReachedEnd()) {
            fillResult(quiz.score);
        }
        else {
            let questionCards = quiz.questions;

            fillTemplate(questionCards[quiz.round]);
        }
    });
    let buttonContainer = document.getElementById('buttonContainer')
    buttonContainer.appendChild(button);
    let container = document.getElementById('container');
    container.appendChild(buttonContainer);
};