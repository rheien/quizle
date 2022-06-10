import { Question, QuizBuilder } from "./QuizBuilder";
import { QuizMaster } from "./QuizMaster";


describe('QuizMaster', () => {
    describe('evaluateAnswer()', () => {
        it('evaluateAnswers should return true for one correct Answer', () => {
            const quizHandler = new QuizMaster();
            const question: Question = {
                question: "Pi = 3,1415...",
                answers: [
                    '92',
                    '93',
                    '94',
                    '95'
                ],
                correctAnswers: ['92']
            };
            const correctAnswers: string[] = question.correctAnswers;

            const result = quizHandler.evaluateAnswers(question, correctAnswers);

            expect(result).toBe(true);
        });

        it('evaluateAnswers should return true for two correct Answers', () => {
            const quizHandler = new QuizMaster();
            const question: Question = {
                question: "Welche Automarken gehören nicht zu Volkswagen?",
                answers: [
                    'SKODA',
                    'OPEL',
                    'PORSCHE',
                    'FIAT'
                ],
                correctAnswers: ['OPEL', 'FIAT']
            };
            const correctAnswers: string[] = question.correctAnswers;

            const result = quizHandler.evaluateAnswers(question, correctAnswers);

            expect(result).toBe(true);
        });

        it('evaluateAnswers should return false for the incorrect Answer', () => {
            const quizHandler = new QuizMaster();
            const question: Question = {
                question: "Pi = 3,1415...",
                answers: [
                    '92',
                    '93',
                    '94',
                    '95'
                ],
                correctAnswers: ['92']
            };
            const incorrectAnswers: string[] = ['incorrect answer'];

            const result = quizHandler.evaluateAnswers(question, incorrectAnswers);

            expect(result).toBe(false);
        });
    });

    
    describe('handleQuiz()', () => {

        //selected answers is empty at the moment
        it('should answer all questions incorrectly', () => {
            const quizHandler = new QuizMaster();
            const quizGame = quizHandler.handleQuiz();
            const answering = 
            expect(quizGame.score).toBe(0);
        });

        //prepare correct selected answers
        it('should answer all questions correctly', () => {
            const quizHandler = new QuizMaster();
            const quizGame = quizHandler.handleQuiz();
            
            //expect(quizGame.score).toBe(6);
        });

        //prepare some correct selected answers
        it('should answer some questions correctly', () => {
            const quizHandler = new QuizMaster();
            const quizGame = quizHandler.handleQuiz();
            
            //expect(quizGame.score).toBe(4);
        });
    });
});
