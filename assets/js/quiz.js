---
---

// Adapted from https://www.sitepoint.com/simple-javascript-quiz/ - WIP

(function(){
//https://michaelmovsesov.com/articles/get-key-with-highest-value-from-javascript-object
function getMaxValueKey(obj){
  return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
}

function buildQuiz(){
 // variable to store the HTML output
  const output = [];
 // current value, the index (the position number of the current item in the array),
 // and the array itself as parameters. We only need the current value and the index, which for our purposes, we’ll name currentQuestion and questionNumber respectively.
  myQuestions.forEach(
    (currentQuestion, questionNumber) => { // this is an ''arrow function''
	  // the code we want to run for each question goes here
      // variable to store the list of possible answers
      const answers = [];
      // and for each available answer...
      for(letter in currentQuestion.answers){
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }
      // add this question and its answers to the output
	  // Notice we’re using template literals, which are strings but more powerful. We’ll make use of the following features:
      //multi-line capabilities
      //no more having to escape quotes within quotes because template literals use backticks instead
     //string interpolation, so you can embed JavaScript expressions right into your strings like this: ${code_goes_here}.

      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );
  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}

function showResults(){
  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');
  // keep track of user's answers
  let scoreDict = {
    "1st": 0,
    "2nd": 0,
	"3rd": 0,
	"4th": 0,
	"5th": 0,
	"6th": 0,
    };
  // Must be a way to just return a particular object to place there, including images.
  // Plus this dict repeats itself but idk how to modify the code above to be a dict within dicts and not break it yet.
  let ansDict = {
    "1st": "You're a first type.",
    "2nd": "You're a second type.",
	"3rd": "You're a third type.",
	"4th": "You're a fourth type.",
	"5th": "You're a fifth type.",
	"6th": "You're a sixth type.",
  };
	// for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = answerMap[(answerContainer.querySelector(selector) || {}).value];
    
    scoreDict[userAnswer] = scoreDict[userAnswer]++;
  });
  
  let max_answer = getMaxValueKey(scoreDict);
  let answerString = ansDict[max_answer];
  resultsContainer.innerHTML = answerString;
}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

//Would be easier to have 1st to 6th types in order and then randomise the ANSWERS.
const myQuestions = [
  {
    question: "Pick a pet",
    answers: {
      a: "Snake",
      b: "Spider",
      c: "Eel",
      d: "Falcon",
      e: "Horse",
      f: "Houseplant",
    },
    answerMap: {a: "1st", b: "2nd"}
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm"
    },
    answerMap: {a: "1st", b: "2nd"}
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint"
    },
    answerMap: {a: "1st", b: "2nd"}
  }
];

buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);
})();