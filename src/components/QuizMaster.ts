import { Question, Quiz, QuizBuilder } from "./QuizBuilder";

/**
 * 
 * This class 'QuizMaster' moderates the game. It draws the questions and the 
 * related answers. Compares the answers und saves the score.
 * 
 */
export class QuizMaster {

    /** This method collect selected answers and
     * give points for correct answers.
    */
    handleQuiz(): Quiz{
        const quizBuilder = new QuizBuilder();
        const quiz : Quiz = quizBuilder.buildQuiz();
        let quizScore = quiz.score;
        let questionRound : number =0;
        while (questionRound < quiz.questions.length) {
            const questionCard = quiz.questions[questionRound];
            let selectedAnswers : string[] = [];
            if (this.evaluateAnswers(questionCard, selectedAnswers)){ 
                quizScore++;
            }
            questionRound++;
        }
        quiz.score = quizScore;
        return quiz;
    };

    /** This method collect the answers for QuizMaster */
    collectSelectedAnswers() : string[] {
        
        return 
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