import { multipleChoiceQuestions } from "../questions/multipleChoiceQuestions";
import { singleChoiceQuestions } from "../questions/singleChoiceQuestions";
import { textInputQuestions } from "../questions/textInputQuestions";

interface Question {
    question: string;
};

interface MultipleChoice extends Question {
    answers: string;
    correctAnswers: string;
};

interface SingleChoice extends Question {
    answers: string;
    correctAnswers: string;
};

interface TextInput extends Question {
    answers: string;
    correctAnswers: string;
};

class Quiz {
    questions: Question[];
    score: number;
};

export class QuizBuilder {
    buildQuiz(): Quiz {
        const quiz: Quiz = new Quiz();
        const questions = [];

        //for (let index = 0; index < Object.entries(b).length; index++) {

        /* later change index  for random question pick */
        let mChoice: object = multipleChoiceQuestions;
        for (let index = 0; index < 2; index++) {
            let card: MultipleChoice = {
                question: mChoice[index].question,
                answers: mChoice[index].answers,
                correctAnswers: mChoice[index].correctAnswers
            }
            questions.push(card);
        }

        let sChoice: object = singleChoiceQuestions;
        for (let index = 0; index < 2; index++) {
            let card: SingleChoice = {
                question: sChoice[index].question,
                answers: sChoice[index].answers,
                correctAnswers: sChoice[index].correctAnswer
            }
            questions.push(card);
        }
        /*function poseQuestion(quest: object) {
            for (let index = 0; index < 2; index++) {
                let pickNumber: number = randomPick(quest);
                let card: TextInput = {
                    question: quest[pickNumber].question,
                    answers: quest[pickNumber].answer,
                    correctAnswers: quest[pickNumber].correctAnswer
                }
                quiz.questions.push(card);
            }
        }*/

        let tInput: object = textInputQuestions;
        for (let index = 0; index < 2; index++) {
            let pickNumber: number = randomPick(tInput);
            let card: TextInput = {
                question: tInput[pickNumber].question,
                answers: tInput[pickNumber].answer,
                correctAnswers: tInput[pickNumber].correctAnswer
            }
            questions.push(card);
        }
        
        console.dir(quiz);
        //console.dir(quiz[4].question);
        //checkRepetition(quiz,card);
        quiz.questions = questions;
        return quiz;
    };
}


    /** later a shuffle function? */


    /*______________________________________________________*/
function randomPick(questions: object) {
    let lengthQuestionList: number = Object.keys(questions).length;
    return Math.floor(Math.random() * lengthQuestionList)
}


function checkRepetition(list: {}[], card: {}): number {
    //console.dir(typeof(card))
    let assert = require('assert');
    //console.dir(list)
    list.forEach((element, index) => {
        //console.dir(element.question)
        //console.dir(card.question)
        if (assert.equal(element[index], card[0])) {
            //console.dir(element[index])
            //console.dir(card[0])
        }
    });

    return 1
};