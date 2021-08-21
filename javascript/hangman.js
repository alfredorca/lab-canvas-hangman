class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord;
    this.letters = [];
    this.guessedLetters = [];
    this.errorsLeft = 10;
  }

  pickWord() {
    let max = this.words.length;
    let indx = Math.floor(Math.random() * (max - 0) + 0);
    return this.words[indx];
  }

  checkIfLetter(key) {
    // keyCode >= 65 && keyCode <= 90
    if (key >= "a" && key <= "z") {
      return true;
    } else {
      return false;
    }
  }

  checkClickedLetters(letter) {
    return !this.letters.includes(letter) ? true : false;
  }

  addCorrectLetter(letter) {
    if (this.checkClickedLetters(letter) && this.secretWord.includes(letter)) {
      this.guessedLetters.push(letter);
    }
  }

  addWrongLetter(letter) {
    if (this.checkClickedLetters(letter) && !this.secretWord.includes(letter)) {
      this.letters.push(letter);
    }
  }

  checkGameOver() {
    if (this.errorsLeft == 0) {
      return true;
    } else {
      return false;
    }
  }

  checkWinner() {
    // foreach or for lop 
    // loop through the guessed letters
    // for each letter if it secretWord.includes the guessed Letters caracter => continue
    // else return false
    // if you reached the end of the loop means all characters are accounted for;
    // return true;

    // ex: secretWord = Miami
    // gussed letters = mia => return true   
    return this.secretWord.length === this.guessedLetters.length ? true : false; // TODO: 
  }
}

let hangman;

const startGameButton = document.getElementById("start-game-button");

if (startGameButton) {
  startGameButton.addEventListener("click", (event) => {
    hangman = new Hangman([
      "node",
      "javascript",
      "react",
      "miami",
      "paris",
      "amsterdam",
      "lisboa",
    ]);

    // // HINT (uncomment when start working on the canvas portion of the lab)
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();
  });
}

document.addEventListener("keydown", (event) => {
  if (!hangman.checkIfLetter(event.key)) {
    return; // It's not a letter, just exit
  }
  // this will return !letters.include(event.key) || !guessedLetters.include(...)
  if (hangman.checkClickedLetters(event.key)) {
    // check that the new key is in secret word
    if (hangman.secretWord.includes(event.key)) {
      hangman.addCorrectLetter(event.key);
      // here we are going to add the letter even if its repeated
      for (let i = 0; i < hangman.secretWord.length; i++) {
        if (event.key === hangman.secretWord[i]) {
          hangmanCanvas.writeCorrectLetter(i);
        }
      }
      if (hangman.secretWord.length ===  hangman.guessedLetters.length) {
        hangmanCanvas.winner();
      }
    } else {
      hangman.addWrongLetter(event.key);
      hangmanCanvas.writeWrongLetter(event.key, hangman.errorsLeft);
      hangman.errorsLeft--;
      console.log(hangman.errorsLeft);
      hangmanCanvas.drawHangman(hangman.errorsLeft);
    }
  }
});