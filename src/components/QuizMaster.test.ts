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

    
    describe('handleQuizScore()', () => {


        it('should score 0 when answer incorrectly', () => {
            const quizBuilder = new QuizBuilder();
            const quiz = quizBuilder.buildQuiz();
            const quizHandler = new QuizMaster();
            
            const roundNumber = Math.floor(Math.random() * quiz.questions.length);

            const incorrectAnswers: string[] = ['incorrect answer'];

            quizHandler.handleQuizScore(quiz, roundNumber, incorrectAnswers);

            expect(quiz.score).toBe(0);
        });


        it('should score 1 when answer correctly', () => {
            const quizBuilder = new QuizBuilder();
            const quiz = quizBuilder.buildQuiz();
            const quizHandler = new QuizMaster();
            
            const roundNumber = Math.floor(Math.random() * quiz.questions.length);
            const correctAnswers = quiz.questions[roundNumber].correctAnswers;

            quizHandler.handleQuizScore(quiz, roundNumber, correctAnswers);

            expect(quiz.score).toBe(1);
        });
    });
});
