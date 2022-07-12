import { QuizMaster } from "../game/QuizMaster";
import { Answer } from "./Answer";
import { FetchTemplate } from "./FetchTemplate";

export class AddButton {

    displaySubmitButton(quizMaster: QuizMaster) {
        let button = document.createElement('button');
        button.className = 'btn submit';
        button.id = 'submit';
        button.type = 'button';
        button.textContent = 'SUBMIT';


        const answer = new Answer();
        button.addEventListener("click", function () {
            answer.submitAnswer(quizMaster);
        });

        let buttonContainer = document.createElement('div');
        buttonContainer.id = ('buttonContainer');
        buttonContainer.appendChild(button);
        let container = document.getElementById('container')!;
        container.appendChild(buttonContainer);
    };

    displayNextButton(quizMaster: QuizMaster) {
        let button = document.createElement('button');
        button.className = 'btn next';
        button.id = 'next';
        button.type = 'button';
        button.textContent = 'NEXT';
        button.setAttribute("hidden", "true");

        const fetchTemplate = new FetchTemplate();
        button.addEventListener("click", function () {
            fetchTemplate.nextQuestion(quizMaster);
        });

        let buttonContainer = document.getElementById('buttonContainer');
        buttonContainer.appendChild(button);
        let container = document.getElementById('container')!;
        container.appendChild(buttonContainer);
    };

    /** changes the visibility of the buttons */
    hideButton(button: string) {
        let element = document.getElementById(button);
        let hidden = element.getAttribute("hidden");

        if (hidden) {
            element.removeAttribute("hidden");
        }
        else {
            element.setAttribute("hidden", "true");
        }
    };

    nextQuizRound() {
        let restartButton = document.createElement('button');
        restartButton.className = 'btn restart';
        restartButton.id = 'restart';
        restartButton.type = 'button';
        restartButton.textContent = 'NEXT QUIZ';

        restartButton.addEventListener("click", function () {

            //localStorage.setItem("quizScore", JSON.stringify(quiz.score));
            window.location.reload();
        });

        let buttonContainer = document.getElementById('buttonContainer');
        if(buttonContainer !== null){
            buttonContainer.appendChild(restartButton);
            let container = document.getElementById('container')!;
            container.appendChild(buttonContainer);
        }
    };
}