import { QuizMaster } from "../game/QuizMaster";
import { Question, QuestionType } from "../questions/types";
import { AddButton } from "./AddButton";

export class Answer {

    /* This method collect the answers for QuizMaster */
    collectSelectedAnswers(question: Question): string[] {
        let collectedAnswers: string[] = [];

        if (question.type === QuestionType.FREE_TEXT) {
            const input = document.getElementById('0') as HTMLInputElement;
            if (this.hasAnswered(input)) {
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

    hasAnswered(input: HTMLInputElement): boolean {
        return input.value.length !== 0
    };

    coloursScoreBar(quizMaster: QuizMaster, collectedAnswers: string[]) {
        let round = quizMaster.quiz.round;
        let question: Question = quizMaster.quiz.questions[round];
        let coloredScoreBar = document.getElementById("Question" + (round + 1).toString()) as HTMLSpanElement;

        if (quizMaster.evaluateAnswers(question, collectedAnswers)) {
            coloredScoreBar.setAttribute("id", "circle_correct");
        }
        else {
            coloredScoreBar.setAttribute("id", "circle_wrong");
        }

    };

    marksTheAnswers(quizMaster: QuizMaster, collectedAnswers: string[]) {
        let question = quizMaster.quiz.questions[quizMaster.quiz.round];
        collectedAnswers.forEach(answer => {
            let indexAnswer = question.answers.indexOf(answer);
            let coloredAnswer = document.getElementById("answer_" + indexAnswer.toString()) as HTMLDivElement;

            if (quizMaster.quiz.answeredCorrectly(question.correctAnswers, answer)) {

                // in case of free text input by zero answer
                if (indexAnswer === -1) {
                    coloredAnswer = document.getElementById("answer_0") as HTMLDivElement;
                    coloredAnswer.setAttribute("id", "correct");
                }
                else {
                    coloredAnswer.setAttribute("id", "correct");
                }
            }
            else {
                if (indexAnswer === -1) {
                    coloredAnswer = document.getElementById("answer_0") as HTMLDivElement;
                    coloredAnswer.setAttribute("id", "wrong");
                }
                else {
                    coloredAnswer.setAttribute("id", "wrong");
                }
            }
        });
    };

    submitsAnswer(quizMaster: QuizMaster) {
        let questions = quizMaster.quiz.questions[quizMaster.quiz.round];
        let collectedAnswers = this.collectSelectedAnswers(questions);

        const addButton = new AddButton();
        if (collectedAnswers.length !== 0) {
            addButton.hideButton('submit');
            addButton.hideButton('next');

            /* Highlight the selected answers and the circle in the score bar */
            this.marksTheAnswers(quizMaster, collectedAnswers);
            this.coloursScoreBar(quizMaster, collectedAnswers);
            
            /* User get a note if some answers are missing */
            if (questions.type === QuestionType.MULTIPLE_CHOICE) {
                if (!quizMaster.evaluateAnswers(questions, collectedAnswers)) {
                    addButton.showNote();
                    addButton.closeNote();
                }
            }
            quizMaster.handleQuizScore(collectedAnswers);
        }
    };
}