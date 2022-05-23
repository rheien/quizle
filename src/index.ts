import {multipleChoiceQuestions} from "./Questions/multipleChoiceQuestions.js";
 import {singleChoiceQuestions} from "./Questions/singleChoiceQuestions.js";
 import {textInputQuestions} from "./Questions/textInputQuestions.js";


 let b = multipleChoiceQuestions;
 let c = singleChoiceQuestions;
 let d= textInputQuestions;

 const button = document.querySelector("#start")
 button.addEventListener("click",buildQuizPage);

 function buildQuizPage() {
     let body = document.body;
     body.removeChild(body.children[1])
     body.removeChild(body.children[1])
     body.removeChild(body.children[1])

     let scoreBar = document.createElement('div');
     scoreBar.className = 'center bar';
     scoreBar.textContent = 'Number of answered questions:';


     let circleList = document.createElement('ul');
     let circle = document.createElement('li');
     circleList.appendChild(circle);
     scoreBar.appendChild(circleList);
     body.appendChild(scoreBar);

     let questionBox = document.createElement('div');
     questionBox.className = 'center container';
     body.appendChild(questionBox);
 };