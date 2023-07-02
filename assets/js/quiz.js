// Adapted from https://www.sitepoint.com/simple-javascript-quiz/ - WIP

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
    1: 0,
    2: 0,
	3: 0,
	4: 0,
	5: 0,
	6: 0,
    };

  // Plus this dict repeats itself but idk how to modify the code above to be a dict within dicts and not break it yet.
  let ansDict = {
    1: `<img src = "/assets/img/1steyes.png"></img>
        You're a first type.`,
    2: `<img src = "/assets/img/2ndeyes.png"></img>
        You're a second type.`,
	3: `<img src = "/assets/img/3rdeyes.png"></img>
        You're a third type.`,
	4: "You're a fourth type.",
	5: "You're a fifth type.",
	6: "You're a sixth type.",
  };
	// for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    answerMapped = currentQuestion.answerMap[userAnswer]

    scoreDict[answerMapped] = scoreDict[answerMapped] + 1;
  });
  
  let max_answer = getMaxValueKey(scoreDict);
  
  let answerString = ansDict[max_answer];
  resultsContainer.innerHTML = scoreDict[1];
}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

//Would be easier to have 1st to 6th types in order and then randomise the ANSWERS.
const myQuestions = [
  {
    question: "Pick a pet:",
    answers: {
      a: "Something scaly",
      b: "Something with lots of legs",
      c: "Something that lives in water",
      d: "Something with feathers",
      e: "Something fluffy",
      f: "Houseplant.",
    },
    answerMap: {a: 2, b: 3, c: 5, d: 1, e: 4, f: 6}
  },
  {
    question: "Favourite season?",
    answers: {
      a: "Winter",
      b: "Spring",
      c: "Summer",
      d: "Autumn",
      e: "Monsoon",
      f: "Dry",
    },
    answerMap: {a: 2, b: 6, c: 1 , d: 4 , e: 5, f: 6}
  },
  {
    question: "If you could play any instrument:",
    answers: {
      a: "Woodwind",
      b: "Percussion",
      c: "Strings",
      d: "Bell choir",
      e: "Piano",
      f: "Brass",
    },
    answerMap: {a: 1, b: 3, c: 2, d: 5, e: 6, f: 4}
  }
];

buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);