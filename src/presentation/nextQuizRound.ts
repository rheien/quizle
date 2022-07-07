import { multipleChoiceQuestions } from "../questions/multipleChoiceQuestions";
import { singleChoiceQuestions } from "../questions/singleChoiceQuestions";
import { textInputQuestions } from "../questions/textInputQuestions";
import { Question } from "../questions/types";
import { Quiz } from "../game/Quiz";

export function nextQuizRound(quiz: Quiz) {
    let restartButton = document.createElement('button');
    restartButton.className = 'btn restart';
    restartButton.id = 'restart';
    restartButton.type = 'button';
    restartButton.textContent = 'NEXT QUIZ';
    
    restartButton.addEventListener("click",function() {
       
        sessionStorage.setItem("quizScore", JSON.stringify(quiz.score));
        //sessionStorage.setItem("multipleChoice", JSON.stringify(multipleChoiceQuestions));
        //sessionStorage.setItem("singleChoice", JSON.stringify(singleChoiceQuestions));
        //sessionStorage.setItem("textInput", JSON.stringify(textInputQuestions));

        let nonRepeatQuestions : string[]=[];
        quiz.questions.forEach(question => {
            if (question.repeatQuestion === 'no'){
                nonRepeatQuestions.push(question.question);
            }
        });
        sessionStorage.setItem("nonRepeatQuestions", JSON.stringify(nonRepeatQuestions));

        window.location.reload();
    });
    
    let buttonContainer = document.getElementById('buttonContainer')
    buttonContainer?.appendChild(restartButton);
    let container = document.getElementById('container');
    container?.appendChild(buttonContainer);
};