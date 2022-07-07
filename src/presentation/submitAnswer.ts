import { collectSelectedAnswers } from "./collectSelectedAnswers";
import { hideButton } from "./hideButton";
import { markTheAnswers } from "./markTheAnswers";
import { Quiz } from "../game/Quiz";
import { QuizMaster } from "../game/QuizMaster";

export function submitAnswer(quizMaster: QuizMaster, quiz: Quiz) {
    
    let questions = quiz.questions[quiz.round];
    let collectedAnswers = collectSelectedAnswers(questions);
    if(collectedAnswers.length !== 0){
        hideButton('submit');
        hideButton('next');
        markTheAnswers(quiz,collectedAnswers);
        quizMaster.handleQuizScore(quiz, collectedAnswers);
    }
};