import { multipleChoiceQuestions } from "../questions/multipleChoiceQuestions.js";
import { singleChoiceQuestions } from "../questions/singleChoiceQuestions.js";
import { textInputQuestions } from "../questions/textInputQuestions.js";
let assert = require('assert');

let mChoice : object = multipleChoiceQuestions;

let sChoice : object = singleChoiceQuestions;

let tInput : object= textInputQuestions;

interface Question {
    question: string;
};

interface MultipleChoice extends Question{
    answers: string;
    correctAnswers: string;
};

interface SingleChoice extends Question{
    answers: string;
    correctAnswers: string;
};

interface TextInput extends Question{
    answers: string;
    correctAnswers: string;
};


 export function questionCard(): {question : string, answers : string, correctAnswers : string} []{
    const quiz : {question : string, answers : string, correctAnswers : string} []= [];

    //for (let index = 0; index < Object.entries(b).length; index++) {
    
    /* later change index  for random question pick */
    for (let index = 0; index < 2; index++) {    
        let card : MultipleChoice = {
            question : mChoice[index].question,
            answers : mChoice[index].answers,
            correctAnswers : mChoice[index].correctAnswers
        }
        quiz.push(card);
    }

    for (let index = 0; index < 2; index++) {    
        let card : SingleChoice = {
            question : sChoice[index].question,
            answers : sChoice[index].answers,
            correctAnswers : sChoice[index].correctAnswer
        }
        quiz.push(card);
    }

    for (let index = 0; index < 2; index++) {    
        let card : TextInput = {
            question : tInput[index].question,
            answers : tInput[index].answer,
            correctAnswers : tInput[index].correctAnswer
        }
        quiz.push(card);
    }

    console.dir(quiz);
    console.dir(quiz[5].question);
    checkRepetition(quiz);
    return quiz;
};
 

/** later a shuffle function? */


/*______________________________________________________*/
function checkRepetition (list : {}[] ) : boolean{
    list.forEach((element,index) => {
        if (element[index].question)  {
            assert.deepEqual()
        }  
    });
    
    return true
};

questionCard();