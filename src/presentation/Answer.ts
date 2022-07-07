import { Quiz } from "../game/Quiz";
import { QuizMaster } from "../game/QuizMaster";
import { Question, QuestionType } from "../questions/types";
import { AddButton } from "./AddButton";

export class Answer{

    /* This method collect the answers for QuizMaster */
    collectSelectedAnswers(question: Question): string[] {
        let collectedAnswers: string[] = [];
    
        if(question.type === QuestionType.FREE_TEXT){
            const input = document.getElementById('0') as HTMLInputElement;
            if(this.hasAnswered(input)){
                collectedAnswers.push(input.value);
            }
            return collectedAnswers;
        }
    
        else if (question.type === QuestionType.MULTIPLE_CHOICE) {
            for (let index = 0; index < question.answers.length; index++) {
                const answerType = document.getElementById(index.toString()) as HTMLInputElement;
    
                if (answerType.checked === true) {
                    collectedAnswers.push(answerType.value);
                }
            }
            return collectedAnswers;
        }
    
        else if (question.type === QuestionType.SINGLE_CHOICE) {
            for (let index = 0; index < question.answers.length; index++) {
                const answerType = document.getElementById(index.toString()) as HTMLInputElement;
    
                if (answerType.checked === true) {
                    collectedAnswers.push(answerType.value);
                }
            }
            return collectedAnswers;
        }
    
        throw new Error(`Unsupported questionType: ${question.type}`)
    };
    
    hasAnswered(input: HTMLInputElement): boolean{
        return input.value.length !== 0
    };


    markTheAnswers(quiz: Quiz, collectedAnswers: string[]) {
        let question = quiz.questions[quiz.round];
        collectedAnswers.forEach(answer => {
            let indexAnswer = question.answers.indexOf(answer);
            let coloredAnswer = document.getElementById("answer_" + indexAnswer.toString());
    
            if (quiz.answeredCorrectly(question.correctAnswers, answer)) {
                coloredAnswer.setAttribute("id", "correct");
                
                // in case of lower case answer in free text input
                if (indexAnswer === -1) {
                    coloredAnswer = document.getElementById("answer_0");
                    coloredAnswer.setAttribute("id", "correct");
                }
            }
            else {
                coloredAnswer.setAttribute("id", "wrong");
                
                if (indexAnswer === -1) {
                    coloredAnswer = document.getElementById("answer_0");
                    coloredAnswer.setAttribute("id", "wrong");
                }
            }
        });
    };


    submitAnswer(quizMaster: QuizMaster, quiz: Quiz) {
    
        let questions = quiz.questions[quiz.round];
        let collectedAnswers = this.collectSelectedAnswers(questions);
        
        const addButton = new AddButton();
        if(collectedAnswers.length !== 0){
            addButton.hideButton('submit');
            addButton.hideButton('next');
            this.markTheAnswers(quiz,collectedAnswers);
            quizMaster.handleQuizScore(quiz, collectedAnswers);
        }
    };
}