import { Quiz } from "./Quiz";

/* This method collect the answers for QuizMaster */
export function collectSelectedAnswers(): string[] {
    let collectedAnswers: string[] = [];

    if (document.getElementById('0').type === 'text') {
        collectedAnswers.push(<HTMLInputElement>document.getElementById('0').value);
        return collectedAnswers;
    }

    else if (document.getElementById('0').type === 'checkbox') {
        for (let index = 0; index <= 3; index++) {
            const answerType = (<HTMLInputElement>document.getElementById(index.toString()));

            if (answerType.checked === true) {
                collectedAnswers.push(answerType.value);
            }
        }
        return collectedAnswers;
    }

    else if (document.getElementById('0').type === 'radio') {
        for (let index = 0; index <= 2; index++) {
            const answerType = (<HTMLInputElement>document.getElementById(index.toString()));

            if (answerType.checked === true) {
                collectedAnswers.push(answerType.value);
            }
        }
        return collectedAnswers;
    }
};

/**  */
export function markTheAnswers(quiz: Quiz, collectedAnswers: string[]){
    let question = quiz.questions[quiz.round];
    collectedAnswers.forEach(answer => {
        if (quiz.answeredCorrectly(question.correctAnswers, answer)) {
            let indexAnswer = question.answers.indexOf(answer);
            let coloredAnswer = document.getElementById("answer_"+indexAnswer.toString());
            coloredAnswer?.setAttribute("id", "right");
        }
        else {
            let indexAnswer = question.answers.indexOf(answer);
            let coloredAnswer = document.getElementById("answer_"+indexAnswer.toString());
            coloredAnswer?.setAttribute("id", "wrong");
        }
    });
};