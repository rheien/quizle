export interface Question {
    question: string;
    answers: string[];
    correctAnswers: string[];
    type: QuestionType;
    replay: string;
};

export enum QuestionType {
    FREE_TEXT,
    SINGLE_CHOICE,
    MULTIPLE_CHOICE
}