/* ===== 설정 ===== */
// Google Apps Script 배포 후 발급받은 웹앱 URL을 여기에 넣으세요.
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx-qVYD1Vg1vlwiPp13OEohdErzCe7q95CDQ2i9xzDTZq5JGW2Fdsj0M2n7WEO9rcW4/exec";

/* ===== 문항 데이터 ===== */
const SELF_LABELS = ["전혀 그렇지 않다", "그렇지 않다", "별로 그렇지 않다", "조금 그렇다", "그렇다", "매우 그렇다"];
const SELF_QUESTIONS = [
  { text: "나는 다른 친구들에 비해 글을 더 잘 이해하는 편이다." },
  { text: "나는 글을 읽을 때 다른 친구들보다 어려운 내용을 더 잘 읽을 수 있다." },
  { text: "나는 글을 읽을 때 다른 친구들보다 도움이 덜 필요하다.", sub: "(도움 예시: 선생님/부모님이 이해가 안 되는 내용이나 모르는 단어를 알려주는 것 등)" }
];

const EMOTION_LABELS = ["매우 그렇지 않다", "그렇지 않다", "보통이다", "그러하다", "매우 그러하다"];
const EMOTION_QUESTIONS = [
  "나는 글을 읽는 것이 즐겁다.",
  "어려운 글을 읽는 것은 나에게 즐거운 도전 과제이다.",
  "나는 글을 읽는 중에 생기는 도전적인 상황을 즐긴다.",
  "나는 글을 읽는 것이 즐거워서 글을 읽을 때 활력이 생긴다.",
  "나는 글이 잘 읽히면, 짜릿하다.",
  "나는 글을 읽을 때, 잘 이해할 수 있을 것이라는 희망을 느낀다.",
  "나는 글을 읽으며 편안함을 느낀다.",
  "나는 글을 읽으며 차분함을 느낀다.",
  "나는 글을 읽으며 여유롭다고 느낀다.",
  "나는 어려운 글을 읽을 때에도 편안함을 느낀다.",
  "나는 글을 읽을 때 큰 부담을 느끼지 않는다.",
  "나는 글을 읽는 것이 불쾌하다.",
  "나는 글을 읽는 것이 짜증난다.",
  "나는 쓸모없다고 느껴지는 글을 읽어야 한다고 생각하면 화가 난다.",
  "나는 글을 읽을 때 화가 나서 마음이 진정되지 않는다.",
  "나는 글을 읽을 때 예상보다 오래 걸리면 짜증이 나고 초조해진다.",
  "나는 글을 읽을 때 너무 화가 나서 몸이 뜨거워지고 얼굴이 빨개진다.",
  "나는 글을 읽을 때 긴장한다.",
  "나는 어려운 글을 읽을 때 긴장한다.",
  "나는 글을 끝까지 다 읽지 못할까봐 걱정한다.",
  "나는 글의 내용을 제대로 이해하지 못할까봐 걱정한다.",
  "나는 글을 읽다 이해가 잘 안 되면 당황한다.",
  "나는 글을 끝까지 다 읽지 못할까봐 걱정해서 땀이 난다.",
  "나는 글을 읽는 것이 지루하다.",
  "나는 글을 읽는 것이 견디기 어려울 만큼 지루하다.",
  "나는 글을 읽을 때 지루해져서 집중력이 떨어진다.",
  "나는 글을 읽을 때, 글이 영영 끝나지 않을 것만 같다.",
  "나는 글을 읽는 것이 너무 지루해서 딴생각을 하게 된다.",
  "나는 너무 지루해서 집중해서 글을 읽는 것이 어렵다.",
  "나는 글을 읽을 때 너무 지루해서 하품이 나온다.",
  "나는 글을 읽는 것이 너무 지루해서 지친다.",
  "나는 글을 잘 읽을 것이라는 희망이 없다.",
  "나는 글을 잘 읽기 위해 아무리 노력해도 절대 성공하지 못할 것 같다.",
  "나는 내가 글의 내용을 절대 이해하지 못할 것 같다는 사실에 주눅든다.",
  "나는 나에게는 글을 잘 읽는 능력이 없다고 체념했다.",
  "나는 글을 잘 읽을 수 없다는 것이 너무 절망적이어서 더 이상 글을 읽을 힘이 없다고 느낀다."
];

