import { Question, QuestionType } from "../questions/types";
import { QuizBuilder } from "./QuizBuilder";
import { Quiz } from "./Quiz";

describe('QuizBuilder', () => {
    beforeEach(() => {

        localStorage.clear();
    });


    it('Quiz has 6 questions', () => {
        const quizBuilder = new QuizBuilder();
        const quiz = quizBuilder.buildQuiz();
        const quizGame = new Quiz();
        const maxRound = quizGame.maxRound;

        expect(quiz.questions).toHaveLength(maxRound)
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

        describe('hasBeenPicked', () => {
            it('should check for duplicate questions', () => {

            });
        });

        describe('hasBeenAnswered', () => {

            it('should check the questions of textInputQuestions if question already answered correctly', () => {
                
                const nonRepeatQuestions = ["Wie lautet der Vorname von Frau Springer?",
                    "In welcher Sportart nutzt man den 'Fadeaway'?",
                    "In welcher Stadt befindet sich die Goldelse?",
                    "Wie heißt die eSport News App von Upday?"];
                localStorage.setItem("nonRepeatQuestions", JSON.stringify(nonRepeatQuestions));

                const textInputQuestions : Question[] = [
                    {
                        question: "Wie lautet der Vorname von Frau Springer?",
                        answers: ["Friede"],
                        correctAnswers: ['Friede'],
                        type: QuestionType.FREE_TEXT,
                        repeatQuestion: "yes"
                    },

                    {
                        question: "Wie heißt die nicht frittierte Variante von der Frühlingsrolle?",
                        answers: ["Sommerrolle"],
                        correctAnswers: ['Sommerrolle'],
                        type: QuestionType.FREE_TEXT,
                        repeatQuestion: "yes"
                    }
                ]

                const quizBuilder = new QuizBuilder();
                const alreadyAnswered = quizBuilder.hasBeenAnswered(textInputQuestions[0]);
                expect(alreadyAnswered).toBe(true);

                const shouldBePick = quizBuilder.hasBeenAnswered(textInputQuestions[1]);
                expect(shouldBePick).toBe(false);
            });
        });
    });

});
