import { textInputQuestions } from "../questions/textInputQuestions";
import { Question, QuestionType } from "../questions/types";
import { QuizBuilder } from "./QuizBuilder";
                
describe('QuizBuilder', () => {
    beforeEach(() =>{
       
        localStorage.clear();
    });
    
    
    it('Quiz has 6 questions', () => {
        const quizBuilder = new QuizBuilder();
        const quiz = quizBuilder.buildQuiz();

        expect(quiz.questions).toHaveLength(6)
    });

    it('Quiz has random questions', () => {
        const quizBuilder = new QuizBuilder();
        const quiz = quizBuilder.buildQuiz();
        const quiz2 = quizBuilder.buildQuiz();

        expect(quiz.questions).not.toEqual(quiz2.questions);
    });

    it('Quiz has no duplicate questions', () => {
        const quizBuilder = new QuizBuilder();
        const quiz = quizBuilder.buildQuiz();
        const uniqueQuestion = new Set(quiz.questions);

        expect(quiz.questions.length).toBe(uniqueQuestion.size);
    });


    describe('poseQuestions', () => {

        describe('hasBeenAnswered', () => {
            
            it('should check the questions of textInputQuestions if already answered correctly', () => {
                localStorage.clear();
                const nonRepeatQuestions = ["Wie lautet der Vorname von Frau Springer?",
                "In welcher Sportart nutzt man den 'Fadeaway'?",
                "In welcher Stadt befindet sich die Goldelse?",
                "Wie heißt die eSport News App von Upday?"];
                localStorage.setItem("nonRepeatQuestions", JSON.stringify(nonRepeatQuestions));

                const quizBuilder = new QuizBuilder();
                const alreadyAnswered = quizBuilder.hasBeenAnswered(textInputQuestions[0]);
                const shouldBePick = quizBuilder.hasBeenAnswered(textInputQuestions[1]);

                expect(alreadyAnswered).toBe(true);
                expect(shouldBePick).toBe(false);
            });
        });
    });

});
