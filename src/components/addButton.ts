import { nextQuestion } from "./nextQuestion";
import { Quiz } from "./Quiz";
import { QuizMaster } from "./QuizMaster";
import { submitAnswer } from "./submitAnswer";

export function addSubmitButton(quizMaster: QuizMaster, quiz: Quiz) {
    let button = document.createElement('button');
    button.className = 'btn submit';
    button.id = 'submit';
    button.type = 'button';
    button.textContent = 'SUBMIT';
    button.addEventListener("click", function () {
        submitAnswer(quizMaster, quiz);
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
        nextQuestion(quiz);
    });
    let buttonContainer = document.getElementById('buttonContainer')
    buttonContainer.appendChild(button);
    let container = document.getElementById('container');
    container.appendChild(buttonContainer);
};