//constants
const spacemanImage = document.querySelector(".spaceman-box img");

const wordDisplay = document.querySelector(".word-display");

const guessesText = document.querySelector(".guesses-text b");

const guessesText2 = document.querySelector(".game-status");

const keyboardDiv = document.querySelector(".keyboard");

const gameModal = document.querySelector(".game-modal");

const playAgainBtn = document.querySelector(".play-again");
//variables
let currentWord = "";

let correctLetters = [];
let wrongGuessCount = 0;

const maxGuesses = 6;

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  spacemanImage.src = "/spaceman_img /start.png"; 
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`; 
  keyboardDiv.querySelectorAll("button").forEach(btn => (btn.disabled = false)); 
  
  if (currentWord) {
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
  }
  
  gameModal.classList.remove("show"); 
}

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]; 
  currentWord = word; 
  console.log(word);
  document.querySelector(".hint-text b").innerText = hint; 
  guessesText2.innerText = ""; 
  
  resetGame(); 
}
const gameOver = (isVictory) => {
  const modalText = isVictory ? `You found the Word:` : `The correct word was:`; 
  document.querySelector(".spaceman-box img").src = `/spaceman_img /${isVictory ? 'victory' : 'loss'}.png`; 
  guessesText2.innerText = `${isVictory ? 'YOU WIN!' : 'Game Over!'}`; 
  
}

const initGame = (button, clickedLetter) => {
  if (wrongGuessCount === maxGuesses) {
    return;
  }

  const lowercaseClickedLetter = clickedLetter.toLowerCase();
  const lowercaseCurrentWord = currentWord.toLowerCase();

  let letterFound = false;
  for (let i = 0; i < lowercaseCurrentWord.length; i++) {
    if (lowercaseCurrentWord[i] === lowercaseClickedLetter) {
      correctLetters.push(clickedLetter);
      wordDisplay.querySelectorAll("li")[i].innerText = clickedLetter;
      wordDisplay.querySelectorAll("li")[i].classList.add("guessed");
      letterFound = true;
    }
  }

  if (!letterFound) {
    wrongGuessCount++;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    button.disabled = true;
  }

  if (correctLetters.length === currentWord.length) return gameOver(true);
}

for (let i = 97; i <= 122; i++) {
  let button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button); 
  button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));// event listener
}
//event listener
playAgainBtn.addEventListener("click", getRandomWord);
getRandomWord();
