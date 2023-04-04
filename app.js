const letters = document.querySelectorAll('.guess-letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;

const init = async () => {
  let currentGuess = '';
  let currentRow = 0;
  let isLoading = true;

  const answer = await getAnswer();
  const answerArray = answer.split('');

  isLoading = false;
  setLoading(isLoading);

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
    const currentGuessArray = currentGuess.split('');

    //setting up an answerMap to keep track of remaining letters after each loop
    const answerMap = makeMap(answerArray);

    //loop through guess first time to mark correct squares;
    for (let i = 0; i < ANSWER_LENGTH; i++) {
      const letter = currentGuessArray[i];
      if (letter === answerArray[i]) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add('correct');
        answerMap[letter]--;
        console.log(answerMap);
      }
    }

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      const letter = currentGuessArray[i];
      if (letter === answerArray[i]) {
        //do nothing - already handled by first loop
      } else if (answerArray.includes(letter) && answerMap[letter] > 0) {
        //mark the letter as "close" and decrement remaining letter count in map
        letters[currentRow * ANSWER_LENGTH + i].classList.add('wrong-spot');
        answerMap[letter]--;
      } else {
        //mark the letter as "incorrect"
        letters[currentRow * ANSWER_LENGTH + i].classList.add('incorrect');
      }
    }

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

//show the loading spinner when needed
const setLoading = (isLoading) => {
  loadingDiv.classList.toggle('show', isLoading);
};

const getAnswer = async () => {
  const res = await fetch('https://words.dev-apis.com/word-of-the-day');
  const data = await res.json();

  return data.word.toUpperCase();
};

const makeMap = (array) => {
  const map = {};
  array.forEach((letter) => {
    map[letter] = (map[letter] || 0) + 1;
  });
  return map;
};

init();
