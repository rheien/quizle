import { Quiz } from "../game/Quiz";
import { QuizMaster } from "../game/QuizMaster";
import { Question, QuestionType } from "../questions/types";
import { AddButton } from "./AddButton";

export class Answer {

    /* This method collect the answers for QuizMaster */
    collectSelectedAnswers(question: Question): string[] {
        let collectedAnswers: string[] = [];
        
        if (question.type === QuestionType[QuestionType.FREE_TEXT].toString()) {
            const input = document.getElementById('0') as HTMLInputElement;
            if (this.hasAnswered(input)) {
                collectedAnswers.push(input.value);
            }
            return collectedAnswers;
        }

        else if (question.type === QuestionType[QuestionType.MULTIPLE_CHOICE].toString()) {
            for (let index = 0; index < question.answers.length; index++) {
                const answerType = document.getElementById(index.toString()) as HTMLInputElement;

                if (answerType.checked === true) {
                    collectedAnswers.push(answerType.value);
                }
            }
            return collectedAnswers;
        }

        else if (question.type === QuestionType[QuestionType.SINGLE_CHOICE].toString()) {
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
    colourScoreBar(quiz: Quiz, collectedAnswers: string[]) {
        let round = quiz.round;
        let question: Question = quiz.questions[round];
        let coloredScoreBar = document.getElementById("Question" + (round + 1).toString()) as HTMLSpanElement;

        if (QuizMaster.evaluateAnswers(question, collectedAnswers)) {
            coloredScoreBar.setAttribute("id", "circle_correct");
        }
        else {
            coloredScoreBar.setAttribute("id", "circle_wrong");
        }

    };

    /** Colour answers after evaluation */
    markTheAnswers(quiz: Quiz, collectedAnswers: string[]) {
        let round: number = quiz.round;
        let question: Question = quiz.questions[round];
        collectedAnswers.forEach(answer => {
            let indexAnswer = question.answers.indexOf(answer);
            let coloredAnswer = document.getElementById("answer_" + indexAnswer.toString()) as HTMLDivElement;

            if (quiz.answeredCorrectly(question.correctAnswers, answer)) {

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
        let quiz = quizMaster.quiz;
        let round: number = quiz.round;
        let questions: Question = quiz.questions[round];
        let collectedAnswers: string[] = this.collectSelectedAnswers(questions);

        const addButton = new AddButton();
        if (collectedAnswers.length !== 0) {
            addButton.hideButton('submit');
            addButton.hideButton('next');

            /* Highlight the selected answers and the circle in the score bar */
            this.markTheAnswers(quiz, collectedAnswers);
            this.colourScoreBar(quiz, collectedAnswers);

            this.noteForMultipleChoice(quiz, collectedAnswers);

            quizMaster.handleQuizScore(collectedAnswers);
        }
    };

    /** User get a note if some answers are missing */
    noteForMultipleChoice(quiz: Quiz, collectedAnswers: string[]) {
        let round: number = quiz.round;
        let questions: Question = quiz.questions[round];

        if (questions.type === QuestionType[QuestionType.MULTIPLE_CHOICE].toString()) {
            if (!QuizMaster.evaluateAnswers(questions, collectedAnswers)) {
                let numberOfMissingAnswers = QuizMaster.numberOfMissingAnswers(questions, collectedAnswers);
                
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