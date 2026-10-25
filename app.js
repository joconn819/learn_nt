const lessons = [
  {
    id: "factor", title: "Factor an integer", short: "Factoring", topic: "PRIMES & FACTORS", time: "4 MIN",
    lede: "Every integer greater than 1 has a unique prime factorization. Let Sagebrush do the arithmetic while you look for the structure.",
    question: "Find the prime factorization of <span class=\"math\">8051</span>. Which two primes multiply to make it?",
    idea: "The factor command returns each prime together with its exponent. A repeated factor would appear with an exponent greater than one.",
    hint: "In Sage mode, run <code>factor(8051)</code>. Read the output as a product: the number before each exponent is a prime factor.",
    code: "# Factor 8051 into primes\nfactor(8051)",
    notebook: "# FIELDNOTE 01 · FACTORING\n# Find the prime factorization of 8051.\n# Run this cell, then explain the factors in the field guide.\n\nfactor(8051)",
    answer: ["83*97", "83 97", "83,97", "97*83", "97 83", "97,83"], placeholder: "e.g. 83 * 97", success: "Yes: 8051 = 83 × 97. Both factors are prime.", progress: "One integer, split into its prime building blocks.", next: "Try a congruence"
  },
  {
    id: "crt", title: "Reconcile two clocks", short: "CRT", topic: "MODULAR ARITHMETIC", time: "5 MIN",
    lede: "A congruence describes a repeating pattern. The Chinese remainder theorem finds where two patterns line up.",
    question: "Find the least positive <span class=\"math\">x</span> with <span class=\"math\">x ≡ 2 (mod 9)</span> and <span class=\"math\">x ≡ 3 (mod 8)</span>.",
    idea: "Because 8 and 9 are coprime, the two repeating patterns meet once every 72 steps. The answer is unique modulo 72.",
    hint: "Try <code>crt(2, 3, 9, 8)</code>. Sagebrush returns a representative of the shared residue class.",
    code: "# Find a number in both residue classes\ncrt(2, 3, 9, 8)",
    notebook: "# FIELDNOTE 02 · THE CHINESE REMAINDER THEOREM\n# Find the least positive x satisfying both:\n#   x ≡ 2 (mod 9)\n#   x ≡ 3 (mod 8)\n# Use Sagebrush's crt command, then verify both remainders.\n\ncrt(2, 3, 9, 8)",
    answer: ["11", "11 mod 72", "11 (mod 72)"], placeholder: "least positive x", success: "Correct: 11 leaves remainders 2 and 3. All solutions are 11 modulo 72.", progress: "Two modular patterns meet in one residue class.", next: "Find a modular inverse"
  },
  {
    id: "inverse", title: "Undo multiplication mod n", short: "Inverses", topic: "MODULAR ARITHMETIC", time: "5 MIN",
    lede: "Modular inverses let us divide in a finite ring. An inverse exists exactly when the number is coprime to the modulus.",
    question: "What is the multiplicative inverse of <span class=\"math\">17 modulo 3120</span>? In other words, find <span class=\"math\">u</span> such that <span class=\"math\">17u ≡ 1 (mod 3120)</span>.",
    idea: "The extended Euclidean algorithm finds integers u and v with 17u + 3120v = gcd(17, 3120). Since the gcd is 1, u is an inverse.",
    hint: "Run <code>inverse_mod(17, 3120)</code>, then check <code>(17 * u) % 3120</code> is 1.",
    code: "# Compute the multiplicative inverse\nu = inverse_mod(17, 3120)\nu, (17 * u) % 3120",
    notebook: "# FIELDNOTE 03 · MODULAR INVERSES\n# Find u such that 17*u ≡ 1 (mod 3120).\n# Then verify the product really is 1 modulo 3120.\n\nu = inverse_mod(17, 3120)\nu, (17 * u) % 3120",
    answer: ["2753"], placeholder: "u = ?", success: "Exactly: 17 × 2753 = 46801 = 1 + 15 × 3120.", progress: "The Euclidean algorithm gives division back in modular arithmetic.", next: "Explore a number field"
  },
  {
    id: "class-number", title: "Count ideal classes", short: "Class groups", topic: "QUADRATIC FIELDS", time: "6 MIN",
    lede: "Unique factorization can fail for algebraic integers. The class group measures the failure; its size is the class number.",
    question: "For the quadratic field <span class=\"math\">ℚ(√−23)</span>, what is the class number? Use Sagebrush to construct the field and compute it.",
    idea: "A number field's class group records ideals up to principal equivalence. The class number h is the number of classes; for this field, h is small but not 1.",
    hint: "Try <code>K = QuadraticField(-23)</code>, then <code>K.class_number()</code>. You can inspect <code>K.discriminant()</code> too.",
    code: "# Build Q(sqrt(-23)) and inspect its class number\nK = QuadraticField(-23)\nK.discriminant(), K.class_number()",
    notebook: "# FIELDNOTE 04 · A QUADRATIC CLASS GROUP\n# Construct K = Q(sqrt(-23)).\n# Find its discriminant and class number.\n\nK = QuadraticField(-23)\nK.discriminant(), K.class_number()",
    answer: ["3"], placeholder: "class number h", success: "Right: h = 3. This field has three ideal classes, so its ring of integers is not a unique factorization domain.", progress: "A class group measures the gap between ideals and elements.", next: "Field guide complete"
  }
];

