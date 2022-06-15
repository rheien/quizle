import { Question, Quiz } from "./QuizBuilder";
import { QuizMaster } from "./QuizMaster";
import { compile, registerHelper } from "handlebars";


(function () {
    const quizMaster = new QuizMaster();
    const quiz: Quiz = quizMaster.handleQuizRound();

    let questionCards: Question[] = quiz.questions;

    let data = {
        title: 'hello',
        questionCards,
    };

    registerHelper('text_input', function (answers) {
        return answers.question.length === 1;
    })

    registerHelper('radio', function (answers) {
        return answers.question.length === 3;
    })

    registerHelper('checkbox', function (answers) {
        return answers.question.length === 4;
    })

    const quizTemplate = document.querySelector('link[rel="import"] [href="./view/quizPage.hbs"]');
    //const quizTemplate = link;

    const template = compile(quizTemplate);
    const filled = template(data);
    document.querySelector('#quizData').innerHTML = filled;
}())

