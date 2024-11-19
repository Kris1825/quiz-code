// global declarations
const questions = [
  {
    question: "Which of these is not used to declare a variable in JavaScript?",
    answers: ["Const", "Let", "Var", "Dec"],
    correctAnswer: "Dec",
  },
  {
    question: "What is the name for the symbols ( ) ?",
    answers: [
      "Curly Brackets",
      "Angular Brackets",
      "Parentheses",
      "Open Brackets",
    ],
    correctAnswer: "Parentheses",
  },
  {
    question:
      "What attribute should be used to link a JavaScript file to an HTML file?",
    answers: ["src", "href", "link", "rel"],
    correctAnswer: "src",
  },
  {
    question: "What symbol is used to reference an ID in CSS?",
    answers: [".", "#", "/", "="],
    correctAnswer: "#",
  },
  {
    question: "Which of these is not a type of loop statement in JavaScript?",
    answers: ["For", "While", "Rotate", "Continue"],
    correctAnswer: "Rotate",
  },
];

let questionIndex = 0;

let timerValue = 12 * questions.length;

let answerStatus = "not selected";

let quizComplete = false;

const startBtn = document.getElementById("start-button");

const removeStart = document.getElementById("start-content");

const mainContent = document.getElementById("main-content");

// initialise local storage
const onLoad = () => {
  // check if highscores exists in LS
  const highScores = readFromLocalStorage();
  // if false then set highscores to empty array in LS
  if (!highScores) {
    localStorage.setItem("highscores", JSON.stringify([]));
  }
};

// getScores from local storage
const readFromLocalStorage = () => {
  // get from LS by key and parse
  const parsedData = JSON.parse(localStorage.getItem("highscores"));
  return parsedData;
};

const startTimer = () => {
  // declare function to execute every 1 sec
  const countdown = () => {
    //     decrement timer value
    timerValue -= 1;

    // timer.textContent = timerValue;
    // if quizComplete is true then stop timer
    if (quizComplete) {
      clearInterval(timerId);
    } else {
      const updateTimer = document.getElementById("timer-span");
      updateTimer.textContent = timerValue;
    }

    // check if timer reaches 0
    if (timerValue === 0) {
      // if true render game over
      clearInterval(timerId);
      document.getElementById("question-section").remove();
      renderRecordScoreSection();
    }
  };

  // setInterval of 1000ms (1s)
  const timerId = setInterval(countdown, 1000);
};

const renderTimerSection = () => {
  // use DOM tree as guide to build in JS
  const timerSection = document.createElement("section");
  timerSection.setAttribute("id", "timer-section");

  const timeRemaining = document.createElement("div");
  timeRemaining.textContent = "Time Remaining: ";

  const timerSpan = document.createElement("span");

  timerSpan.setAttribute("id", "timer-span");
  timerSpan.setAttribute("class", "span");
  timerSpan.textContent = timerValue;

  timeRemaining.appendChild(timerSpan);

  timerSection.append(timeRemaining);

  // append section to main
  mainContent.append(timerSection);
};

const renderQuestionSection = () => {
  // use DOM tree as guide to build in JS

  const questionSection = document.createElement("section");
  questionSection.setAttribute("class", "content");
  questionSection.setAttribute("id", "question-section");
  questionSection.setAttribute(
    "data-answer",
    questions[questionIndex].correctAnswer
  );

  // append section to main
  mainContent.append(questionSection);

  const questionContent = document.createElement("h2");

  questionContent.textContent = questions[questionIndex].question;

  const options = document.createElement("ul");
  options.setAttribute("id", "options");

  questionSection.append(questionContent, options);

  for (let i = 0; i < questions[questionIndex].answers.length; i += 1) {
    const answer = document.createElement("li");
    answer.setAttribute("data-option", questions[questionIndex].answers[i]);
    answer.textContent = questions[questionIndex].answers[i];

    options.appendChild(answer);
  }

  // add click event listener on #question-section
  questionSection.addEventListener("click", validateAnswer);
};

