import { Question, Quiz, QuizBuilder } from "./QuizBuilder";

/**
 * 
 * This class 'QuizHandler' moderates the game. 
 * 
 */
export class QuizHandler {
    quiz = new QuizBuilder();
    questions : Quiz = this.quiz.buildQuiz();

    quizRound : number = 0;
    selectedAnswers : string[] = [];
    questionCard = this.questions.questions;
    score = this.questions.score;
    bla=this.questionCard.forEach(question =>
        this.evaluteAnswers(question, this.quizRound , this.selectedAnswers));

    evaluteAnswers(questions : Question, round : number, selectedAnswer: string[] ) : number {

        let correctAnswers: string[] = questions[round].correctAnswers;
        if(){ 

        };
        
        return 1;
    };
}