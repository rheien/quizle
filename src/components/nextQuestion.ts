import { fillResult, fillTemplate } from "./fetchTemplate";
import { hideButton } from "./hideButton";
import { nextQuizRound } from "./nextQuizRound";
import { Quiz } from "./Quiz";

export function nextQuestion(quiz: Quiz) {

    if (quiz.hasReachedEnd()) {

        fillResult(quiz.score);
        hideButton('submit');
        nextQuizRound(quiz);
    }
    else {
        let questionCards = quiz.questions;
        fillTemplate(questionCards[quiz.round]);
    }

    hideButton('next');
    hideButton('submit');
};