const validateAnswer = (event) => {
  event.stopPropagation();

  // get answer clicked from user
  const target = event.target;

  const answerSelected = target.getAttribute("data-option");

  // get the correct answer for question
  const currentTarget = event.currentTarget;

  const correctAnswer = currentTarget.getAttribute("data-answer");

  // compare the 2 answers
  if (answerSelected === correctAnswer) {
    //   if correct set status as so
    answerStatus = "Correct";
  } else {
    //   if incorrect set status as so
    answerStatus = "Incorrect";
    // TODO if incorrect subtract 5 seconds from timerValue
    timerValue -= 5;
  }

  renderAlert(answerStatus);

  // set timeout for 1s and then go to next question
  setTimeout(() => {
    document.getElementById("question-section").remove();

    if (questionIndex < questions.length - 1) {
      // if question is not last question then increment question index and render next question
      questionIndex += 1;

      renderQuestionSection();
    } else {
      // if question is last question set quizComplete to true and then render form
      quizComplete = true;
      renderRecordScoreSection();
    }
  }, 1000);
};

const renderAlert = (answerStatus) => {
  // use DOM tree as guide to build in JS
  const confirmResult = document.createElement("div");
  confirmResult.setAttribute("class", "confirm-result");
  if (answerStatus == "Correct") {
    // if correct render success alert with message and status
    confirmResult.setAttribute("id", "correct");
    confirmResult.textContent = `${answerStatus}...well done!`;
  } else {
    // if incorrect render error alert with message and status
    confirmResult.setAttribute("id", "incorrect");
    confirmResult.textContent = `${answerStatus}...more studying to do!`;
  }
  // append div to #question-section
  document.getElementById("question-section").append(confirmResult);
};

const renderRecordScoreSection = () => {
  // use DOM tree as guide to build in JS

  document.getElementById("timer-section").remove();

  const recordScoreSection = document.createElement("section");
  recordScoreSection.setAttribute("class", "content");
  recordScoreSection.setAttribute("id", "record-score-section");

  // append section to main
  mainContent.append(recordScoreSection);

  const form = document.createElement("form");
  form.setAttribute("id", "submit-score");

  recordScoreSection.append(form);

  const score = document.createElement("div");
  score.setAttribute("id", "score");
  score.textContent = "Game Over! Your score is: ";

  const scoreSpan = document.createElement("span");
  scoreSpan.setAttribute("class", "span");
  scoreSpan.setAttribute("id", "score-span");
  if (timerValue >= 0) {
    scoreSpan.textContent = timerValue;
  } else {
    scoreSpan.textContent = 0;
  }
  score.append(scoreSpan);

  const inputContainer = document.createElement("div");

  const input = document.createElement("input");
  input.setAttribute("id", "name-input");
  input.setAttribute("placeholder", "Enter your name here");

  inputContainer.appendChild(input);

  const buttonContainer = document.createElement("div");

  const scoreButton = document.createElement("button");
  scoreButton.setAttribute("class", "button");
  scoreButton.setAttribute("id", "score-button");
  scoreButton.setAttribute("type", "submit");
  scoreButton.textContent = "Submit Score";

  buttonContainer.appendChild(scoreButton);

  form.append(score, inputContainer, buttonContainer);

  // add submit event handler to form
  scoreButton.addEventListener("click", handleFormSubmit);
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  // get value from input
  const nameInput = document.getElementById("name-input").value;

  // if not empty then create the score object
  if (nameInput !== "") {
    const player = {
      userName: nameInput,
      score: timerValue,
    };

    const highScores = readFromLocalStorage();

    // push score object to LS
    highScores.push(player);

    // sort scores high to low
    highScores.sort((a, b) => b.score - a.score);

    writeToLocalStorage("highscores", highScores);

    // render high scores page
    renderHighScores();
  } else {
    // if empty then render error alert with message and status
    const confirmInput = document.createElement("div");
    confirmInput.setAttribute("class", "confirm-result");
    confirmInput.setAttribute("id", "incorrect");
    confirmInput.textContent = "Please enter your name.";

    const form = document.getElementById("submit-score");
    form.append(confirmInput);
  }
};

const writeToLocalStorage = (key, value) => {
  // stringify object value
  const stringifiedValue = JSON.stringify(value);
  //   set value for each key within LS
  localStorage.setItem(key, stringifiedValue);
};

const renderHighScores = () => {
  window.location = "highscores.html";
};

const startQuiz = () => {
  // remove start section
  removeStart.remove();

  // start timer
  startTimer();

  // render timer section
  renderTimerSection();

  // render question section
  renderQuestionSection();
};

// start button click event listener
startBtn.addEventListener("click", startQuiz);
// document on load event listener
window.addEventListener("load", onLoad);
