import { QuizBuilder } from "./QuizBuilder";
import { Quiz } from "./Quiz";

describe('QuizBuilder', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('Quiz has 6 questions', async () => {
        const quizBuilder = new QuizBuilder();
        const quiz = await quizBuilder.buildQuiz();
        const quizGame = new Quiz();
        const maxRound = quizGame.maxRound;

        expect(quiz.questions).toHaveLength(maxRound)
    });

    it('Quiz has random questions', async () => {
        const quizBuilder = new QuizBuilder();
        const quiz = await quizBuilder.buildQuiz();
        const quiz2 = await quizBuilder.buildQuiz();

        expect(quiz.questions).not.toEqual(quiz2.questions);
    });

    it('Quiz has no duplicate questions', async () => {
        const quizBuilder = new QuizBuilder();
        const quiz = await quizBuilder.buildQuiz();
        const uniqueQuestion = new Set(quiz.questions);

        expect(quiz.questions.length).toBe(uniqueQuestion.size);
    });
})