const INTEREST_LABELS = ["매우 그렇지 않다", "그렇지 않다", "보통이다", "그러하다", "매우 그러하다"];
const INTEREST_QUESTIONS = [
  "나는 평소 우주에 대해 관심이 있다.",
  "나는 평소 우주의 팽창에 대해 관심이 있다.",
  "나는 영상, 책, 글 등 매체를 통해 우주의 팽창을 많이 접해본 적이 있다.",
  "나는 우주의 팽창에 대해 잘 알고 있다.",
  "우주의 팽창이라는 주제는 나에게 호감을 불러일으킨다.",
  "우주의 팽창이라는 주제는 나에게 재미있는 주제이다."
];

const TEXT_LABELS = ["A", "B", "C", "D", "E"];
const DIFFICULTY_LABELS = ["매우 쉽다", "쉽다", "적당하다", "어렵다", "매우 어렵다"];
const DIFFICULTY_PHRASE = { 1: "매우 쉽다고", 2: "쉽다고", 3: "적당하다고", 4: "어렵다고", 5: "매우 어렵다고" };

/* ===== 상태 ===== */
const state = {
  studentId: "", studentName: "", gender: "", guardianName: "", consent: false,
  self: [null, null, null],
  emotion: new Array(36).fill(null),
  interest: [null, null, null, null, null, null],
  texts: {
    A: { answer: null, reason: "" }, B: { answer: null, reason: "" },
    C: { answer: null, reason: "" }, D: { answer: null, reason: "" },
    E: { answer: null, reason: "" }
  },
  choice: null,
  finalReason: ""
};

const SCREEN_WEIGHT = { "0":1,"1":2,"2":3,"3":4,"4":5,"5":6,"6":7,"7":8,"8":9,"done":9 };
const TOTAL = 9;

function showScreen(name) {
  document.querySelectorAll(".screen").forEach(el => el.classList.add("hidden"));
  document.querySelector(`.screen[data-screen="${name}"]`).classList.remove("hidden");
  const cur = SCREEN_WEIGHT[name];
  document.getElementById("progressFill").style.width = (cur / TOTAL * 100) + "%";
  document.getElementById("progressText").textContent = name === "done" ? "" : `${cur}/${TOTAL} 화면`;
  window.scrollTo(0, 0);
}

/* ===== 척도 렌더러 (5점/6점 공통) ===== */
function buildScale(container, questions, labels, groupName, onPick) {
  container.innerHTML = "";
  questions.forEach((q, idx) => {
    const text = typeof q === "string" ? q : q.text;
    const sub = typeof q === "string" ? null : q.sub;

    const block = document.createElement("div");
    block.className = "question-block";

    const qText = document.createElement("div");
    qText.className = "question-text";
    qText.textContent = `${idx + 1}. ${text}`;
    if (sub) {
      const subEl = document.createElement("div");
      subEl.className = "question-sub";
      subEl.textContent = sub;
      qText.appendChild(subEl);
    }
    block.appendChild(qText);

    const scale = document.createElement("div");
    scale.className = "scale";
    for (let v = 1; v <= labels.length; v++) {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `${groupName}${idx}`;
      input.value = v;
      input.addEventListener("change", () => onPick(idx, v));
      const btn = document.createElement("div");
      btn.className = "scale-btn";
      btn.innerHTML = `<span class="num">${v}</span><span>${labels[v - 1]}</span>`;
      label.appendChild(input);
      label.appendChild(btn);
      scale.appendChild(label);
    }
    block.appendChild(scale);
    container.appendChild(block);
  });
}

