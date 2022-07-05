import { fill_result, fill_template } from "./fill_template";
import { hideButton } from "./hideButton";
import { nextQuizRound } from "./nextQuizRound";
import { Quiz } from "./Quiz";

export function nextQuestion(quiz: Quiz) {
    hideButton('next');
    hideButton('submit');

    if (quiz.hasReachedEnd()) {

        fill_result(quiz.score);
        hideButton('submit');
        nextQuizRound(quiz);
    }
    else {
        let questionCards = quiz.questions;

        fill_template(questionCards[quiz.round]);
    }
}
