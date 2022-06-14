import { Question } from "./QuizBuilder";
import { QuizMaster } from "./QuizMaster";

function buildQuizPage(): void {
    const quizMaster = new QuizMaster();
    const quiz = quizMaster.handleQuizRound();
    let questionCards: Question[] = quiz.questions;
    let round = quiz.round;

    let body: HTMLElement = document.body;

    /* create score bar */
    let scoreBar: HTMLElement = document.createElement('div');
    scoreBar.className = 'center bar';
    scoreBar.textContent = 'Number of answered questions:';
    scoreBar.appendChild(document.createElement('br'));

    for (let i = 1; i < 7; i++) {
        let circle: HTMLElement = document.createElement('span');
        circle.className = 'circle';
        circle.id = 'Question' + i;
        scoreBar.appendChild(circle);
    }
    let header: HTMLElement = document.getElementsByTagName('header')[0];
    header.appendChild(scoreBar);
    body.appendChild(document.createElement('br'));

    /* create container for question, answer options & submit button  */
    let questionContainer: HTMLElement = document.createElement('div');
    questionContainer.className = 'center container';

    /* rendering the question */
    let question: HTMLElement = document.createElement('div');
    question.className = 'question';
    question.textContent = questionCards[round].question;
    questionContainer.appendChild(question);

    /* container for answer type */
    let answerType: HTMLElement = document.createElement('div');
    answerType.className = 'answerType';

    /* 3 cases for rendering answer types */
    if (questionCards[round].answers.length === 4) {
        answerOptions(questionCards[round].answers, 'checkbox');
    } else if (questionCards[round].answers.length === 3) {
        answerOptions(questionCards[round].answers, 'radio');
    } else {
        let answerOption: HTMLInputElement = document.createElement('input');
        answerOption.id = 'text_input';
        answerOption.setAttribute('type', 'text');
        answerOption.setAttribute('name', 'input_answer')
        let containerAnswerOption = document.createElement('div');
        containerAnswerOption.appendChild(answerOption);
        answerType.appendChild(containerAnswerOption);
        questionContainer.appendChild(answerType);
    }

    /** This method render type radio and checkbox */
    function answerOptions(answers, inputType) {
        answers.forEach((answer, index) => {
            let answerOption: HTMLInputElement = document.createElement('input');
            answerOption.id = (index + 1);
            answerOption.setAttribute('type', inputType);
            answerOption.setAttribute('name', 'answer_btn_' + inputType);
            answerOption.setAttribute('value', answer);
            let containerAnswerOption = document.createElement('div');
            containerAnswerOption.appendChild(answerOption);
            answerType.appendChild(containerAnswerOption);
            
            let label_answerOption: HTMLElement = document.createElement('label');
            label_answerOption.setAttribute('for', 'answer_btn_' + (index + 1));
            label_answerOption.textContent = answer;
            containerAnswerOption.appendChild(label_answerOption);
            answerType.appendChild(containerAnswerOption);
            questionContainer.appendChild(answerType);
        });
    };

    /* submit button */
    let submitButton: HTMLElement = document.createElement('button');
    submitButton.className = 'btn submit hidden';
    submitButton.setAttribute('type', 'button');
    submitButton.textContent = 'SUBMIT';
    submitButton.addEventListener("click", quizMaster.handleQuiz);
    questionContainer.appendChild(submitButton);
    body.appendChild(questionContainer);
};

buildQuizPage();