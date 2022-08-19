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

        let buttonContainer = document.getElementById('buttonContainer') as HTMLDivElement;
        buttonContainer.appendChild(button);
        let container = document.getElementById('container')!;
        container.appendChild(buttonContainer);
    };

    /** changes the visibility of the buttons */
    hideButton(button: string) {
        let element = document.getElementById(button) as HTMLButtonElement;
        let hidden = element.getAttribute("hidden");

        if (hidden) {
            element.removeAttribute("hidden");
        }
        else {
            element.setAttribute("hidden", "true");
        }
    };

    nextQuizRound() {
        let nextQuizButton = document.createElement('button');
        nextQuizButton.className = 'btn nextQuiz';
        nextQuizButton.id = 'nextQuiz';
        nextQuizButton.type = 'button';
        nextQuizButton.textContent = 'NEXT QUIZ';

        nextQuizButton.addEventListener("click", function () {

            //localStorage.setItem("quizScore", JSON.stringify(quiz.score));
            window.location.reload();
        });

        let buttonContainer = document.getElementById('buttonContainer');
        if (buttonContainer !== null) {
            buttonContainer.appendChild(nextQuizButton);
            let container = document.getElementById('container')!;
            container.appendChild(buttonContainer);
        }
    };

    showNote() {
        const noteBox = document.getElementById('popUp') as HTMLDivElement;
        noteBox.style.display = 'block';
    };

    closeNote() {
        const closeButton = document.getElementsByClassName("close")[0];
        closeButton.addEventListener("click", function () {
            const note = document.getElementById("popUp") as HTMLDivElement;
            note.style.display = "none";
        });
    };
}
