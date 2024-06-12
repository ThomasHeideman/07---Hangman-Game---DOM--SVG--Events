'use strict';
const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letter');
const playAgainBtn = document.getElementById('play');
const popUp = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = [
  'wizard',
  'application',
  'javascript',
  'website',
  'development',
  'internet',
  'programming',
  'browser',
];

let selectedword = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `${selectedword
    .split('')
    .map(
      letter =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ''
        }</span>`
    )
    .join('')}`;

  //
  const innerWord = wordEl.innerText.replace(/\n/g, '');
  if (innerWord === selectedword) {
    finalMessage.innerText = 'Congratulations! You won! 🥳';
    popUp.style.display = 'flex';
  }
}

// show wrong letters
function updateWrongLetterEl() {
  // display wrong letters
  wrongLetterEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}`;

  // display figure parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });
  // check if lost;
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Too bad! You lost. 😞';
    popUp.style.display = 'flex';
  }
}

// Show Notification

function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 1500);
}

// play again

function playAgain() {
  correctLetters.length = 0;
  wrongLetters.length = 0;
  selectedword = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetterEl();
  popUp.style.display = 'none';
}

//keydown letter press
window.addEventListener('keydown', e => {
  if (e.code.includes('Key')) {
    // it is a letter
    const letter = e.key;
    if (selectedword.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetterEl();
      } else {
        showNotification();
      }
    }
  }
});
playAgainBtn.addEventListener('click', playAgain);

displayWord();
