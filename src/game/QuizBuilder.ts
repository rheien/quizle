import { Question } from "../questions/types";
import { Quiz } from "./Quiz";
import { shuffleOrder, randomNumber } from "./extraFeature";
import fetch from 'node-fetch';

/**
 * 
 * This class 'QuizBuilder' assemble a list of questions for a quiz.
 * At the end, a list of questions is returned unsorted.
 * 
 */
export class QuizBuilder {

    //static BASE_URL = "https://quizle-api-production.up.railway.app/api/v1/questions/"
    static BASE_URL = 'http://localhost:3000/api/v1/questions/';

    /** This method assemble a list of questions for the quiz */
    async buildQuiz(): Promise<Quiz> {
        const fetchQuestions = await fetch(QuizBuilder.BASE_URL);
        if (!fetchQuestions.ok) {
            throw new Error("no questions available")
        }

        let response = await fetchQuestions.json();

        let questions: Question[] = [];
        questions = questions.concat(response.questions);

        const quiz: Quiz = new Quiz();
        quiz.questions = shuffleOrder(questions);
        return new Promise<Quiz>(res => {
            res(quiz);
        });
    };
}