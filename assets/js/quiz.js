// Adapted from https://www.sitepoint.com/simple-javascript-quiz/ - WIP
//TODO: Style radio buttons, buttons on click.
//TODO: Unspaghetti.

//https://michaelmovsesov.com/articles/get-key-with-highest-value-from-javascript-object
function getMaxValueKey(obj){
  return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
}

function buildQuiz(){
    i = 0;
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
      let output =
       `<div class="slide">
        <div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>
        </div>`;
      quizContainer.insertAdjacentHTML('beforeend', output);
      i++
    }
  );
  // finally combine our output list into one string of HTML and put it on the page
  let answersHeightSet = quizContainer.querySelectorAll('.answers')[i].height;
  quizContainer.style.height = answersHeight;
}

function showResults(){
  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');
  // keep track of user's answers
  let scoreDict = {
    "1": 0,
    "2": 0,
	"3": 0,
	"4": 0,
	"5": 0,
	"6": 0,
    "7": 0,
    "moil" : 0
    };

  // Plus this dict repeats itself but idk how to modify the code above to be a dict within dicts and not break it yet.
  let ansDict = {
    "1": `<img src = "/assets/img/1steyes.png"></img>
        You're a first type.`,
    "2": `<img src = "/assets/img/2ndeyes.png"></img>
        You're a second type.`,
	"3": `<img src = "/assets/img/3rdeyes.png"></img>
        You're a third type.`,
	"4": `<img src = "/assets/img/4theyes.png"></img>
        You're a fourth type.`,
	"5": `<img src = "/assets/img/5theyes.png"></img>
        You're a fifth type.`,
	"6": `You're a sixth type.`,
    "7": `You're ? ? ? ? ?`,
    "moil" : `You are moil - a mix of one or more types.`
  };
	// for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    answerMapped = currentQuestion.answerMap[userAnswer];
    scoreDict[answerMapped] = scoreDict[answerMapped] + 1;
    });
  
  let max_answer = getMaxValueKey(scoreDict);
  
  let answerString = ansDict[max_answer];
  resultsContainer.innerHTML = answerString;
}

function showSlide(n) {
  slides[currentSlide].classList.remove('active-slide');
  slides[n].classList.add('active-slide');
  currentSlide = n;
  if(currentSlide === 0){
    previousButton.style.display = 'none';
    nextButton.style.display = 'inline-block';
  }
  else{
    previousButton.style.display = 'inline-block';
  }
  if(currentSlide === slides.length-1){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  }
  else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

//Would be easier to have 1st to types in order and then randomise the ANSWERS.
const myQuestions = [
  {
    question: "Pick a pet:",
    answers: {
      a: "Something scaly",
      b: "Something with lots of legs",
      c: "Something that lives in water",
      d: "Something with feathers",
      e: "Something fluffy",
      f: "Houseplants is pets, right?",
      g: "I'm fine by myself"
    },
    answerMap: {a: "2", b: "3", c: "5", d: "1", e: "4", f: "6", g: "7"}
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
      g: "I don't go outside."
    },
    answerMap: {a: "2", b: "6", c: "1" , d: "4" , e: "5", f: "6", g: "7"}
  },
  {
    question: "If you could play (if you do, pick your favourite you can) any instrument:",
    answers: {
      a: "Woodwind",
      b: "Percussion",
      c: "Strings",
      d: "Modular synths",
      e: "Piano",
      f: "Brass",
      g: "Bell choir"
    },
    answerMap: {a: "1", b: "3", c: "2", d: "7", e: "6", f: "4", g: "5"}
  },
  {
    question: "If you were a JRPG character you would wield:",
    answers: {
      a: "Scythe or Sickle",
      b: "Bow and Arrows",
      c: "Knife or Dagger",
      d: "Spear or Javelin",
      e: "Trident or Harpoon",
      f: "Gun.",
      g: "I'm a lover, not a fighter"
    },
    answerMap: {a: "4", b: "1", c: "2", d: "3", e: "5", f: "7", g: "6"}
  },
    {
    question: "Feature wall in your dream bedroom:",
    answers: {
      a: "Blue",
      b: "Orange",
      c: "Green",
      d: "Yellow",
      e: "Red",
      f: "Purple",
      g: "Giant window"
    },
    answerMap: {a: "4", b: "1", c: "2", d: "3", e: "5", f: "6", g: "7"}
  },
  {
    question: "Activity outside of your house:",
    answers: {
      a: "Swimming in the sea, building sandcastles, or fishing",
      b: "Rock climbing, caving or mountain hiking",
      c: "Urbex, ghost hunting, or recreational trespassing in 'DO NOT ENTER'-ville",
      d: "Gardening, walks in the woods, or general grass-touching",
      e: "Paragliding, kite-flying, or cliff-diving",
      f: "Poi-spinning, barbecues, or smoking weed",
      g: "Hanging out with friends, making new friends, maybe board games",
      h: "Be gay, do crimes",
      i: "I told you, I don't go outside!"
    },
    answerMap: {a: "5", b: "3", c: "7", d: "6", e: "1", f: "4", g: "6", h: "2", i: "7"}
  },
    {
    question: "Activity inside your house:",
    answers: {
      a: "Dismantling and then re-mantling whatever I can get my hands on",
      b: "Cooking. This might be cakes, meals, potions or meth",
      c: "I draw the curtains. Maybe I despair, maybe I vibe",
      d: "Making music",
      e: "Reading, writing or drawing",
      f: "I take >1hr long baths at any opportunity",
      g: "Watching TV/livestreams/videos/arguing with strangers on the internet",
      h: "If not dragged out of the house I will sleep all day"
    },
    answerMap: {a: "6", b: "4", c: "2", d: "1", e: "6", f: "5", g: "7", h: "3"}
  }
];

buildQuiz();

//Pagination
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(currentSlide);

// Event listeners
previousButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
submitButton.addEventListener("click", showResults);