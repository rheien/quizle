import { multipleChoiceQuestions } from "../questions/multipleChoiceQuestions";
import { singleChoiceQuestions } from "../questions/singleChoiceQuestions";
import { textInputQuestions } from "../questions/textInputQuestions";

export interface Question {
    question: string;
    answers: string[];
    correctAnswers: string[];
};

class Quiz {
    questions: Question[];
    score: number;
};

export class QuizBuilder {
    buildQuiz(): Quiz {
        const quiz: Quiz = new Quiz();
        let questions = [];

        questions = questions.concat(this.poseQuestion(multipleChoiceQuestions));
        questions = questions.concat(this.poseQuestion(singleChoiceQuestions));
        questions = questions.concat(this.poseQuestion(textInputQuestions));
        
        quiz.questions = questions;
        return quiz;
    };

    poseQuestion(typeOfAnwers: Question[]) : Question[]{
        const picks : Question[] = [];
        for (let index = 0; index < 2; index++) {
            let pickNumber: number = this.randomPick(typeOfAnwers);
            picks.push(typeOfAnwers[pickNumber]);
        }
        return picks;
    }

    randomPick(questions: Question[]) : number{
        return Math.floor(Math.random() * questions.length)
    }

    //checkDuplicate(questions: Question[]) : 
}


    /** later a shuffle function? */


    /*______________________________________________________*/



function checkRepetition(list: {}[], card: {}): number {
    //console.dir(typeof(card))
    //console.dir(list)
    list.forEach((element, index) => {
        //console.dir(element.question)
        //console.dir(card.question)
        if (element[index] === card[0]) {
            //console.dir(element[index])
            //console.dir(card[0])
        }
    });

    return 1
};
