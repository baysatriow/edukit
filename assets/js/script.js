const questionDataBase = [
  {
    question: "Full form of HTML?",
    option1: "Hyper Text Markup Language",
    option2: "Hyperlinks and Text Markup Language",
    ans: "answer1_1",
  },
  {
    question: "Who is making the Web standards?",
    option1: "Microsoft",
    option2: "The World Wide Web Consortium",
    ans: "answer2_2",
  },
  {
    question: "Choose the correct HTML element for the largest heading:",
    option1: "<head>",
    option2: "<h1>",
    ans: "answer3_2",
  },
  {
    question: "What is the correct HTML for creating a hyperlink?",
    option1: '<a url="http://www.example.com">Example</a>',
    option2: '<a href="http://www.example.com">Example</a>',
    ans: "answer4_2",
  },
  {
    question: "What does CSS stand for?",
    option1: "Creative Style Sheets",
    option2: "Cascading Style Sheets",
    ans: "answer5_2",
  },
  
];

const questionContainer = document.getElementById("quizContainer");
const nextButton = document.getElementById("nextButton");
const usersAnswers = document.querySelectorAll(".answer");
const scoreArea = document.getElementById("ShowScore");

let questionIndex = 0;
let score = 0;

const loadQuestionSet = (index) => {
  const startIndex = index * 5;
  const endIndex = startIndex + 5;

  for (let i = startIndex; i < endIndex; i++) {
    if (i < questionDataBase.length) {
      const questionSet = questionDataBase[i];
      const questionSetElement = document.getElementsByClassName("questionSet")[i % 5];

      const question = questionSet.question;
      const option1 = questionSet.option1;
      const option2 = questionSet.option2;

      questionSetElement.style.display = "block";
      questionSetElement.querySelector("h2").innerText = question;
      questionSetElement.querySelector("label[id$='_1']").innerText = option1;
      questionSetElement.querySelector("label[id$='_2']").innerText = option2;
    } else {
      break;
    }
  }
};

const checkAnswer = () => {
  let selectedAnswer = null;

  usersAnswers.forEach((answer) => {
    if (answer.checked) {
      selectedAnswer = answer.id;
    }
  });

  return selectedAnswer;
};

const resetAnswers = () => {
  usersAnswers.forEach((answer) => {
    answer.checked = false;
  });
};

const calculateScore = (selectedAns) => {
  const correctAnswer = questionDataBase[questionIndex].ans;

  if (selectedAns === correctAnswer) {
    score += 20; // Adjust score based on the number of questions per set
  }
};

const showNextQuestionSet = () => {
  questionIndex += 5;

  if (questionIndex < questionDataBase.length) {
    loadQuestionSet(questionIndex / 5);
  } else {
    scoreArea.style.display = "block";
    scoreArea.innerHTML = `<h3>Your total score is: ${score} / 100</h3>`;
    nextButton.style.display = "none";
  }
};

nextButton.addEventListener("click", () => {
  const selectedAns = checkAnswer();

  if (selectedAns) {
    calculateScore(selectedAns);
    resetAnswers();
    showNextQuestionSet();
  } else {
    alert("Please select an answer before proceeding to the next set of questions.");
  }
});

// Load the first set of questions when the page loads
loadQuestionSet(0);
