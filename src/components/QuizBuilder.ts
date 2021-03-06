import { multipleChoiceQuestions } from "../questions/multipleChoiceQuestions";
import { singleChoiceQuestions } from "../questions/singleChoiceQuestions";
import { textInputQuestions } from "../questions/textInputQuestions";
import { Question } from "../questions/types";
import { Quiz } from "./Quiz";
import { shuffleOrder } from "./shuffle";

/**
 * 
 * This class 'QuizBuilder' assemble a list of questions for a quiz.
 * At the end, a list of questions is returned unsorted.
 * 
 */
export class QuizBuilder {

    /** This method assemble a list of questions for the quiz */
    buildQuiz(): Quiz {
        const quiz: Quiz = new Quiz();
        let questions : Question[] = [];

        questions = questions.concat(this.poseQuestions(multipleChoiceQuestions));
        questions = questions.concat(this.poseQuestions(singleChoiceQuestions));
        questions = questions.concat(this.poseQuestions(textInputQuestions));

        quiz.questions = shuffleOrder(questions);
        return quiz;
    };

    /** This method pick two random questions for the question list
     *  and shuffle the order of the given answers
     */
    poseQuestions(typeOfAnswers: Question[]): Question[] {
        const picks: Question[] = [];
        for (let index = 0; index < 2; index++) {
            let pickNumber: number = this.randomNumber(typeOfAnswers);

            while (picks.includes(typeOfAnswers[pickNumber])) {
                pickNumber = this.randomNumber(typeOfAnswers);
            };

            typeOfAnswers[pickNumber].answers = shuffleOrder(typeOfAnswers[pickNumber].answers);
            picks.push(typeOfAnswers[pickNumber]);
        };
        return picks;
    }

    /** This method give a random number back */
    randomNumber(questions: Question[]): number {
        return Math.floor(Math.random() * questions.length)
    }
}