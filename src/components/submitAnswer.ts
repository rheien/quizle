import { collectSelectedAnswers } from "./collectSelectedAnswers";
import { hideButton } from "./hideButton";
import { Quiz } from "./Quiz";
import { QuizMaster } from "./QuizMaster";

export function submitAnswer(quizMaster: QuizMaster, quiz: Quiz) {
    hideButton('submit');
    hideButton('next');

    let questions = quiz.questions[quiz.round];
    let collectedAnswers = collectSelectedAnswers(questions);
    quizMaster.handleQuizScore(quiz, collectedAnswers);
}
