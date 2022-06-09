import { multipleChoiceQuestions } from "../questions/multipleChoiceQuestions";
import { singleChoiceQuestions } from "../questions/singleChoiceQuestions";
import { textInputQuestions } from "../questions/textInputQuestions";

export interface Question {
    question: string;
    answers: string[];
    correctAnswers: string[];
};

class Quiz {
    questions: Question[] = [];
    score: number = 0;
};

export class QuizBuilder {
    buildQuiz(): Quiz {
        const quiz: Quiz = new Quiz();
        let questions = [];

        questions = questions.concat(this.poseQuestion(multipleChoiceQuestions));
        questions = questions.concat(this.poseQuestion(singleChoiceQuestions));
        questions = questions.concat(this.poseQuestion(textInputQuestions));
        
        quiz.questions = this.shuffleQuestionsOrder(questions);
        return quiz;
    };

    /* pick questions for the quiz */
    poseQuestion(typeOfAnswers: Question[]) : Question[]{
        const picks : Question[] = [];
        for (let index = 0; index < 2; index++) {
            let pickNumber: number = this.randomPickQuestion(typeOfAnswers);

            while(picks.includes(typeOfAnswers[pickNumber]) ){
                pickNumber = this.randomPickQuestion(typeOfAnswers);
            }

            picks.push(typeOfAnswers[pickNumber]);
        }
        return picks;
    }

    /* get random number for picking a question */
    randomPickQuestion(questions: Question[]) : number{
        return Math.floor(Math.random() * questions.length)
    }

    /* shuffle function */
    shuffleQuestionsOrder(array : any[]) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
}