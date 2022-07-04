import { Question, QuestionType } from "../questions/types";

/* This method collect the answers for QuizMaster */
export function collectSelectedAnswers(question: Question): string[] {
    let collectedAnswers: string[] = [];


    if(question.type === QuestionType.FREE_TEXT){
        collectedAnswers.push(<HTMLInputElement>document.getElementById('0').value);
        return collectedAnswers;
    }

    else if (question.type === QuestionType.MULTIPLE_CHOICE) {
        for (let index = 0; index < question.answers.length; index++) {
            const answerType = (<HTMLInputElement>document.getElementById(index.toString()));

            if (answerType.checked === true) {
                collectedAnswers.push(answerType.value);
            }
        }
        return collectedAnswers;
    }

    else if (question.type === QuestionType.SINGLE_CHOICE) {
        for (let index = 0; index < question.answers.length; index++) {
            const answerType = (<HTMLInputElement>document.getElementById(index.toString()));

            if (answerType.checked === true) {
                collectedAnswers.push(answerType.value);
            }
        }
        return collectedAnswers;
    }
};