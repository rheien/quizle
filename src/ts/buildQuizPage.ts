const button : Element = document.querySelector("#start")
button.addEventListener("click", buildQuizPage);

function buildQuizPage() :void {
    let body : HTMLElement = document.body;
    body.removeChild(body.children[1]);

    /* create score bar */
    let scoreBar : HTMLElement = document.createElement('div');
    scoreBar.className = 'center bar';
    scoreBar.textContent = 'Number of answered questions:';
    scoreBar.appendChild(document.createElement('br'));

    for (let i = 1; i < 7; i++) {
        let circle : HTMLElement = document.createElement('span');
        circle.className = 'circle';
        circle.id = 'Question'+i;
        scoreBar.appendChild(circle);
    }
    let header : HTMLElement = document.getElementsByTagName('header')[0];
    header.appendChild(scoreBar);
    body.appendChild(document.createElement('br'));

    /* create container for question, answer options & submit button  */
    let questionContainer : HTMLElement = document.createElement('div');
    questionContainer.className = 'center container';

    /* rendering the question */
    let question : HTMLElement = document.createElement('div');
    question.className = 'question';
    question.textContent = 'What is Lorem Ipsum?';
    questionContainer.appendChild(question);

    /* rendering the answer type */
    let answerType : HTMLElement = document.createElement('div');
    answerType.className = 'answerType';

    /* checkbox as an example */
    let answerOption : HTMLElement = document.createElement('input');
    answerOption.id = 'a';
    answerOption.setAttribute('type','checkbox');
    answerOption.setAttribute('name','a');
    answerType.appendChild(answerOption);
    let label_answerOption : HTMLElement = document.createElement('label');
    label_answerOption.setAttribute('for','a');
    label_answerOption.textContent = 'blub'
    answerType.appendChild(label_answerOption);
    questionContainer.appendChild(answerType);

    /* submit button */
    let submitButton : HTMLElement = document.createElement('button');
    submitButton.className = 'btn submit hidden';
    submitButton.setAttribute('type', 'button');
    submitButton.textContent = 'SUBMIT';
    questionContainer.appendChild(submitButton);
    body.appendChild(questionContainer);
};