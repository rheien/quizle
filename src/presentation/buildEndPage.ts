window.onload = function () {
    buildEndPage();
};

function buildEndPage(): void {
    let newGameButton = document.createElement('button');
    newGameButton.className = 'btn newGame';
    newGameButton.id = 'newGame';
    newGameButton.type = 'button';
    newGameButton.textContent = 'Play This Game Again';

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