import { Question, QuestionType } from "../questions/types";

/* This method collect the answers for QuizMaster */
export function collectSelectedAnswers(question: Question): string[] {
    let collectedAnswers: string[] = [];

    if(question.type === QuestionType.FREE_TEXT){
        const input = document.getElementById('0') as HTMLInputElement;
        if(haveToAnswer(input.value)){
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

function haveToAnswer(input): boolean{
    return input.length !== 0
};