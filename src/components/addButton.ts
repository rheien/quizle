import { collectSelectedAnswers } from "./collectSelectedAnswers";
import { fill_result, fill_template } from "./fill_template";
import { hideButton } from "./hideButton";
import { Quiz } from "./Quiz";
import { QuizMaster } from "./QuizMaster";

export function addSubmitButton(quizMaster: QuizMaster, quiz: Quiz) {
    let button = document.createElement('button');
    button.className = 'btn submit';
    button.id = 'submit';
    button.type = 'button';
    button.textContent = 'SUBMIT';
    button.addEventListener("click", function () {
        hideButton('submit');
        hideButton('next');

        let question = quiz.questions[quiz.round];
        let collectedAnswers = collectSelectedAnswers(question);
        quizMaster.handleQuizScore(quiz, collectedAnswers);
    });
    let buttonContainer = document.createElement('div');
    buttonContainer.id = ('buttonContainer');
    buttonContainer.appendChild(button);
    let container = document.getElementById('container');
    container.appendChild(buttonContainer);
};

export function addNextButton(quiz: Quiz) {
    let button = document.createElement('button');
    button.className = 'btn next';
    button.id = 'next';
    button.type = 'button';
    button.textContent = 'NEXT';
    button.setAttribute("hidden", "hidden");
    button.addEventListener("click",function() {
        hideButton('next');
        hideButton('submit');

        if (quiz.hasReachedEnd()) {
            fill_result(quiz.score);
        }
        else {
            let questionCards = quiz.questions;

            fill_template(questionCards[quiz.round]);
        }
    });
    let buttonContainer = document.getElementById('buttonContainer')
    buttonContainer.appendChild(button);
    let container = document.getElementById('container');
    container.appendChild(buttonContainer);
};