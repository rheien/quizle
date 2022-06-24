import { Question } from "../questions/types";
import { Quiz, QuizBuilder } from "./QuizBuilder";
import { collectSelectedAnswers } from "./buildQuizPage"

/**
 * 
 * This class 'QuizMaster' moderates the game. It draws the questions and the 
 * related answers. Compares the answers und saves the score.
 * 
 */
export class QuizMaster {
    /**Konzeptfluss
    game(){
    input des users holen ->    let selectedAnswers : string[] = collectSelectedAnswers();
    anrworten auswerten ->    this.handleQuizScore(quiz, quiz.round, selectedAnswers);
    next button für nächste frage
    }
*/
    game(){
        //let collectAnswers = collectSelectedAnswers();
        //this.handleQuizScore(this.newQuiz(),collectAnswers);
    }

    newQuiz() : Quiz{

        const quizBuilder = new QuizBuilder();
        const quiz : Quiz = quizBuilder.buildQuiz();
        
        return quiz
    }

    handleQuizScore( quiz: Quiz, selectedAnswers : string[]) {

        if (this.evaluateAnswers(quiz.questions[quiz.round], selectedAnswers)){
            quiz.score++;
            
        }
        quiz.round++;
    };


    /** This method evaluate the answers with the correct answers */
    evaluateAnswers(question : Question, selectedAnswers: string[] ) : boolean {
        let correctAnswers: string[] = question.correctAnswers;
        if(correctAnswers.length === selectedAnswers.length){
            const checkAnswers = new Set();
            correctAnswers.forEach(answer => checkAnswers.add(answer.toLowerCase()));
            selectedAnswers.forEach(answer => checkAnswers.add(answer.toLowerCase()));
            
            return checkAnswers.size === correctAnswers.length;
        };
        return false;
    };
}