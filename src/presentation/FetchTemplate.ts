import { Question, QuestionType } from "../questions/types";
import { compile } from "handlebars";
import { AddButton } from "./AddButton";
import { Quiz } from "../game/Quiz";

export class FetchTemplate {

    /* fetch templates to quiz page */
    fillTemplate(question: Question) {

        let questionTemplate: string = 'freeTextQuestion.hbs';
        let questionType = question.type;
        if (questionType === QuestionType.FREE_TEXT) {
            questionTemplate = 'freeTextQuestion.hbs';
        } else if (questionType === QuestionType.SINGLE_CHOICE) {
            questionTemplate = 'singleChoiceQuestion.hbs';
        } else if (questionType === QuestionType.MULTIPLE_CHOICE) {
            questionTemplate = 'multipleChoiceQuestion.hbs';
        }

        fetch(questionTemplate)
            .then(response => {
                if (!response.ok) {
                    throw new Error("no templates found");
                }
                return response.text();
            })
            .then(response => {
                let template = compile(response);
                let data = {
                    question: question.question,
                    answers: question.answers,
                };
                let filled = template(data);
                document.getElementById('questionContainer')!.innerHTML = filled;
            });
    };

    /**
     * after the quiz the result template will show up
     */
    fillResult(score: number) {
        fetch('quizResult.hbs')
            .then(response => {
                if (!response.ok) {
                    throw new Error("no templates found")
                }
                return response.text();
            })
            .then(response => {
                const template = compile(response);
                const filled = template(score);
                document.getElementById('questionContainer')!.innerHTML = filled;
            });
    };

    nextQuestion(quiz: Quiz) {
        const addButton = new AddButton();

        if (quiz.hasReachedEnd()) {

            this.fillResult(quiz.score);
            addButton.hideButton('submit');
            addButton.nextQuizRound();
        }
        else {
            let questionCards = quiz.questions;
            this.fillTemplate(questionCards[quiz.round]);
        }

        addButton.hideButton('next');
        addButton.hideButton('submit');
    };
}
