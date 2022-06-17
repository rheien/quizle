import { Question, QuestionType } from "./types";

export const multipleChoiceQuestions : Question[]= [
    
    {
        question : "Pi = 3,1415...",
        answers : [
            '92',
            '93',
            '94',
            '95'
        ], 
        correctAnswers : ['92'],
        type: QuestionType.MULTIPLE_CHOICE
    },

    {
        question : "Welche Automarken gehören nicht zu Volkswagen?",
        answers : [
            'SKODA',
            'OPEL',
            'PORSCHE',
            'FIAT'
        ], 
        correctAnswers : ['OPEL','FIAT'],
        type: QuestionType.MULTIPLE_CHOICE
    },

    {
        question : "Wo befindet sich Ei als Zusatzstoff?",
        answers : [
            'Bier',
            'Nougat',
            'Panaden',
            'Weizenbrot'
        ], 
        correctAnswers : ['Bier','Nougat','Panaden'],
        type: QuestionType.MULTIPLE_CHOICE
    },

    {
        question : "Was meint der Berliner mit 'Dit ist mir Wurscht wie Stulle!' nicht?",
        answers : [
            'Das ist meine Wurst mit Stulle!',
            'Es ist Wurst mit Stulle',
            'Es ist mir egal!',
            'Wir müssen Wurst wie Stulle kaufen!'
        ], 
        correctAnswers : ['Das ist meine Wurst mit Stulle!','Es ist Wurst mit Stulle','Wir müssen Wurst wie Stulle kaufen!'],
        type: QuestionType.MULTIPLE_CHOICE
    },

    {
        question : "Was versteht man in Sachsen unter 'Bemme'?",
        answers : [
            'sich beeilen',
            'Belegte Brotscheibe',
            'eine Beule im Auto',
            'Stulle'
        ], 
        correctAnswers : ['Belegte Brotscheibe','Stulle'],
        type: QuestionType.MULTIPLE_CHOICE
    },

    {
        question : "Wie lauten die Spitznamen von Ryan?",
        answers : [
            'Reiner',
            'Ryani',
            'Le Ruan',
            'Rhein'
        ], 
        correctAnswers : ['Reiner','Ryani','Le Rien','Rhein'],
        type: QuestionType.MULTIPLE_CHOICE
    },
];