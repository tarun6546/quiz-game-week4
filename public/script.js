
let questions,
  current = 0,
  score = 0,
  selected;

fetch("/questions")
  .then((r) => r.json())
  .then((q) => {
    questions = q;
    document.getElementById("total").textContent = questions.length;
    showQuestion();
  });

function showQuestion() {
  const q = questions[current];
  document.getElementById("question").textContent = q.question;
  document.getElementById("options").innerHTML = q.options
    .map((opt, i) => `<div class="option" onclick="select(${i})">${opt}</div>`)
    .join("");
}

function select(i) {
  document
    .querySelectorAll(".option")
    .forEach((opt) => opt.classList.remove("selected"));
  document.querySelectorAll(".option")[i].classList.add("selected");
  selected = i;
}

function submit() {
  if (selected === undefined) return;

  const currentQ = questions[current];
  if (currentQ.options[selected] === currentQ.answer) {
    score++;
    document.getElementById("score").textContent = score;
  }

  selected = undefined;
  current++;

  if (current < questions.length) {
    showQuestion();
  } else {
    alert(`Quiz complete! Final score: ${score}/${questions.length}`);
    current = 0;
    score = 0;
    document.getElementById("score").textContent = "0";
    showQuestion();
  }
}
