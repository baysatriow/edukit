const questionDataBase = [
  { question: "Anda merasa memiliki peluang belajar yang sama dengan teman-teman yang lain", option1: "Ya", option2: "Tidak", ans: "answer1_1" },
  { question: "Anda merasa semua siswa di sekolah mendapatkan kesempatan yang setara untuk sukses ", option1: "Ya", option2: "Tidak", ans: "answer2_1" },
  { question: "Anda selalu mencari solusi sendiri sebelum meminta bantuan dari guru", option1: "Ya", option2: "Tidak", ans: "answer3_1" },
  { question: "Anda senang ketika anda dapat menyelesaikan masalah secara mandiri", option1: "Ya", option2: "Tidak", ans: "answer4_1" },
  { question: "Anda merasa bahwa kebutuhan belajar anda diakui dan dihargai di sekolah", option1: "Ya", option2: "Tidak", ans: "answer5_1" },
  { question: "Anda merasa didukung untuk mengembangkan kemampuan anda secara individu di sekolah", option1: "Ya", option2: "Tidak", ans: "answer6_1" },
  { question: "Anda merasa termotivasi untuk mencapai harapan yang tinggi karena dukungan dari guru anda", option1: "Ya", option2: "Tidak", ans: "answer7_1" },
  { question: "Anda merasa dihargai ketika anda berusaha keras untuk mencapai hasil yang baik disekolah", option1: "Ya", option2: "Tidak", ans: "answer8_1" },
  { question: "Anda merasa nyaman bertanya kepada guru saat tidak mengerti sesuatu", option1: "Ya", option2: "Tidak", ans: "answer9_1" },
  { question: "Anda merasa bahwa feedback/ umpan balik dari guru dapat membantu anda dalam meningkatkan kinerja akademik anda", option1: "Ya", option2: "Tidak", ans: "answer10_1" },
  { question: "Anda merasa nyaman berbicara dengan guru anda tentang kehidupan pribadi ", option1: "Ya", option2: "Tidak", ans: "answer11_1" },
  { question: "Anda pernah berbicara dengan guru anda tentang tujuan atau impian masa depan ", option1: "Ya", option2: "Tidak", ans: "answer12_1" },
  { question: "Anda merasa guru anda menghargai proses belajar anda meskipun hasilnya tidak sempurna", option1: "Ya", option2: "Tidak", ans: "answer13_1" },
  { question: "Guru anda lebih fokus pada bagaimana anda belajar daripada hasil yang anda capai", option1: "Ya", option2: "Tidak", ans: "answer14_1" },
  { question: "Anda merasa kesalahan merupakan sebuah kesempatan untuk belajar, bukan sebagai kegagalan", option1: "Ya", option2: "Tidak", ans: "answer15_1" },
  { question: "Anda merasa bahwa masalah dapat mendorong anda untuk mencoba menemukan jalan keluarnya", option1: "Ya", option2: "Tidak", ans: "answer16_1" },
  { question: "Guru anda pernah mengatakan bahwa membuat kesalahan merupakan proses belajar", option1: "Ya", option2: "Tidak", ans: "answer17_1" },
  { question: "Anda merasa bahwa penerapan empati dalam konteks pendidikan itu penting", option1: "Ya", option2: "Tidak", ans: "answer18_1" },
  { question: "Anda sering bekerja dalam kelompok untuk menyelesaikan tugas atau proyek", option1: "Ya", option2: "Tidak", ans: "answer19_1" },
  { question: "Anda merasa bahwa ketika anda ditempatkan dalam situasi kelompok, setiap anggota kelompoknya memiliki tanggung jawab yang sama terhadap tujuan kelompok", option1: "Ya", option2: "Tidak", ans: "answer20_1" }
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
    retryButton.style.display = "block";
  }
};






nextButton.addEventListener("click", () => {
  const selectedAnswers = checkAnswer();
  if (selectedAnswers.length === 5) {
    calculateScore(selectedAnswers);
    resetAnswers();
    showNextQuestionSet();
  } else {
    alert("Jawab Terlebih Dahulu Semua Pertanyaan yang ada!");
  }
});

// Load the first set of questions when the page loads
loadQuestionSet(0);
