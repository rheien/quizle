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

    newQuiz(): Quiz {

        const quizBuilder = new QuizBuilder();
        const quiz: Quiz = quizBuilder.buildQuiz();

        return quiz
    }

    /** change the number of rounds and manage the points */
    handleQuizScore(quiz: Quiz, selectedAnswers: string[]) {
        if (this.evaluateAnswers(quiz.questions[quiz.round], selectedAnswers)) {
            quiz.score++;
        }
        quiz.round++;
    };


    /** This method evaluate the answers with the correct answers */
    evaluateAnswers(question: Question, selectedAnswers: string[]): boolean {
        let correctAnswers: string[] = question.correctAnswers;
        if (correctAnswers.length === selectedAnswers.length) {
            const checkAnswers = new Set();
            correctAnswers.forEach(answer => checkAnswers.add(answer.toLowerCase()));
            selectedAnswers.forEach(answer => checkAnswers.add(answer.toLowerCase()));

            return checkAnswers.size === correctAnswers.length;
        };
        return false;
    };
}