const storageKey = "nt-fieldnotes-progress-v1";
let completed = new Set();
try { completed = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]")); } catch {}
let current = 0;
const $ = (selector, root = document) => root.querySelector(selector);
const clean = (value) => value.toLowerCase().replace(/[\s*×,()]/g, "").replace(/\u2212/g, "-");
function notebookLink(code) {
  const data = JSON.stringify([
    { md: "# A Number Theory Fieldnote\n\nThis Sage-mode notebook runs in your browser with [Sagebrush](https://github.com/sagemathinc/sagebrush). Work through the prompt below, edit the code cell, and press **Shift+Enter** to run it." },
    code
  ]);
  const bytes = new TextEncoder().encode(data);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const encoded = btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return `https://sagebrush.space/#m=sage&c=${encoded}`;
}
function renderNav() {
  const list = $("#lesson-list");
  list.innerHTML = lessons.map((lesson, index) => `<li><button class="lesson-tab ${index === current ? "active" : ""} ${completed.has(lesson.id) ? "done" : ""}" data-index="${index}" type="button" aria-current="${index === current ? "step" : "false"}"><span class="lesson-number">${completed.has(lesson.id) ? "✓" : String(index + 1).padStart(2, "0")}</span><span class="tab-title">${lesson.short}</span>${completed.has(lesson.id) ? '<span class="tab-check" aria-hidden="true">●</span>' : ""}</button></li>`).join("");
  list.querySelectorAll(".lesson-tab").forEach(button => button.addEventListener("click", () => { current = Number(button.dataset.index); render(); }));
}
function renderProgress() {
  const count = completed.size;
  $("#top-progress").textContent = `${count} / ${lessons.length} solved`;
  $("#progress-fraction").textContent = `${count} / ${lessons.length}`;
  $("#progress-bar").style.width = `${count / lessons.length * 100}%`;
  $("#progress-caption").textContent = count === lessons.length ? "All four fieldnotes solved. Keep experimenting." : count ? `${count} fieldnote${count === 1 ? "" : "s"} solved. Keep following the number trail.` : "Start with the structure hidden inside an integer.";
}
function render() {
  renderNav(); renderProgress();
  const lesson = lessons[current], solved = completed.has(lesson.id);
  const panel = $("#lesson-panel");
  panel.innerHTML = `
    <div class="module-meta"><span class="module-tag">${lesson.topic}</span><span>FIELDNOTE 0${current + 1}</span><span>·</span><span>${lesson.time}</span></div>
    <div class="module-heading"><h2>${lesson.title}</h2><span class="solved-stamp ${solved ? "show" : ""}">✓ SOLVED</span></div>
    <p class="module-lede">${lesson.lede}</p>
    <div class="question-card"><span class="question-symbol">?</span><div><p class="question-label">YOUR PROBLEM</p><p>${lesson.question}</p></div></div>
    <p class="idea-row"><span class="bulb">✳</span><span><b>The idea.</b> ${lesson.idea}</span></p>
    <div class="launch-row"><a class="launch-button" href="${notebookLink(lesson.notebook)}" target="_blank" rel="noopener noreferrer"><span>Open Sagebrush notebook</span><span class="arrow" aria-hidden="true">↗</span></a><span class="launch-hint">Editable Sage notebook · opens in a new tab</span></div>
    <details class="work-hint"><summary>Need a nudge?</summary><p>${lesson.hint}</p></details>
    <div class="answer-block"><p class="answer-title">BRING YOUR RESULT BACK HERE</p><form class="answer-form" id="answer-form"><input class="answer-input" id="answer-input" autocomplete="off" spellcheck="false" aria-label="Your answer" placeholder="${lesson.placeholder}" ${solved ? "disabled" : ""}><button class="check-button" type="submit" ${solved ? "disabled" : ""}>${solved ? "Solved ✓" : "Check answer"}</button></form><p class="answer-feedback ${solved ? "good" : ""}" id="answer-feedback" aria-live="polite">${solved ? lesson.success : "Use the Sagebrush notebook to work it out, then enter your result."}</p></div>
    <div class="lesson-bottom"><span class="lesson-bottom-note">${lesson.progress}</span><button class="next-button ${solved && current < lessons.length - 1 ? "show" : ""}" id="next-button" type="button">${lesson.next}<span>→</span></button></div>`;
  const form = $("#answer-form", panel);
  form.addEventListener("submit", event => {
    event.preventDefault();
    const entry = clean($("#answer-input", panel).value);
    const feedback = $("#answer-feedback", panel);
    if (lesson.answer.map(clean).includes(entry)) {
      completed.add(lesson.id);
      localStorage.setItem(storageKey, JSON.stringify([...completed]));
      render();
      $("#answer-feedback", panel).textContent = lesson.success;
      $("#answer-feedback", panel).className = "answer-feedback good";
    } else {
      feedback.textContent = entry ? "Not quite. Check the output in your Sagebrush notebook and try again." : "Run the Sagebrush computation, then enter your result.";
      feedback.className = "answer-feedback try";
    }
  });
  const next = $("#next-button", panel);
  if (next) next.addEventListener("click", () => { current++; render(); window.scrollTo({ top: document.querySelector(".workbench").offsetTop - 15, behavior: "smooth" }); });
}
$("#reset-progress").addEventListener("click", () => {
  if (!completed.size) return;
  completed.clear(); localStorage.removeItem(storageKey); render();
});
render();
