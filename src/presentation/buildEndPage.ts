window.onload = function () {
    buildEndPage();
};

function buildEndPage(): void {
    let questionContainer = document.getElementById('questionContainer')!;
    questionContainer.textContent = 'The quiz has been completed. Do you want to play again?';
    
    
    let newGameButton = document.createElement('button');
    newGameButton.className = 'btn newGame';
    newGameButton.id = 'newGame';
    newGameButton.type = 'button';
    newGameButton.textContent = 'Play Again?';

    newGameButton.addEventListener("click", function () {

        localStorage.clear();
        window.location.pathname = 'quiz.html';
    });

    let buttonContainer = document.createElement('div');
    buttonContainer.id = ('buttonContainer');
    buttonContainer.appendChild(newGameButton);
    let container = document.getElementById('container')!;
    container.appendChild(buttonContainer);
}