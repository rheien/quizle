import { collectSelectedAnswers } from "./collectSelectedAnswers";
import { fill_result, fill_template } from "./fill_template";
import { hideButton } from "./hideButton";
import { Quiz } from "./Quiz";
import { QuizMaster } from "./QuizMaster";

export function nextGame(quizMaster: QuizMaster) {
    let restartButton = document.createElement('button');
    restartButton.className = 'btn restart';
    restartButton.id = 'restart';
    restartButton.type = 'button';
    restartButton.textContent = 'NEXT QUIZ';
    restartButton.setAttribute("hidden", "hidden");
    restartButton.addEventListener("click",function() {
        
        quiz.round = 0;
        fill_template(questionCards[quiz.round]);
        
    });
    let buttonContainer = document.getElementById('buttonContainer')
    buttonContainer.appendChild(restartButton);
    let container = document.getElementById('container');
    container.appendChild(buttonContainer);
};