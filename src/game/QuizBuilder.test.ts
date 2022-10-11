import { Question, QuestionType } from "../questions/types";
import { QuizBuilder } from "./QuizBuilder";
import { Quiz } from "./Quiz";
import { multipleChoiceQuestions } from "../questions/multipleChoiceQuestions";
import { textInputQuestions } from "../questions/textInputQuestions";
import { singleChoiceQuestions } from "../questions/singleChoiceQuestions";

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

    describe('buildQuiz', () => {
        describe('enoughQuestionsLeft', () => {
            const questions: Question[][] = [
                multipleChoiceQuestions,
                singleChoiceQuestions,
                textInputQuestions
            ];

            describe('for multipleChoiceQuestions', () => {
                
                it('should allow to build a quiz since there are still enough questions left', () => {
                    
                    const pickedQuestions: string[] = multipleChoiceQuestions
                        .map(element => element.question)
                        .slice(0, multipleChoiceQuestions.length - QuizBuilder.QUESTIONS_PER_TYPE);
                    localStorage.setItem('nonRepeatQuestions', JSON.stringify(pickedQuestions));

                    const quizBuilder = new QuizBuilder();
                    const enoughQuestionsLeft = quizBuilder.enoughQuestionsLeft(...questions);

                    expect(enoughQuestionsLeft).toBe(true);
                });

                it('should be false since there are not enough questions left ', () => {
                    
                    const pickedQuestions: string[] = multipleChoiceQuestions
                        .map(element => element.question)
                        .slice(0, multipleChoiceQuestions.length - (QuizBuilder.QUESTIONS_PER_TYPE - 1));
                    localStorage.setItem('nonRepeatQuestions', JSON.stringify(pickedQuestions));

                    const quizBuilder = new QuizBuilder();
                    const quizable = quizBuilder.enoughQuestionsLeft(...questions);

                    expect(quizable).toBe(false);
                });
            });

            describe('for singleChoiceQuestions', () => {

                it('should allow to build a quiz since there are still enough questions left', () => {
                    
                    const pickedQuestions: string[] = singleChoiceQuestions
                        .map(element => element.question)
                        .slice(0, singleChoiceQuestions.length - QuizBuilder.QUESTIONS_PER_TYPE);
                    localStorage.setItem('nonRepeatQuestions', JSON.stringify(pickedQuestions));

                    const quizBuilder = new QuizBuilder();
                    const enoughQuestionsLeft = quizBuilder.enoughQuestionsLeft(...questions);

                    expect(enoughQuestionsLeft).toBe(true);
                });

                it('should be false since there are not enough questions left ', () => {
                    
                    const pickedQuestions: string[] = singleChoiceQuestions
                        .map(element => element.question)
                        .slice(0, singleChoiceQuestions.length - (QuizBuilder.QUESTIONS_PER_TYPE - 1));
                    localStorage.setItem('nonRepeatQuestions', JSON.stringify(pickedQuestions));

                    const quizBuilder = new QuizBuilder();
                    const quizable = quizBuilder.enoughQuestionsLeft(...questions);

                    expect(quizable).toBe(false);
                });
            });

            describe('for testInputQuestions', () => {
                
                it('should allow to build a quiz since there are still enough questions left', () => {
                    
                    const pickedQuestions: string[] = textInputQuestions
                        .map(element => element.question)
                        .slice(0, textInputQuestions.length - QuizBuilder.QUESTIONS_PER_TYPE);
                    localStorage.setItem('nonRepeatQuestions', JSON.stringify(pickedQuestions));

                    const quizBuilder = new QuizBuilder();
                    const enoughQuestionsLeft = quizBuilder.enoughQuestionsLeft(...questions);

                    expect(enoughQuestionsLeft).toBe(true);
                });

                it('should be false since there are not enough questions left ', () => {
                    
                    const pickedQuestions: string[] = textInputQuestions
                        .map(element => element.question)
                        .slice(0, textInputQuestions.length - (QuizBuilder.QUESTIONS_PER_TYPE - 1));
                    localStorage.setItem('nonRepeatQuestions', JSON.stringify(pickedQuestions));

                    const quizBuilder = new QuizBuilder();
                    const quizable = quizBuilder.enoughQuestionsLeft(...questions);

                    expect(quizable).toBe(false);
                });
            });
        });
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