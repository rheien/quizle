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
            const pickedQuestion: Question[] = [
                {
                    question: "Wie lautet der Vorname von Frau Springer?",
                    answers: ["Friede"],
                    correctAnswers: ['Friede'],
                    type: QuestionType.FREE_TEXT
                }
            ];

            const newPick: Question = {
                question: "Wie heißt die nicht frittierte Variante von der Frühlingsrolle?",
                answers: ["Sommerrolle"],
                correctAnswers: ['Sommerrolle'],
                type: QuestionType.FREE_TEXT
            };

            it('should allow for a new question', () => {

                const quizBuilder = new QuizBuilder();

                const hasBeenPicked = quizBuilder.hasBeenPicked(pickedQuestion, newPick);
                expect(hasBeenPicked).toBe(false);

            });

            it('should not allow duplicate questions', () => {
                const quizBuilder = new QuizBuilder();

                const duplicatedPick = quizBuilder.hasBeenPicked(pickedQuestion, pickedQuestion[0]);
                expect(duplicatedPick).toBe(true);
            });
        });

        describe('hasBeenAnswered', () => {

            const sampleQuestion: Question =
            {
                question: "Wie lautet der Vorname von Frau Springer?",
                answers: ["Friede"],
                correctAnswers: ['Friede'],
                type: QuestionType.FREE_TEXT
            };

            it('should not allow to pick question cause already answered correctly', () => {

                const nonRepeatQuestions = [sampleQuestion.question];
                localStorage.setItem("nonRepeatQuestions", JSON.stringify(nonRepeatQuestions));

                const quizBuilder = new QuizBuilder();

                const alreadyAnswered = quizBuilder.hasBeenAnswered(sampleQuestion);
                expect(alreadyAnswered).toBe(true);
            });

            it('should allow to pick question not already answered correctly', () => {
                localStorage.clear();

                const quizBuilder = new QuizBuilder();

                const shouldBePick = quizBuilder.hasBeenAnswered(sampleQuestion);
                expect(shouldBePick).toBe(false);
            
            });
        });

    });
})