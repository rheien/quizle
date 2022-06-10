import { Question, QuizBuilder } from "./QuizBuilder";
import { QuizMaster } from "./QuizMaster";


describe('QuizHandler', () => {
    it ('Check if correct answers are included in the given answers of the matching question', () => {
        /*const quizHandler = new QuizHandler();
        const correctAnswers: string[] = quizHandler.correctAnswers();
        const givenAnswers: string[] = quizHandler.givenAnswers();
        expect(correctAnswers).toEqual(expect.arrayContaining(givenAnswers));*/
    });

    it ('Check the correct evaluation', () => {
        const quizHandler = new QuizMaster();
        //const 
        //expect();
    });

    it('evaluateAnswers should return true for one correct Answer', () => {
        const quizHandler = new QuizMaster();
        const question : Question = {
            question : "Pi = 3,1415...",
            answers : [
                '92',
                '93',
                '94',
                '95'
            ], 
            correctAnswers : ['92']
        };
        const correctAnswers : string[] = question.correctAnswers;
        
        const result = quizHandler.evaluteAnswers(question,correctAnswers);
        
        expect(result).toBe(true);
    });

    it('evaluateAnswers should return true for two correct Answers', () => {
        const quizHandler = new QuizMaster();
        const question : Question = {
            question : "Welche Automarken gehören nicht zu Volkswagen?",
            answers : [
                'SKODA',
                'OPEL',
                'PORSCHE',
                'FIAT'
            ], 
            correctAnswers : ['OPEL','FIAT']
        };
        const correctAnswers : string[] = question.correctAnswers;
        
        const result = quizHandler.evaluteAnswers(question,correctAnswers);
        
        expect(result).toBe(true);
    });

    it('evaluateAnswers should return false for the incorrect Answer', () => {
        const quizHandler = new QuizMaster();
        const question : Question = {
            question : "Pi = 3,1415...",
            answers : [
                '92',
                '93',
                '94',
                '95'
            ], 
            correctAnswers : ['92']
        };
        const incorrectAnswers : string[] = ['incorrect answer'];
        
        const result = quizHandler.evaluteAnswers(question,incorrectAnswers);
        
        expect(result).toBe(false);
    });
});
