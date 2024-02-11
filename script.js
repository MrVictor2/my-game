// Select the image element within the element with class "spaceman-box" and store it in spacemanImage
const spacemanImage = document.querySelector(".spaceman-box img");

// Select the element with class "word-display" and store it in wordDisplay
const wordDisplay = document.querySelector(".word-display");

// Select the element with class "guesses-text" followed by a <b> element and store it in guessesText
const guessesText = document.querySelector(".guesses-text b");

// Select the element with class "game-status" and store it in guessesText2
const guessesText2 = document.querySelector(".game-status");

// Select the element with class "keyboard" and store it in keyboardDiv
const keyboardDiv = document.querySelector(".keyboard");

// Select the element with class "game-modal" and store it in gameModal
const gameModal = document.querySelector(".game-modal");

// Select the element with class "play-again" and store it in playAgainBtn
const playAgainBtn = document.querySelector(".play-again");

// Initialize the variable currentWord to an empty string
let currentWord = "";

// Initialize the arrays correctLetters and wrongGuessCount to empty arrays and 0, respectively
let correctLetters = [];
let wrongGuessCount = 0;

// Define the maximum number of wrong guesses allowed
const maxGuesses = 6;

// Define a function to reset the game state
const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  spacemanImage.src = "/spaceman_img /start.png"; // Set the image source to the start image
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`; // Update the guesses display
  keyboardDiv.querySelectorAll("button").forEach(btn => (btn.disabled = false)); // Enable all keyboard buttons
  
  // Display spaces for each letter in the current word
  if (currentWord) {
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
  }
  
  gameModal.classList.remove("show"); // Hide the game modal
}

// Define a function to select a random word from the wordList array
const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)]; // Select a random word and its hint
  currentWord = word; // Set the current word
  console.log(word);
  document.querySelector(".hint-text b").innerText = hint; // Display the hint
  guessesText2.innerText = ""; // Clear the game status text
  resetGame(); // Reset the game state
}

// Define a function to handle game over
const gameOver = (isVictory) => {
  const modalText = isVictory ? `You found the Word:` : `The correct word was:`; // Define modal text based on game outcome
  document.querySelector(".spaceman-box img").src = `/spaceman_img /${isVictory ? 'victory' : 'loss'}.png`; // Set the image source based on game outcome
  guessesText2.innerText = `${isVictory ? 'Congrats you won!' : 'Game Over!'}`; // Display game outcome text
}

// Define a function to handle the game logic when a keyboard button is clicked
const initGame = (button, clickedLetter) => {
  // check if game is over
  if (wrongGuessCount === maxGuesses) {
    return;
  }

  // Convert the clicked letter to lowercase for case-insensitive comparison
  const lowercaseClickedLetter = clickedLetter.toLowerCase();
  const lowercaseCurrentWord = currentWord.toLowerCase();

  // Check if the clicked letter exists in the current word
  let letterFound = false;
  for (let i = 0; i < lowercaseCurrentWord.length; i++) {
    if (lowercaseCurrentWord[i] === lowercaseClickedLetter) {
      correctLetters.push(clickedLetter);
      wordDisplay.querySelectorAll("li")[i].innerText = clickedLetter;
      wordDisplay.querySelectorAll("li")[i].classList.add("guessed");
      letterFound = true;
    }
  }

  // If the letter is not found in the word, consider it a wrong guess
  if (!letterFound) {
    wrongGuessCount++;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    button.disabled = true;
  }

  // Check if the player has guessed all letters in the word
  if (correctLetters.length === currentWord.length) return gameOver(true);
}

// Create keyboard buttons and add event listeners to them
for (let i = 97; i <= 122; i++) {
  let button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button); 
  button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

// Add event listener to the play again button
playAgainBtn.addEventListener("click", getRandomWord);

// Start a new game immediately
getRandomWord();
