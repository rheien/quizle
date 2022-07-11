import { Quiz } from "../game/Quiz";
import { QuizMaster } from "../game/QuizMaster";
import { Answer } from "./Answer";
import { FetchTemplate } from "./FetchTemplate";

export class AddButton {

    displaySubmitButton(quizMaster: QuizMaster, quiz: Quiz) {
        let button = document.createElement('button');
        button.className = 'btn submit';
        button.id = 'submit';
        button.type = 'button';
        button.textContent = 'SUBMIT';


        const answer = new Answer();
        button.addEventListener("click", function () {
            answer.submitAnswer(quizMaster, quiz);
        });

        let buttonContainer = document.createElement('div');
        buttonContainer.id = ('buttonContainer');
        buttonContainer.appendChild(button);
        let container = document.getElementById('container')!;
        container.appendChild(buttonContainer);
    };

    displayNextButton(quiz: Quiz) {
        let button = document.createElement('button');
        button.className = 'btn next';
        button.id = 'next';
        button.type = 'button';
        button.textContent = 'NEXT';
        button.setAttribute("hidden", "true");

        const fetchTemplate = new FetchTemplate();
        button.addEventListener("click", function () {
            fetchTemplate.nextQuestion(quiz);
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

    nextQuizRound(quiz: Quiz) {
        let restartButton = document.createElement('button');
        restartButton.className = 'btn restart';
        restartButton.id = 'restart';
        restartButton.type = 'button';
        restartButton.textContent = 'NEXT QUIZ';

        restartButton.addEventListener("click", function () {

            localStorage.setItem("quizScore", JSON.stringify(quiz.score));

            //loads correct answered questions from previous round and adds the new ones
            let nonRepeatQuestions: string[] = [];
            let retrieveAnsweredQuestions = localStorage.getItem("nonRepeatQuestions");
            localStorage.removeItem('nonRepeatQuestions');
            if(retrieveAnsweredQuestions !== null){
                let correctAnsweredQuestions: string[] = JSON.parse(retrieveAnsweredQuestions);
                correctAnsweredQuestions.forEach(question =>{
                    nonRepeatQuestions.push(question);
                });
            };
            
            quiz.questions.forEach(question => {
                if (question.repeatQuestion === 'no') {
                    nonRepeatQuestions.push(question.question);
                }
            });
            localStorage.setItem("nonRepeatQuestions", JSON.stringify(nonRepeatQuestions));

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