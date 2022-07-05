import { Quiz } from "./Quiz";

export function nextQuizRound(quiz: Quiz) {
    let restartButton = document.createElement('button');
    restartButton.className = 'btn restart';
    restartButton.id = 'restart';
    restartButton.type = 'button';
    restartButton.textContent = 'NEXT QUIZ';
    restartButton.addEventListener("click",function() {
        
        //quiz.round = 0;
        window.location.reload();
    
    });
    let buttonContainer = document.getElementById('buttonContainer')
    buttonContainer.appendChild(restartButton);
    let container = document.getElementById('container');
    container.appendChild(buttonContainer);
};