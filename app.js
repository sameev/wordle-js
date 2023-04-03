const letters = document.querySelectorAll('.guess-letter');
const loading = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;

const init = async () => {
  let currentGuess = '';

  const isLetter = (letter) => {
    return /^[a-zA-Z]$/.test(letter);
  };
  
  const commit = () => {
    console.log('invoking commit function');
  };
  
  const backspace = () => {
    console.log('invoking backspace function');
  };
  
  const addLetter = (letter) => {
    console.log('invoking addLetter function');
    if(currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;
    } else {
      currentGuess = currentGuess.slice(0,-1) + letter
    }
  };

  document.addEventListener(
    'keydown',
    (handleKeyPress = (event) => {
      const pressedKey = event.key;

      console.log(pressedKey);

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

init();
