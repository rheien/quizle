import { multipleChoiceQuestions } from "../questions/multipleChoiceQuestions.js";
import { singleChoiceQuestions } from "../questions/singleChoiceQuestions.js";
import { textInputQuestions } from "../questions/textInputQuestions.js";

let b : object = multipleChoiceQuestions;

let c : object = singleChoiceQuestions;

let d : object= textInputQuestions;

interface Question {
    question: string;
};

interface MultipleChoice extends Question{
    answers: string;
    correctAnswers: string;
};

interface SingleChoice extends Question{
    answers: string;
    correctAnswer: string;
};

interface TextInput extends Question{
    answers: string;
    correctAnswer: string;
};


 export function questionCard(): {question : string, answers : string, correctAnswers : string} []{
    const quiz : {question : string, answers : string, correctAnswers : string} []= [];

    for (let index = 0; index < Object.entries(b).length; index++) {
        let question = b[index].question;
        let answers = b[index].answers;
        let correctAnswers = b[index].correctAnswers;
        quiz.push({question,answers,correctAnswers});
    }
    console.dir(quiz);

    return quiz;

    /** later a shuffle function? */
};

questionCard();