/* ===== 화면 0 ===== */
function initScreen0() {
  const idInput = document.getElementById("studentId");
  const nameInput = document.getElementById("studentName");
  const guardianInput = document.getElementById("guardianName");
  const genderRadios = document.querySelectorAll('input[name="gender"]');
  const consent = document.getElementById("consent");
  const nextBtn = document.getElementById("btnScreen0Next");
  const errorEl = document.getElementById("error0");

  function check() {
    const ok = idInput.value.trim() && nameInput.value.trim() && guardianInput.value.trim() &&
      Array.from(genderRadios).some(r => r.checked) && consent.checked;
    nextBtn.disabled = !ok;
  }
  [idInput, nameInput, guardianInput].forEach(el => el.addEventListener("input", check));
  consent.addEventListener("change", check);
  genderRadios.forEach(r => r.addEventListener("change", () => {
    document.querySelectorAll("#screen0 .radio-box").forEach(b => b.classList.remove("checked"));
    r.closest(".radio-box").classList.add("checked");
    check();
  }));

  nextBtn.addEventListener("click", () => {
    const gender = Array.from(genderRadios).find(r => r.checked);
    if (!idInput.value.trim() || !nameInput.value.trim() || !guardianInput.value.trim() || !gender || !consent.checked) {
      errorEl.textContent = "모든 정보 입력과 동의가 필요합니다.";
      return;
    }
    state.studentId = idInput.value.trim();
    state.studentName = nameInput.value.trim();
    state.guardianName = guardianInput.value.trim();
    state.gender = gender.value;
    state.consent = true;
    errorEl.textContent = "";
    showScreen("1");
  });
}

/* ===== 화면 1 ===== */
function initScreen1() {
  document.getElementById("btnScreen1Next").addEventListener("click", () => showScreen("2"));
}

/* ===== 화면 2 (자기평가 6점) ===== */
function initScreen2() {
  buildScale(document.getElementById("selfQuestions"), SELF_QUESTIONS, SELF_LABELS, "self", (idx, v) => {
    state.self[idx] = v;
    document.getElementById("btnScreen2Next").disabled = !state.self.every(x => x !== null);
  });
  document.getElementById("btnScreen2Next").addEventListener("click", () => {
    if (!state.self.every(x => x !== null)) {
      document.getElementById("error2").textContent = "모든 문항에 응답해주세요.";
      return;
    }
    document.getElementById("error2").textContent = "";
    showScreen("3");
  });
}

/* ===== 화면 3 (정서 36문항 5점) ===== */
function initScreen3() {
  buildScale(document.getElementById("emotionQuestions"), EMOTION_QUESTIONS, EMOTION_LABELS, "emotion", (idx, v) => {
    state.emotion[idx] = v;
    document.getElementById("btnScreen3Next").disabled = !state.emotion.every(x => x !== null);
  });
  document.getElementById("btnScreen3Next").addEventListener("click", () => {
    if (!state.emotion.every(x => x !== null)) {
      document.getElementById("error3").textContent = "모든 문항에 응답해주세요.";
      return;
    }
    document.getElementById("error3").textContent = "";
    showScreen("4");
  });
}

/* ===== 화면 4 (흥미 6문항 5점) ===== */
function initScreen4() {
  buildScale(document.getElementById("interestQuestions"), INTEREST_QUESTIONS, INTEREST_LABELS, "interest", (idx, v) => {
    state.interest[idx] = v;
    document.getElementById("btnScreen4Next").disabled = !state.interest.every(x => x !== null);
  });
  document.getElementById("btnScreen4Next").addEventListener("click", () => {
    if (!state.interest.every(x => x !== null)) {
      document.getElementById("error4").textContent = "모든 문항에 응답해주세요.";
      return;
    }
    document.getElementById("error4").textContent = "";
    showScreen("5");
  });
}

/* ===== 화면 5 ===== */
function initScreen5() {
  document.getElementById("btnScreen5Next").addEventListener("click", () => showScreen("6"));
}

