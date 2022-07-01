import { Question } from "../questions/types";

export class Quiz {
    questions: Question[] = [];
    score: number = 0;
    round: number = 0;
    maxRound: number = 6;

    hasReachedEnd(): boolean {
        return this.round === this.maxRound;
    };

    answeredCorrectly(correctAnswers: string[], answer: string): boolean {
        return correctAnswers.includes(answer);
    };
}
