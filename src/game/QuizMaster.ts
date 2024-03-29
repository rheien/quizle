import { Question } from "../questions/types";
import { QuizBuilder } from "./QuizBuilder";
import { Quiz } from "./Quiz";

/**
 * 
 * This class 'QuizMaster' moderates the game. It draws the questions and the 
 * related answers. Compares the answers und saves the score.
 * 
 */
export class QuizMaster {

    private _quiz: Quiz;

    static _quiz: Quiz;

    get quiz(): Quiz {
        return this._quiz
    }

    async newQuiz(): Promise<Quiz> {
        const quizBuilder = new QuizBuilder();
        return this._quiz = await quizBuilder.buildQuiz();
    }

    /** change the number of rounds and manage the points */
    handleQuizScore(selectedAnswers: string[]) {
        if (QuizMaster.evaluateAnswers(this._quiz.questions[this._quiz.round], selectedAnswers)) {
            this._quiz.score++;

            let correctAnsweredQuestions: string[] = [];
            const retrieveAnsweredQuestions = localStorage.getItem("nonRepeatQuestions");
            if (retrieveAnsweredQuestions !== null) {
                correctAnsweredQuestions = JSON.parse(retrieveAnsweredQuestions);
            }
            let answeredQuestionsCorrectly = this._quiz.questions[this._quiz.round].question;
            correctAnsweredQuestions.push(answeredQuestionsCorrectly);
            localStorage.setItem("nonRepeatQuestions", JSON.stringify(correctAnsweredQuestions));
        }
        this._quiz.round++;
    };


    /** This method evaluate the answers with the correct answers */
    static evaluateAnswers(question: Question, selectedAnswers: string[]): boolean {
        let correctAnswers: string[] = question.correctAnswers;
        if (correctAnswers.length === selectedAnswers.length) {
            const checkAnswers = new Set();
            correctAnswers.forEach(answer => checkAnswers.add(answer.toLowerCase()));
            selectedAnswers.forEach(answer => checkAnswers.add(answer.toLowerCase()));

            return checkAnswers.size === correctAnswers.length;
        };
        return false;
    };

    /** This method returns a number of missing answers for multiple choice questions. */
    static numberOfMissingAnswers(question: Question, selectedAnswers: string[]): number {
        const correctAnswers: string[] = question.correctAnswers;
        let countingAnswers: number = 0;
        selectedAnswers.forEach(answer => {
            let result = correctAnswers.filter(correctAnswer => correctAnswer === answer);
            if (result.length) {
                countingAnswers++;
            }
        });

        if (countingAnswers === 0) {
            return countingAnswers;
        }

        return correctAnswers.length - countingAnswers;
    };

    /**
     * Instead of comparing the points, the attempts to complete the quiz are counted
     */
    quizAttempts() {
        let attempts: number = 0;
        let quizAttempts = localStorage.getItem("quizAttempts");
        if (quizAttempts !== null) {
            console.log(JSON.parse(quizAttempts)[0])
            attempts = parseInt(JSON.parse(quizAttempts)[0]);
        }

        this._quiz.attempts = attempts++;
        localStorage.setItem("quizAttempts", JSON.stringify(this._quiz.attempts));

    }
}