import { collectSelectedAnswers, markTheAnswers } from "./collectSelectedAnswers";
import { fill_result, fill_template } from "./fill_template";

export function addSubmitButton(quizMaster, quiz) {
    let button = document.createElement('button');
    button.className = 'btn submit';
    button.id = 'submit';
    button.type = 'button';
    button.textContent = 'SUBMIT';
    button.addEventListener("click", function () {
        hidden('submit');
        hidden('next');

        let collectedAnswers = collectSelectedAnswers();
        markTheAnswers(quiz, collectedAnswers);
        quizMaster.handleQuizScore(quiz, collectedAnswers);
    });
    let buttonContainer = document.createElement('div');
    buttonContainer.id = ('buttonContainer');
    buttonContainer.appendChild(button);
    let container = document.getElementById('container');
    container.appendChild(buttonContainer);
};

export function addNextButton(quiz) {
    let button = document.createElement('button');
    button.className = 'btn next';
    button.id = 'next';
    button.type = 'button';
    button.textContent = 'NEXT';
    button.setAttribute("hidden", "hidden");
    button.addEventListener("click",function() {
        hidden('next');
        hidden('submit');

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

/** changes the visibility of the buttons */
export function hidden(button: string) {
    let element = document.getElementById(button);
    let hidden = element?.getAttribute("hidden");

    if(hidden){
        element?.removeAttribute("hidden");
    }
    else{
        element?.setAttribute("hidden","hidden");
    }
};