const letters = document.querySelectorAll('.guess-letter');
const loading = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;

const init = async () => {
  let currentGuess = '';
  let currentRow = 0;

  const wordOfTheDay = await getWordOfTheDay();
  console.log(wordOfTheDay);

  const isLetter = (letter) => {
    return /^[a-zA-Z]$/.test(letter);
  };

  const commit = async () => {
    if (currentGuess.length !== ANSWER_LENGTH) {
      //do nothing
      return;
    }

    //TODO: Need to validate that the word is a correct 5-letter word

    //TODO: Mark the letter boxes of current row as "correct" "incorrect" or "wrong-spot"

    //TODO: Check to see if the user won(correct guess) or lost (incorrect guess on 6th chance)

    currentRow++;
    currentGuess = '';
  };

  const backspace = () => {
    if (currentGuess.length > 0) {
      currentGuess = currentGuess.slice(0, -1);
      letters[currentRow * ANSWER_LENGTH + currentGuess.length].innerText = '';
    }
  };

  const addLetter = (letter) => {
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;
    } else {
      //*replace last letter of current guess if already 5 letters
      currentGuess = currentGuess.slice(0, -1) + letter;
    }

    //*renders letter on browser
    letters[currentRow * ANSWER_LENGTH + currentGuess.length - 1].innerText =
      letter;
  };

  document.addEventListener(
    'keydown',
    (handleKeyPress = (event) => {
      const pressedKey = event.key;

      if (pressedKey === 'Enter') {
        commit();
      } else if (pressedKey === 'Backspace') {
        backspace();
      } else if (isLetter(pressedKey)) {
        addLetter(pressedKey.toUpperCase());
      } else {
        //do nothing if not Enter, Backspace, or valid letter
      }
    })
  );
};

const getWordOfTheDay = async () => {
  const res = await fetch('https://words.dev-apis.com/word-of-the-day');
  const data = await res.json();

  return data.word.toUpperCase();
};

init();
