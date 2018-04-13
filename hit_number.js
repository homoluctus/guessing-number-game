var count = 1;
var resetButton;  // for stating new game
var answer = randomNumber();
var guesses = document.querySelector('.guesses');  // display previous guesses entered by user
var resultMessage = document.querySelector('.resultMessage');  // response to entered guess
var guessField = document.querySelector('.guessField');
var guessSubmit = document.querySelector('.guessSubmit');

guessSubmit.addEventListener('click', game);

function game()
{
  var result;
  var guess = Number(guessField.value);

  if (count === 1) {
    guesses.textContent = 'Previous answers : ';
  }
  guesses.textContent += guess + ' ';

  result = judgeGuess(guess);
  resultMessage.textContent = getResultMessage(result);
  resultMessage.style.backgroundColor = getBackgroundColor(result);

  (result == 0 || count == 10) ? gameOver() : count++;

  guessField.value = '';
  guessField.focus();
}

function judgeGuess(guess)
{
  // return -2 if guess is not positive integer
  if (isNaN(guess)) {
    return -2;
  }
  // answer is greater than guess => 1, less than => -1, equal => 0
  return answer > guess ? 1 : answer < guess ? -1 : 0;
}

function getResultMessage(result)
{
  var msg;
  switch (result) {
    case -2 : msg = "Please enter a positive integer";                    break;
    case -1 : msg = "Correct answer is less than your entered number";    break;
    case 0  : msg = "Congratulations!!! Correct answer!!!";               break;
    case 1  : msg = "Correct answer is greater than your entered number"; break;
  }
  return msg;
}

function getBackgroundColor(result)
{
  // Change the background color by result
  var color;
  switch (result) {
    case -2 : color = "yellow"; break;
    case -1 : color = "red";    break;
    case 0  : color = "green";  break;
    case 1  : color = "red";    break;
  }
  return color;
}

function randomNumber()
{
  return Math.floor(Math.random() * 100) + 1;
}

function gameOver()
{
  // set to be not able to enter guess
  guessField.disabled = true;
  guessSubmit.disabled = true;

  // display correct answer
  var correctAnswer = document.createElement('p')
  correctAnswer.className = 'font-weight-bold';
  correctAnswer.textContent = 'Correct Answer : ' + answer;
  document.getElementById('guesses').appendChild(correctAnswer);

  // create button to start new game
  resetButton = document.createElement('button');
  resetButton.className = 'btn btn-primary'
  resetButton.textContent = 'Start new game';
  document.getElementById('container').appendChild(resetButton);
  resetButton.addEventListener("click", startNewGame);
}

function startNewGame()
{
  // remove resetButton node from DOM tree
  resetButton.parentNode.removeChild(resetButton);

  // initialize parameters to start new game
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guesses.textContent = '';
  resultMessage.textContent = '';
  resultMessage.style.backgroundColor = 'white';
  guessField.value = '';
  guessField.focus();
  answer = randomNumber();
  count = 1;
}
