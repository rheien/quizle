import { Question, QuestionType } from "../questions/types";
import { QuizBuilder } from "./QuizBuilder";


describe('QuizBuilder', () => {
    it ('Quiz has 6 questions', () => {
        const quizBuilder = new QuizBuilder();
        const quiz = quizBuilder.buildQuiz();

        expect(quiz.questions).toHaveLength(6)
    });

    it ('Quiz has random questions', () => {
        const quizBuilder = new QuizBuilder();
        const quiz = quizBuilder.buildQuiz(); 
        const quiz2 = quizBuilder.buildQuiz();

        expect(quiz.questions).not.toEqual(quiz2.questions);
    });

    it ('Quiz has no duplicate questions', () => {
        const quizBuilder = new QuizBuilder();
        const quiz = quizBuilder.buildQuiz();
        const uniqueQuestion = new Set(quiz.questions);
        
        expect(quiz.questions.length).toBe(uniqueQuestion.size);
    });

    /*it ('Quiz has questions which have not yet been answered correctly', () => {
        const nonRepeatQuestions =["Wie lautet der Vorname von Frau Springer?"];
        sessionStorage.setItem("nonRepeatQuestions", JSON.stringify(nonRepeatQuestions));

        const quizBuilder = new QuizBuilder();
        const quiz = quizBuilder.buildQuiz();
        const quiz2 = quizBuilder.buildQuiz();
        const quiz3 = quizBuilder.buildQuiz();
        
        
        expect(quiz.questions).toEqual(expect.not.arrayContaining(nonRepeatQuestions));
    });*/
});