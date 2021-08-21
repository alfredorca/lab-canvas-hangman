class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
  }

  createBoard() {
    const tree = new Image();
    tree.src = '/treetry.png';
    tree.addEventListener('load', () => {
      this.context.drawImage(tree, 0, 30, 300, 600)
    })
    

    this.context.clearRect(0, 0, 1200, 800);
    this.drawLines();
  }

  drawLines() {
    let n = this.secretWord.length;
    for (let i = 0; i < n; i++) {
      // start line at
      this.context.moveTo(250 + (i * 100), 560); // each line is (250 - 230) => 20 px, spaces are the i * 50
      // finishe line at, (x, y)
      this.context.lineTo(300 + (i * 100), 560);
      this.context.stroke();
    }
  }

  writeCorrectLetter(index) {
    this.context.font = '28px Open Sans, sans-serif'
    this.context.fillText(this.secretWord[index].toUpperCase(), 270 + (index * 100), 550);

  }

  writeWrongLetter(letter, errorsLeft) {
    this.context.font = '28px Open Sans, sans-serif';
    this.context.fillText(letter,  1000 - ((10 - errorsLeft) * 50 ), 150);
  }

  drawHangman(errorsLeft) {
    switch(errorsLeft) {
      case 9:                         //    .
        this.context.moveTo(220, 180);
        this.context.lineTo(360, 180);
        this.context.stroke();
      break;
      case 8:
        this.context.moveTo(360,180);
        this.context.lineTo(360,240);
        this.context.stroke();
        break;
      case 7:
        this.context.moveTo(380, 260);
        this.context.arc(360, 260, 20, 0, Math.PI * 2);
        this.context.stroke();
      break;
      case 6:
        this.context.moveTo(360, 280);
        this.context.lineTo(360, 370);
        this.context.stroke();
      break;
      case 5:
        this.context.moveTo(360, 305);      
        this.context.lineTo(400, 335);      
        this.context.stroke();
      break;
      case 4:
        this.context.moveTo(360, 305);
        this.context.lineTo(320, 335);
        this.context.stroke();
      break;
      case 3:
        this.context.moveTo(360, 370);
        this.context.lineTo(400, 400);
        this.context.stroke();
      break;
        
      case 2:
        this.context.moveTo(360, 370);
        this.context.lineTo(320, 400);
        this.context.stroke();
      break;
      case 1:
        this.context.moveTo(368, 250);
        this.context.lineTo(373, 260);
        this.context.moveTo(373, 250);
        this.context.lineTo(368, 260);
        this.context.moveTo(348, 250);
        this.context.lineTo(353, 260);
        this.context.moveTo(353, 250);
        this.context.lineTo(348, 260)
        this.context.stroke();
      break;
      case 0:
        this.gameOver();
      break;
    }
  }

  gameOver() {
    const gameOver = new Image();
    gameOver.src = '/images/gameover.png';
    gameOver.addEventListener('load', () => {
      this.context.drawImage(gameOver, 0, 0, 1100, 800);
    })

  }

  winner() {
    const winner = new Image();
    winner.src = '/images/awesome.png';
    winner.addEventListener('load', () => {
      this.context.drawImage(winner, 0, 0, 1100, 800);
    })
  }
}