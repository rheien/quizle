import { Question } from "../questions/types";

export class Quiz {
    questions: Question[] = [];
    score: number = 0;
    round: number = 0;

    hasReachedEnd(): boolean {
        return this.round === 6;
    };

    answeredCorrectly(correctAnswers: string[], answer: string): boolean {
        return correctAnswers.includes(answer);
    };
}
