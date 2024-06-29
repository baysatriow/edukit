const questionDataBase = [
  { question: "Testing aja?", option1: "Ya", option2: "Tidak", ans: "answer1_1" },
  { question: "Testing aja?", option1: "Ya", option2: "Tidak", ans: "answer2_1" },
  { question: "Testing aja?", option1: "Ya", option2: "Tidak", ans: "answer3_1" },
  { question: "Testing aja?", option1: "Ya", option2: "Tidak", ans: "answer4_1" },
  { question: "Testing aja?", option1: "Ya", option2: "Tidak", ans: "answer5_1" },
  { question: "Full form of JS?", option1: "Java Source", option2: "JavaScript", ans: "answer6_2" },
  { question: "Which company developed JavaScript?", option1: "Netscape", option2: "Microsoft", ans: "answer7_1" },
  { question: "What is the full form of DOM?", option1: "Document Object Model", option2: "Data Object Model", ans: "answer8_1" },
  { question: "Which tag is used to include CSS in HTML?", option1: "<style>", option2: "<script>", ans: "answer9_1" },
  { question: "Which symbol is used for comments in CSS?", option1: "/* */", option2: "//", ans: "answer10_1" },
  { question: "Which HTML attribute is used to define inline styles?", option1: "class", option2: "style", ans: "answer11_2" },
  { question: "What does JSON stand for?", option1: "JavaScript Object Notation", option2: "Java Source Object Notation", ans: "answer12_1" },
  { question: "Which HTML element is used to define the title of a document?", option1: "<title>", option2: "<head>", ans: "answer13_1" },
  { question: "Which property is used to change the background color in CSS?", option1: "color", option2: "background-color", ans: "answer14_2" },
  { question: "Which method is used to add an element at the end of an array in JavaScript?", option1: "push()", option2: "pop()", ans: "answer15_1" },
  { question: "Which HTML element is used for the largest heading?", option1: "<h1>", option2: "<h6>", ans: "answer16_1" },
  { question: "Which property is used to change the text color in CSS?", option1: "text-color", option2: "color", ans: "answer17_2" },
  { question: "Which method is used to remove the last element from an array in JavaScript?", option1: "pop()", option2: "shift()", ans: "answer18_1" },
  { question: "What does SQL stand for?", option1: "Structured Query Language", option2: "Simple Query Language", ans: "answer19_1" },
  { question: "Which attribute is used to specify the source file for an <img> element?", option1: "src", option2: "href", ans: "answer20_1" }
];

const questionContainer = document.getElementById("quizContainer");
const nextButton = document.getElementById("nextButton");
const scoreArea = document.getElementById("ShowScore");
let questionIndex = 0;
let score = 0;

const loadQuestionSet = (index) => {
  const startIndex = index * 5;
  for (let i = 0; i < 5; i++) {
    const questionSetElement = document.getElementsByClassName("questionSet")[i];
    const questionSet = questionDataBase[startIndex + i];
    if (questionSet) {
      questionSetElement.style.display = "block";
      questionSetElement.querySelector("h2").innerText = questionSet.question;
      questionSetElement.querySelector("label[id$='_1']").innerText = questionSet.option1;
      questionSetElement.querySelector("label[id$='_2']").innerText = questionSet.option2;
      questionSetElement.querySelector("input[id$='_1']").id = `answer${startIndex + i + 1}_1`;
      questionSetElement.querySelector("input[id$='_2']").id = `answer${startIndex + i + 1}_2`;
      questionSetElement.querySelector("input[id$='_1']").name = `option${startIndex + i + 1}`;
      questionSetElement.querySelector("input[id$='_2']").name = `option${startIndex + i + 1}`;
      questionSetElement.querySelector("label[id$='_1']").htmlFor = `answer${startIndex + i + 1}_1`;
      questionSetElement.querySelector("label[id$='_2']").htmlFor = `answer${startIndex + i + 1}_2`;
    } else {
      questionSetElement.style.display = "none";
    }
  }
};

const checkAnswer = () => {
  const selectedAnswers = document.querySelectorAll("input[type=radio]:checked");
  return Array.from(selectedAnswers).map(answer => answer.id);
};

const resetAnswers = () => {
  const answers = document.querySelectorAll("input[type=radio]");
  answers.forEach(answer => answer.checked = false);
};

const calculateScore = (selectedAnswers) => {
  const startIndex = questionIndex * 5;
  selectedAnswers.forEach(selectedAns => {
    const questionNumber = parseInt(selectedAns.match(/\d+/)[0]);
    const correctAnswer = questionDataBase[questionNumber - 1].ans;
    if (selectedAns === correctAnswer) {
      score += 5;
    }
  });
};

const showNextQuestionSet = () => {
  questionIndex++;
  if (questionIndex * 5 < questionDataBase.length) {
    loadQuestionSet(questionIndex);
  } else {
    document.getElementById("quizContainer").style.display = "none";
    document.getElementById("SubmitButton").style.display = "none";

    let isGrowthMindset = score >= 60;
    let isFixedMindset = score <= 40;
    let growthMindsetPercentage = isGrowthMindset ? score : (isFixedMindset ? 100 - score : 50);
    let fixedMindsetPercentage = 100 - growthMindsetPercentage;

    let growthMindsetBarColor = isGrowthMindset ? 'growth-mindset' : 'neutral';
    let fixedMindsetBarColor = isFixedMindset ? 'fixed-mindset' : 'neutral';

    let growthMindsetLabelColor = isGrowthMindset ? 'label-highlight' : '';
    let fixedMindsetLabelColor = isFixedMindset ? 'label-highlight' : '';

    let progressBar = `
      <div class="container mt-5">
        <div class="row align-items-center">
          <div class="col text-end">
            <span class="percentage ${fixedMindsetBarColor}">${fixedMindsetPercentage}%</span>
          </div>
          <div class="col-6">
            <div class="progress">
              <div class="progress-bar ${fixedMindsetBarColor}" role="progressbar" style="width: ${fixedMindsetPercentage}%; left: 0;" aria-valuenow="${fixedMindsetPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
              ${isGrowthMindset ? `<div class="progress-bar ${growthMindsetBarColor}" role="progressbar" style="width: ${growthMindsetPercentage}%; right: 0;" aria-valuenow="${growthMindsetPercentage}" aria-valuemin="0" aria-valuemax="100"></div>` : ''}
            </div>
          </div>
          <div class="col text-start">
            <span class="percentage ${growthMindsetBarColor}">${growthMindsetPercentage}%</span>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col text-end">
            <span class="label ${fixedMindsetLabelColor}">Fixed Mindset</span>
          </div>
          <div class="col-6 text-center"></div>
          <div class="col text-start">
            <span class="label ${growthMindsetLabelColor}">Growth Mindset</span>
          </div>
        </div>
      </div>`;

    scoreArea.style.display = "block";
    scoreArea.innerHTML = progressBar;
  }
};






nextButton.addEventListener("click", () => {
  const selectedAnswers = checkAnswer();
  if (selectedAnswers.length === 5) {
    calculateScore(selectedAnswers);
    resetAnswers();
    showNextQuestionSet();
  } else {
    alert("Tolong Jawab Pertanyaan saat ini!");
  }
});

// Load the first set of questions when the page loads
loadQuestionSet(0);