/* ===== 화면 6 (A~E) ===== */
function buildScreen6() {
  const container = document.getElementById("textQuestions");
  container.innerHTML = "";
  TEXT_LABELS.forEach(letter => {
    const block = document.createElement("div");
    block.className = "text-block";

    const badge = document.createElement("div");
    badge.className = "label-badge";
    badge.textContent = `글 ${letter}`;
    block.appendChild(badge);

    const q1 = document.createElement("div");
    q1.className = "question-text";
    q1.textContent = `'글 ${letter}'는 내가 읽기에 어떠한가요?`;
    block.appendChild(q1);

    const scale = document.createElement("div");
    scale.className = "scale";
    DIFFICULTY_LABELS.forEach((label, i) => {
      const v = i + 1;
      const lbl = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `text${letter}`;
      input.value = v;
      input.addEventListener("change", () => { state.texts[letter].answer = v; checkScreen6(); });
      const btn = document.createElement("div");
      btn.className = "scale-btn";
      btn.innerHTML = `<span class="num">${"①②③④⑤"[i]}</span><span>${label.replace(" ", "<br>")}</span>`;
      lbl.appendChild(input);
      lbl.appendChild(btn);
      scale.appendChild(lbl);
    });
    block.appendChild(scale);

    const q2 = document.createElement("div");
    q2.className = "question-text";
    q2.style.marginTop = "14px";
    q2.textContent = "그렇게 느낀 이유는 무엇인가요?";
    block.appendChild(q2);

    const textarea = document.createElement("textarea");
    textarea.rows = 3;
    textarea.placeholder = "이유를 적어주세요 (최소 5자 이상)";
    textarea.addEventListener("input", () => { state.texts[letter].reason = textarea.value; checkScreen6(); });
    block.appendChild(textarea);

    container.appendChild(block);
  });
}

function checkScreen6() {
  const ok = TEXT_LABELS.every(l => state.texts[l].answer !== null && state.texts[l].reason.trim().length >= 5);
  document.getElementById("btnScreen6Next").disabled = !ok;
}

function initScreen6() {
  document.getElementById("btnScreen6Next").addEventListener("click", () => {
    const ok = TEXT_LABELS.every(l => state.texts[l].answer !== null && state.texts[l].reason.trim().length >= 5);
    if (!ok) {
      document.getElementById("error6").textContent = "모든 글에 대해 응답(선택 및 이유 5자 이상)을 입력해주세요.";
      return;
    }
    document.getElementById("error6").textContent = "";
    buildScreen7();
    showScreen("7");
  });
}

/* ===== 화면 7 (글 선택) ===== */
function buildScreen7() {
  const container = document.getElementById("choiceRadios");
  container.innerHTML = "";
  TEXT_LABELS.forEach(letter => {
    const lbl = document.createElement("label");
    lbl.className = "radio-box";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "choice";
    input.value = letter;
    input.addEventListener("change", () => {
      state.choice = letter;
      document.querySelectorAll("#choiceRadios .radio-box").forEach(b => b.classList.remove("checked"));
      lbl.classList.add("checked");
      buildScreen8();
      showScreen("8");
    });
    lbl.appendChild(input);
    lbl.appendChild(document.createTextNode(`글 ${letter}`));
    container.appendChild(lbl);
  });
}

