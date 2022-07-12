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

    private readonly QUESTIONS_PER_TYPE = 2;

    /** This method assemble a list of questions for the quiz */
    buildQuiz(): Quiz {
        if(!this.enoughQuestionsLeft(multipleChoiceQuestions, singleChoiceQuestions, textInputQuestions)){
            throw new Error ('no more questions left');
        }
        
        let questions : Question[] = [];
        questions = questions.concat(this.poseQuestions(multipleChoiceQuestions));
        questions = questions.concat(this.poseQuestions(singleChoiceQuestions));
        questions = questions.concat(this.poseQuestions(textInputQuestions));
        
        const quiz: Quiz = new Quiz();
        quiz.questions = shuffleOrder(questions);
        return quiz;
    };


    enoughQuestionsLeft(...questions: Question[][]): boolean {
        const nonRepeatQuestions = localStorage.getItem('nonRepeatQuestions');
        if(nonRepeatQuestions !== null){
            const checkQuestions = new Set();
            const correctAnsweredQuestions: string[] = JSON.parse(nonRepeatQuestions);
            correctAnsweredQuestions.forEach(question => 
                checkQuestions.add(question));

            questions.forEach(questions => 
                questions.forEach(question => 
                    checkQuestions.add(question.question)));
            const quiz = new Quiz();
            return checkQuestions.size >= quiz.maxRound;
        }
        
        return true
    }

    /** This method pick two random questions for the question list
     *  and shuffle the order of the given answers
     */
    poseQuestions(questions: Question[]): Question[] {
        const picks: Question[] = [];

        for (let index = 0; index < this.QUESTIONS_PER_TYPE; index++) {
            let pickNumber: number = this.randomNumber(questions.length);

            //when question appears twice or has already been answered correctly
            while (this.hasBeenPicked(picks,questions[pickNumber]) || this.hasBeenAnswered(questions[pickNumber])){
                pickNumber = this.randomNumber(questions.length);
            };

            const pick = questions[pickNumber];
            pick.answers = shuffleOrder(pick.answers);
            picks.push(pick);
        };
        return picks;
    }

    hasBeenPicked(picks: Question[], newPick: Question): boolean{
        return picks.find(question => question.question === newPick.question) !== undefined
    }

    hasBeenAnswered(newPick: Question): boolean{
        const nonRepeatQuestions = localStorage.getItem('nonRepeatQuestions');
        let answeredQuestions: string[] = [];
        if(nonRepeatQuestions !== null){
            answeredQuestions = JSON.parse(nonRepeatQuestions) as string[];
        }

        return answeredQuestions.includes(newPick.question)
    }

    /** This method give a random number back */
    randomNumber(max: number): number {
        return Math.floor(Math.random() * max)
    }
}