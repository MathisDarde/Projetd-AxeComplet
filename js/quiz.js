const questions = [
  {
    question: "A quelle maison appartient Pomona Chourave ?",
    answers: [
      { text: "Gryffondor", correct: false },
      { text: "Serpentard", correct: false },
      { text: "Poufsouffle", correct: true },
      { text: "Serdaigle", correct: false },
    ],
  },
  {
    question: "Comment se nomme les parents des enfants Weasley ?",
    answers: [
      { text: "Arthur et Molly", correct: true },
      { text: "Arthur et Holly", correct: false },
      { text: "Albert et Holly", correct: false },
      { text: "Albert et Molly", correct: false },
    ],
  },
  {
    question: "De quel pays est originaire Viktor Krum ?",
    answers: [
      { text: "Bulgaria", correct: true },
      { text: "Russia", correct: false },
      { text: "Serbia", correct: false },
      { text: "Poland", correct: false },
    ],
  },
  {
    question: "Quel est le patronus d'Hermione Granger ?",
    answers: [
      { text: "Mouton", correct: false },
      { text: "Loutre", correct: true },
      { text: "Cerf", correct: false },
      { text: "Serpent", correct: false },
    ],
  },
  {
    question: "Qui succède à Dumbledore à la tête de Poudlard ?",
    answers: [
      { text: "Minerva McGonagall", correct: false },
      { text: "Severus Rogue", correct: true },
      { text: "Harry Potter", correct: false },
      { text: "Rubeus Hagrid", correct: false },
    ],
  },
  {
    question:
      "Qui a trahi les parents d'Harry Potter en les donnant à Voldemort ?",
    answers: [
      { text: "Severus Rogue", correct: false },
      { text: "Lucius Malfoy", correct: false },
      { text: "Peter Pettigrew", correct: true },
      { text: "Sirius Black", correct: false },
    ],
  },
  {
    question:
      "Combien de films de la série Harry Potter sont sortis au cinéma ?",
    answers: [
      { text: "7", correct: false },
      { text: "6", correct: false },
      { text: "5", correct: false },
      { text: "8", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Tu as réussi ${score} questions sur ${questions.length}!`;
  nextButton.innerHTML = "Relancer le quiz";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
