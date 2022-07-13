import { Question, QuestionType } from "./types";
export const singleChoiceQuestions : Question[]= [
    
    {
        question : "Wie schreibt man",
        answers : [
             'Portemonnaie',
             'Portmonnaie',
             'Portemonaie'
        ], 
        correctAnswers : ['Portemonnaie'],
        type: QuestionType.SINGLE_CHOICE
    },

    {
        question : "Sich über eine ... aufregen.",
        answers : [
             'Lapallie',
             'Lapalie',
             'Lappalie'
        ],
        correctAnswers : ['Lappalie'],
        type: QuestionType.SINGLE_CHOICE
    },

    {
        question : "Die Lösung war",
        answers : [
            'dillettantisch',
            'dilletantisch',
            'dilettantisch'
        ], 
        correctAnswers : ['dilettantisch'],
        type: QuestionType.SINGLE_CHOICE
    },

    {
        question : "Andere Bedeutung für ohne geldliche Gegenleistung",
        answers : [
            'unentgeltlich',
            'unentgeldlich',
            'unendgeltlich'
        ], 
        correctAnswers : ['unentgeltlich'],
        type: QuestionType.SINGLE_CHOICE
    },

    {
        question : "ASIdeas haben ein sehr gutes",
        answers : [
            'Renomee',
            'Renommee',
            'Renomme'
        ], 
        correctAnswers : ['Renommee'],
        type: QuestionType.SINGLE_CHOICE
    },

    {
        question : "Wie hieß Ryan früher mal?",
        answers : [
            'Le Linh Tung',
            'Le Chinh Tuan',
            'Le Duc Anh'
        ], 
        correctAnswers : ['Le Duc Anh'],
        type: QuestionType.SINGLE_CHOICE
    },
];