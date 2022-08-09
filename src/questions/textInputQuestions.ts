import { Question, QuestionType } from "./types";
export const textInputQuestions : Question[] = [
    
    {
        question : "Wie lautet der Vorname von Frau Springer?",
        answers : ["Friede"],
        correctAnswers : ['Friede'],
        type: QuestionType.FREE_TEXT
    },

    {
        question : "Wie heißt die nicht frittierte Variante von der Frühlingsrolle?",
        answers : ["Sommerrolle"], 
        correctAnswers : ['Sommerrolle'],
        type: QuestionType.FREE_TEXT
    },

    {
        question : "In welcher Sportart nutzt man den 'Fadeaway'?",
        answers : ["Basketball"], 
        correctAnswers : ['Basketball'],
        type: QuestionType.FREE_TEXT
    },

    {
        question : "In welcher Stadt befindet sich die Goldelse?",
        answers : ["Berlin"], 
        correctAnswers : ['Berlin'],
        type: QuestionType.FREE_TEXT
    },

    {
        question : "Wie heißt die eSport News App von Upday?",
        answers : ["Jaxon"], 
        correctAnswers : ['Jaxon'],
        type: QuestionType.FREE_TEXT
    },

    {
        question : "In welchem jahr entstand der Axel Springer Neubau?",
        answers : ["2020"], 
        correctAnswers : ['2020'],
        type: QuestionType.FREE_TEXT
    },

    {
        question : "Wie lautet die Antwort von dem Supercomputer Deep Thought?",
        answers : ["42"], 
        correctAnswers : ['42'],
        type: QuestionType.FREE_TEXT
    },

    {
        question : "Wie lautet die Dezimalzahl 42 in Binär?",
        answers : ["101010"], 
        correctAnswers : ['101010'],
        type: QuestionType.FREE_TEXT
    },

    {
        question : "Wie lautet die Dezimalzahl 42 in Hexadezimal?",
        answers : ["2A"], 
        correctAnswers : ['2A'],
        type: QuestionType.FREE_TEXT
    },

    {
        question : "Wie lautet die Dezimalzahl 42 in Oktal?",
        answers : ["52"], 
        correctAnswers : ['52'],
        type: QuestionType.FREE_TEXT
    },
];