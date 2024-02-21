let time = 1 * 60;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;
let cpm = 0;
let wpm = 0;

// Fetching paragraphs 
let paraArea = document.querySelector(".paraArea");
function loadPara() {
  const randPara = Math.floor(Math.random() * paragraphs.length);
  paraArea.innerHTML = "";
  paragraphs[randPara].split("").forEach((char) => {
    let spans = `<span>${char}</span>`;
    paraArea.innerHTML += spans;
  });
  document.addEventListener("keydown", () => input.focus() );
}

// Typing function 
function typing() {
  let characters = document.querySelectorAll("span");
  let input = document.getElementById("input-feild");
  let typedChar = input.value.split("")[charIndex];

  if (time > 0) {
    if (!isTyping) {
      timer = setInterval(timer, 1000);
      isTyping = true;
    }
    if (typedChar == null) {
      charIndex--;
      if (characters[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }
      if (characters[charIndex].classList.contains("correct")) {
        cpm--;
      }
      characters[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (typedChar == characters[charIndex].innerText) {
        characters[charIndex].classList.add("correct");
        cpm++;
      } else {
        characters[charIndex].classList.add("incorrect");
        mistakes++;
      }
      charIndex++;
    }
    document.getElementById("mistake").innerHTML = mistakes;
    document.getElementById("cpm").innerHTML = cpm;
  } else {
    clearInterval(timer);
    input.innerHTML = "";
  }
}

// Timer
function timer() {
  if (time > 0) {
    time--;
    document.getElementById("timer").innerHTML = time;
    console.log(cpm);
    let wpm = Math.round(cpm / 5);
    document.getElementById("wpm").innerHTML = wpm;
  } else {
    // console.log("samay samapt");
    clearInterval(timer);
  }
}

loadPara();
let input = document.getElementById("input-feild");
input.addEventListener("input", typing);
document.getElementById('btn').addEventListener('click', ()=>{
    location.reload();
})