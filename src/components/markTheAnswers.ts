import { Quiz } from "./Quiz";

/** set id for selected answers */
export function markTheAnswers(quiz: Quiz, collectedAnswers: string[]) {
    let question = quiz.questions[quiz.round];
    collectedAnswers.forEach(answer => {
        let indexAnswer = question.answers.indexOf(answer);
        let coloredAnswer = document.getElementById("answer_" + indexAnswer.toString());

        if (quiz.answeredCorrectly(question.correctAnswers, answer)) {
            coloredAnswer?.setAttribute("id", "correct");
            
            // in case of lower case answer in free text input
            if (indexAnswer === -1) {
                coloredAnswer = document.getElementById("answer_0");
                coloredAnswer?.setAttribute("id", "correct");
            }
        }
        else {
            coloredAnswer?.setAttribute("id", "wrong");
            
            if (indexAnswer === -1) {
                coloredAnswer = document.getElementById("answer_0");
                coloredAnswer?.setAttribute("id", "wrong");
            }
        }
    });
};