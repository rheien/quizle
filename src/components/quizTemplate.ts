import { Question, Quiz } from "./QuizBuilder";
import { QuizMaster } from "./QuizMaster";
import { compile, registerHelper } from "handlebars";


(function () {
    const quizMaster = new QuizMaster();
    const quiz: Quiz = quizMaster.handleQuizRound();

    let questionCards: Question[] = quiz.questions;

    let data = {
        title: "hello for quiz",
        questionCards,
    };

    /*
    registerHelper('text_input', function (answers) {
        return answers.question.length === 1;
    })

    registerHelper('radio', function (answers) {
        return answers.question.length === 3;
    })

    registerHelper('checkbox', function (answers) {
        return answers.question.length === 4;
    }) 
    */
    
    
    fetch('quizContainer.hbs')
        .then(response => {
            if (!response.ok){
                throw new Error ("no templates found")
            }
            return response.text();
        })
        .then(response =>  {
            const template = compile(response);
            const filled = template(data);
            document.getElementById('quizData').innerHTML =filled;
            console.log(filled)
        });
}())