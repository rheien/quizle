import { multipleChoiceQuestions } from "../questions/multipleChoiceQuestions";
import { singleChoiceQuestions } from "../questions/singleChoiceQuestions";
import { textInputQuestions } from "../questions/textInputQuestions";
import { Question } from "../questions/types";
import { Quiz } from "./Quiz";
import { shuffleOrder, randomNumber } from "./extraFeature";

/**
 * 
 * This class 'QuizBuilder' assemble a list of questions for a quiz.
 * At the end, a list of questions is returned unsorted.
 * 
 */
export class QuizBuilder {

    //static BASE_URL = "https://quizle-api-production.up.railway.app/api/v1/questions/"
    static BASE_URL = 'http://localhost:3000/api/v1/questions/';

    static readonly QUESTIONS_PER_TYPE = 2;

    /** This method assemble a list of questions for the quiz */
    async buildQuiz(): Quiz {
        const fetchQuestions = await fetch(QuizBuilder.BASE_URL);
        if(!fetchQuestions.ok){
            throw new Error("no questions available")
        }
        let response = await fetchQuestions.json();

        let questions : Question[] = [];
        questions = await questions.concat(response.questions);

        const quiz: Quiz = new Quiz();
        quiz.questions = shuffleOrder(questions);
        console.log(quiz);
        return quiz;
    };

    /** 
     * This method checks if there are enough questions for the quiz game
    */
    enoughQuestionsLeft(...questions: Question[][]): boolean {
        const nonRepeatQuestions = localStorage.getItem('nonRepeatQuestions');
        if (nonRepeatQuestions === null) {
            return true
        }

        const correctAnsweredQuestions: string[] = JSON.parse(nonRepeatQuestions);
        let quizable: boolean = true;
        questions.some(questions => {
            let checkRepeatedQuestions: string[] = [];
            questions.forEach(question => {
                if (!correctAnsweredQuestions.includes(question.question)) {
                    checkRepeatedQuestions.push(question.question)
                }
            })
            if (checkRepeatedQuestions.length < QuizBuilder.QUESTIONS_PER_TYPE) {
                quizable = false;
            }
        });
        return quizable;
    }

    /** This method pick two random questions for the question list
     *  and shuffle the order of the given answers
     */
    poseQuestions(questions: Question[]): Question[] {
        const picks: Question[] = [];

        for (let index = 0; index < QuizBuilder.QUESTIONS_PER_TYPE; index++) {
            let pickNumber: number = randomNumber(questions.length);

            //when question appears twice or has already been answered correctly
            while (this.hasBeenPicked(picks, questions[pickNumber]) || this.hasBeenAnswered(questions[pickNumber])) {
                pickNumber = randomNumber(questions.length);
            };

            const pick = questions[pickNumber];
            pick.answers = shuffleOrder(pick.answers);
            picks.push(pick);
        };
        return picks;
    }

    hasBeenPicked(picks: Question[], newPick: Question): boolean {
        return picks.find(question => question.question === newPick.question) !== undefined
    }

    hasBeenAnswered(newPick: Question): boolean {
        const nonRepeatQuestions = localStorage.getItem('nonRepeatQuestions');
        let answeredQuestions: string[] = [];
        if (nonRepeatQuestions !== null) {
            answeredQuestions = JSON.parse(nonRepeatQuestions) as string[];
        }

        return answeredQuestions.includes(newPick.question)
    }
}