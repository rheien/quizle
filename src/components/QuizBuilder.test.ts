import * as assert from "assert";
import { QuizBuilder } from "./QuizBuilder";


describe('QuizBuilder', () => {
    it ('Quiz has 6 questions', () => {
        const quizBuilder = new QuizBuilder();
        const quiz = quizBuilder.buildQuiz();
        assert.equal(quiz.questions.length, 6 );
    });
});

/**
 * Quiz ist zusammengestellt
 * bestehend aus 6 Fragen
 * 
 * 
 * Fragen sind zufällig
 */