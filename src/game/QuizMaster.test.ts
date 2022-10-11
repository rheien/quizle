import { Question, QuestionType } from "../questions/types";
import { QuizMaster } from "./QuizMaster";


describe('QuizMaster', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    describe('numberOfMissesAnswers()', () => {
        const question: Question = {
            question : "Was meint der Berliner mit 'Dit ist mir Wurscht wie Stulle!' nicht?",
            answers : [
                'Das ist meine Wurst mit Stulle!',
                'Es ist Wurst mit Stulle',
                'Es ist mir egal!',
                'Wir müssen Wurst wie Stulle kaufen!'
            ], 
            correctAnswers : ['Das ist meine Wurst mit Stulle!','Es ist Wurst mit Stulle','Wir müssen Wurst wie Stulle kaufen!'],
            type: QuestionType.MULTIPLE_CHOICE
        };

        it('should return 0 for wrong answers', () => {
            const correctAnswers: string[] = ['incorrect'];
            
            const quizMaster = new QuizMaster();
            const result = quizMaster.numberOfMissingAnswers(question, correctAnswers);

            expect(result).toEqual(0);
        });

        it('answered 1 correctly and should return the number of missing answers', () => {
            let partlyCorrect: string[] = question.correctAnswers.slice(0,1);

            const quizMaster = new QuizMaster();
            const result = quizMaster.numberOfMissingAnswers(question, partlyCorrect);

            let expectedMissingAnswers: number = question.correctAnswers.length - partlyCorrect.length;
            expect(result).toEqual(expectedMissingAnswers);
        });

        it('answered 2 correctly and should return the number of the missing answers', () => {
            let partlyCorrect: string[] = question.correctAnswers.slice(0,2);

            const quizMaster = new QuizMaster();
            const result = quizMaster.numberOfMissingAnswers(question, partlyCorrect);

            let expectedMissingAnswers: number = question.correctAnswers.length - partlyCorrect.length;
            expect(result).toEqual(expectedMissingAnswers);
        });
    });

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

        it('should score 0 when answer incorrectly', async () => {
            const quizMaster = new QuizMaster();
            const quiz = await quizMaster.newQuiz();

            const incorrectAnswers: string[] = ['incorrect answer'];

            quizMaster.handleQuizScore(incorrectAnswers);

            expect(quiz.score).toBe(0);
        });


        it('must score 1 when only one answer is correct', async () => {
            const quizMaster = new QuizMaster();
            const quiz = await quizMaster.newQuiz();
            
            quiz.round = Math.floor(Math.random() * quiz.questions.length);
            const correctAnswers = quiz.questions[quiz.round].correctAnswers;

            quizMaster.handleQuizScore(correctAnswers);

            expect(quiz.score).toBe(1);
        });

        it('should change the number of rounds to 1 after answering once', async () => {
            const quizMaster = new QuizMaster();
            const quiz = await quizMaster.newQuiz();
            
            const correctAnswers = ['null'];

            quizMaster.handleQuizScore(correctAnswers);

            expect(quiz.round).toBe(1);
        });
    });
});
