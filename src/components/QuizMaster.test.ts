import { Question, QuestionType } from "../questions/types";
import { QuizMaster } from "./QuizMaster";


describe('QuizMaster', () => {
    describe('evaluateAnswer()', () => {
        it('evaluateAnswers should return true for one correct Answer', () => {
            const quizMaster = new QuizMaster();
            const question: Question = {
                question: "Pi = 3,1415...",
                answers: [
                    '92',
                    '93',
                    '94',
                    '95'
                ],
                correctAnswers: ['92'],
                type: QuestionType.MULTIPLE_CHOICE
            };
            const correctAnswers: string[] = question.correctAnswers;

            const result = quizMaster.evaluateAnswers(question, correctAnswers);

            expect(result).toBe(true);
        });

        it('evaluateAnswers should return true for two correct Answers', () => {
            const quizMaster = new QuizMaster();
            const question: Question = {
                question: "Welche Automarken gehören nicht zu Volkswagen?",
                answers: [
                    'SKODA',
                    'OPEL',
                    'PORSCHE',
                    'FIAT'
                ],
                correctAnswers: ['OPEL', 'FIAT'],
                type: QuestionType.MULTIPLE_CHOICE
            };
            const correctAnswers: string[] = question.correctAnswers;

            const result = quizMaster.evaluateAnswers(question, correctAnswers);

            expect(result).toBe(true);
        });

        it('evaluateAnswers should return false for the incorrect Answer', () => {
            const quizMaster = new QuizMaster();
            const question: Question = {
                question: "Pi = 3,1415...",
                answers: [
                    '92',
                    '93',
                    '94',
                    '95'
                ],
                correctAnswers: ['92'],
                type: QuestionType.MULTIPLE_CHOICE
            };
            const incorrectAnswers: string[] = ['incorrect answer'];

            const result = quizMaster.evaluateAnswers(question, incorrectAnswers);

            expect(result).toBe(false);
        });
    });

    
    describe('handleQuizScore()', () => {


        it('should score 0 when answer incorrectly', () => {
            const quizMaster = new QuizMaster();
            const quiz = quizMaster.newQuiz();

            const incorrectAnswers: string[] = ['incorrect answer'];

            quizMaster.handleQuizScore(quiz,  incorrectAnswers);

            expect(quiz.score).toBe(0);
        });


        it('must score 1 when only one answer is correct', () => {
            const quizMaster = new QuizMaster();
            const quiz = quizMaster.newQuiz();
            
            quiz.round = Math.floor(Math.random() * quiz.questions.length);
            const correctAnswers = quiz.questions[quiz.round].correctAnswers;

            quizMaster.handleQuizScore(quiz,  correctAnswers);

            expect(quiz.score).toBe(1);
        });

        it('should change the number of rounds to 1 after answering once', () => {
            const quizMaster = new QuizMaster();
            const quiz = quizMaster.newQuiz();
            
            const correctAnswers = ['null'];

            quizMaster.handleQuizScore(quiz,  correctAnswers);

            expect(quiz.round).toBe(1);
        });
    });
});
