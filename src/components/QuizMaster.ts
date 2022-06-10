import { Question, Quiz, QuizBuilder } from "./QuizBuilder";

/**
 * 
 * This class 'QuizHandler' moderates the game. It draws the questions and the 
 * related answers. Compares the answers und saves the score.
 * 
 */
export class QuizMaster {

    /*
    quizRound : number = 0;
    selectedAnswers : string[] = [];
    questionCard = this.questions.questions;
    score = this.questions.score;
    
    bla=this.questionCard.forEach(question =>
        this.evaluteAnswers(question, this.quizRound , this.selectedAnswers));
*/
    handleQuiz(): Quiz{
        const quiz = new QuizBuilder();
        const questions : Quiz = quiz.buildQuiz();

        let questionRound : number =0;
        while (questionRound < questions.questions.length) {
            const questionCard = questions.questions[questionRound];
            let question = questionCard.question;
            let givenAnswers = questionCard.answers;
            let correctAnswers = questionCard.correctAnswers;

            let quizScore = questions.score;
        }

        return
    };

    /** This method evaluate the answers with the correct answers */
    evaluteAnswers(question : Question, selectedAnswers: string[] ) : boolean {
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