/* ===== 화면 8 (선택 이유) ===== */
function buildScreen8() {
  const letter = state.choice;
  const value = state.texts[letter].answer;
  const phraseHtml = `<strong class="phrase-red">${DIFFICULTY_PHRASE[value]}</strong>`;
  const reasonHtml = `<u><strong>'우주의 팽창'에 대해 공부하기 위해 이 글을 선택한 이유</strong></u>`;

  let template;
  if (value === 1) {
    template = `'글 ${letter}'는 당신이 읽기에 ${phraseHtml} 판단했습니다.\n'글 ${letter}'가 읽기에 <strong class="phrase-red">매우 쉬운데도</strong> ${reasonHtml}는 무엇인가요? 솔직하고 자세하게 작성해주세요.`;
  } else if (value === 2) {
    template = `'글 ${letter}'는 당신이 읽기에 ${phraseHtml} 판단했습니다.\n'글 ${letter}'가 읽기에 <strong class="phrase-red">쉬운데도</strong> ${reasonHtml}는 무엇인가요? 솔직하고 자세하게 작성해주세요.`;
  } else if (value === 3) {
    template = `'글 ${letter}'는 당신이 읽기에 ${phraseHtml} 판단했습니다.\n글이 읽기에 <strong class="phrase-red">적당하다는 점 외에,</strong> ${reasonHtml}는 무엇인가요? 솔직하고 자세하게 작성해주세요.`;
  } else if (value === 4) {
    template = `'글 ${letter}'는 당신이 읽기에 ${phraseHtml} 판단했습니다.\n'글 ${letter}'가 읽기에 <strong class="phrase-red">어려운데도</strong> ${reasonHtml}는 무엇인가요? 솔직하고 자세하게 작성해주세요.`;
  } else {
    template = `'글 ${letter}'는 당신이 읽기에 ${phraseHtml} 판단했습니다.\n'글 ${letter}'가 읽기에 <strong class="phrase-red">매우 어려운데도</strong> ${reasonHtml}는 무엇인가요? 솔직하고 자세하게 작성해주세요.`;
  }

  document.getElementById("screen8Notice").innerHTML = template.replace(/\n/g, "<br><br>");
  document.getElementById("finalReason").value = state.finalReason || "";
}

function initScreen8() {
  document.getElementById("finalReason").addEventListener("input", e => { state.finalReason = e.target.value; });
  document.getElementById("btnSubmit").addEventListener("click", submitSurvey);
  document.getElementById("btnRetry").addEventListener("click", submitSurvey);
}

/* ===== 제출 ===== */
function buildPayload() {
  const t = state.texts;
  const payload = {
    timestamp: new Date().toISOString(),
    studentId: state.studentId,
    studentName: state.studentName,
    gender: state.gender,
    guardianName: state.guardianName,
    consent: state.consent ? "동의" : "",
    self1: state.self[0], self2: state.self[1], self3: state.self[2]
  };
  for (let i = 0; i < 36; i++) payload["emotion" + (i + 1)] = state.emotion[i];
  for (let i = 0; i < 6; i++) payload["interest" + (i + 1)] = state.interest[i];
  TEXT_LABELS.forEach(l => {
    payload["answer" + l] = t[l].answer;
    payload["reason" + l] = t[l].reason;
  });
  payload.choice = state.choice;
  payload.choiceAnswerValue = t[state.choice].answer;
  payload.finalReason = state.finalReason;
  return payload;
}

function submitSurvey() {
  if (state.finalReason.trim().length < 5) {
    document.getElementById("error8").textContent = "이유를 5자 이상 입력해주세요.";
    return;
  }
  document.getElementById("error8").textContent = "";

  const submitBtn = document.getElementById("btnSubmit");
  submitBtn.disabled = true;
  submitBtn.textContent = "전송 중...";

  fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(buildPayload())
  })
    .then(res => {
      if (!res.ok) throw new Error("서버 응답 오류");
      document.getElementById("doneMessage").innerHTML = "응답이 제출되었습니다.<br>성실하게 응답해주셔서 감사합니다.";
      document.getElementById("btnRetry").classList.add("hidden");
      showScreen("done");
    })
    .catch(() => {
      document.getElementById("error8").textContent = "전송에 실패했습니다. 다시 시도해주세요.";
      document.getElementById("btnRetry").classList.remove("hidden");
      submitBtn.disabled = false;
      submitBtn.textContent = "제출하기";
    });
}

/* ===== 초기화 ===== */
initScreen0();
initScreen1();
initScreen2();
initScreen3();
initScreen4();
initScreen5();
buildScreen6();
initScreen6();
initScreen8();
showScreen("0");
