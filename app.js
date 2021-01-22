
document.querySelector('form').addEventListener('submit', onSubmit);


function onSubmit(evt) {
  evt.preventDefault();

  const inputEl = this.querySelector('#number');
  const numberOfJokes = Number(inputEl.value);

  const isValid = isValidNumber(numberOfJokes, inputEl);
  if (!isValid) return;

  getJokesAsyn(numberOfJokes, displayJokes);
}


// Gets the jokes from the external api asynchronously
function getJokesAsyn(num, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `http://api.icndb.com/jokes/random/${num}`,
    true
  );

  xhr.onload = function() {
    if (this.status === 200) {
      const jokes = JSON.parse(this.responseText).value;
      callback(jokes);
    }
  };

  xhr.send();
}


// Displays the jokes as li elements
function displayJokes(jokes) {
  const lis = jokes.reduce((acc, jokeObj) => {
    const jokeText = jokeObj.joke;
    return acc + `<li>${jokeText}</li>`;
  }, '');

  document.querySelector('ul.jokes').innerHTML = lis;
}


// Displays Error if the number of jokes is not positive
function isValidNumber(num, inputEl) {
  if (num > 0) {
    return true;
  }
  inputEl.style.borderColor = 'red';
  const errorEl = document.createElement('div');
  errorEl.style.color = 'red';
  const errorMsgEl = document.createTextNode('*Number must be positive');
  errorEl.appendChild(errorMsgEl);
  inputEl.insertAdjacentElement('afterend', errorEl);

  return false;
}