import { QuizHandler } from "./QuizHandler";

describe('QuizHandler', () => {
    it ('Check if correct answers are included in the given answers of the matching question', () => {
        const quizHandler = new QuizHandler();
        const correctAnswers: string[] = quizHandler.correctAnswers();
        const givenAnswers: string[] = quizHandler.givenAnswers();
        expect(correctAnswers).toEqual(expect.arrayContaining(givenAnswers));
    });

    it ('Check if ', () => {
        const quizHandler = new QuizHandler();
        const correctAnswers: string[] = quizHandler.correctAnswers();
        const givenAnswers: string[] = quizHandler.givenAnswers();
        expect(correctAnswers).toEqual(expect.arrayContaining(givenAnswers));
    });
});