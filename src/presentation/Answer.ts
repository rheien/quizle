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

    /** Colour score bar after evaluation */
    colourScoreBar(quizMaster: QuizMaster, collectedAnswers: string[]) {
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

    /** Colour answers after evaluation */
    markTheAnswers(quizMaster: QuizMaster, collectedAnswers: string[]) {
        let round: number = quizMaster.quiz.round;
        let question: Question = quizMaster.quiz.questions[round];
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

    submitAnswer(quizMaster: QuizMaster) {
        let round: number = quizMaster.quiz.round;
        let questions: Question = quizMaster.quiz.questions[round];
        let collectedAnswers: string[] = this.collectSelectedAnswers(questions);

        const addButton = new AddButton();
        if (collectedAnswers.length !== 0) {
            addButton.hideButton('submit');
            addButton.hideButton('next');

            /* Highlight the selected answers and the circle in the score bar */
            this.markTheAnswers(quizMaster, collectedAnswers);
            this.colourScoreBar(quizMaster, collectedAnswers);

            this.noteForMultipleChoice(quizMaster, collectedAnswers);

            quizMaster.handleQuizScore(collectedAnswers);
        }
    };

    /** User get a note if some answers are missing */
    noteForMultipleChoice(quizMaster: QuizMaster, collectedAnswers: string[]) {
        let round: number = quizMaster.quiz.round;
        let questions: Question = quizMaster.quiz.questions[round];

        if (questions.type === QuestionType.MULTIPLE_CHOICE) {
            if (!quizMaster.evaluateAnswers(questions, collectedAnswers)) {
                let numberOfMissingAnswers = quizMaster.numberOfMissingAnswers(questions, collectedAnswers);
                
                /* get only a hint if more than one answer is needed */
                let givenAnswersLength = questions.answers.length;
                if (0 < numberOfMissingAnswers  && 1 < givenAnswersLength) {
                    let hintForMissingAnswers = document.getElementById("missingAnswers") as HTMLParagraphElement;
                    hintForMissingAnswers.textContent = numberOfMissingAnswers.toString() + ' answers missing';

                    const addButton = new AddButton();
                    addButton.showNote();
                    addButton.closeNote();
                }
            }
        }
    };
}