const questions = [
  {
    question: '¿Qué palabra clave se usa para declarar una variable que no cambia su valor?',
    answers: ['let', 'const', 'var', 'function'],
    correct: 'const',
  },
  {
    question: '¿Cuál es el resultado de 2 + 2 * 3 en JavaScript?',
    answers: ['12', '8', '10', '6'],
    correct: '8',
  },
  {
    question: '¿Cuál de estas opciones es una estructura de decisión?',
    answers: ['for', 'if', 'map', 'console.log'],
    correct: 'if',
  },
  {
    question: '¿Qué método se usa para mostrar texto en la consola?',
    answers: ['alert()', 'console.log()', 'document.write()', 'prompt()'],
    correct: 'console.log()',
  },
  {
    question: '¿Cuál es el operador para comparar igualdad estricta?',
    answers: ['=', '==', '===', '!=='],
    correct: '===',
  },
];

const questionText = document.querySelector('.question-text');
const answersContainer = document.getElementById('answers');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');

let currentIndex = 0;
let score = 0;
let answered = false;

function loadQuestion() {
  const current = questions[currentIndex];
  questionText.textContent = current.question;
  answersContainer.innerHTML = '';
  answered = false;

  current.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.className = 'answer-btn';
    button.textContent = answer;
    button.type = 'button';
    button.addEventListener('click', () => selectAnswer(button, answer));
    answersContainer.appendChild(button);
  });
}

function selectAnswer(button, answer) {
  if (answered) return;
  answered = true;
  const current = questions[currentIndex];
  const correct = answer === current.correct;
  if (correct) {
    score += 10;
    button.classList.add('correct');
  } else {
    button.classList.add('wrong');
    const correctButton = Array.from(answersContainer.children).find(
      (btn) => btn.textContent === current.correct
    );
    if (correctButton) correctButton.classList.add('correct');
  }
  scoreEl.textContent = score;
}

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % questions.length;
  loadQuestion();
});

loadQuestion();
