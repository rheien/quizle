import { Question, Quiz, QuizBuilder } from "./QuizBuilder";


/**
 * 
 * This class 'QuizMaster' moderates the game. It draws the questions and the 
 * related answers. Compares the answers und saves the score.
 * 
 */
export class QuizMaster {
    

    handleQuiz(){
        const quiz : Quiz = this.handleQuizRound();
        const collectedAnswers : string[] = this.collectSelectedAnswers();
        //let currentQuestions = document.querySelector('question');
        
        this.handleQuizScore(quiz, quiz.round, collectedAnswers);
        quiz.round++;
        console.log(quiz.score)
    }

    handleQuizRound() : Quiz{

        const quizBuilder = new QuizBuilder();
        const quiz : Quiz = quizBuilder.buildQuiz();
        /*
        let question : Question[] = quiz.questions;
        //let currentQuestions : Question = question.shift();
        let posedQuestions : Question[]= [];
        //posedQuestions.push(currentQuestions);
        
        let selectedAnswers : string[]= []//this.collectSelectedAnswers();
        //this.handleQuiz(quiz, posedQuestions.length-1, selectedAnswers);
        
        */
        return quiz
    }


    handleQuizScore( quiz: Quiz, questionRound: number, selectedAnswers : string[]) {
        //let score = quiz.score;
        if (this.evaluateAnswers(quiz.questions[questionRound], selectedAnswers)){
            quiz.score++;
        }
        //quiz.score=score;
        //return quiz
    };

    /** This method collect the answers for QuizMaster */
    collectSelectedAnswers() : string[] {
        let collectedAnswers : string[]= [];
        let currentAnswerType = document.querySelector('input').type;
        if(currentAnswerType === 'text'){
            collectedAnswers.push((<HTMLInputElement>document.querySelector('input[type="text"]')).value);
            return collectedAnswers;
        } 
        else if (currentAnswerType === 'checkbox') {
            for(let index =1; index <= 4; index++){
                const answerType = (<HTMLInputElement>document.querySelector('input[id="'+index+'"]'));
                if (answerType.checked === true){
                    collectedAnswers.push(answerType.value);
                }
            }
            return collectedAnswers;
        } 
        else if (currentAnswerType === 'radio') {
            for(let index =1; index <= 3; index++){
                const answerType = (<HTMLInputElement>document.querySelector('input[id="'+index+'"]'));
                
                if (answerType.checked === true){
                    console.log(answerType.value)
                    collectedAnswers.push(answerType.value);
                }
            }
            return collectedAnswers;
        }
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