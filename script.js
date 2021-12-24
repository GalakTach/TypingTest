const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const pFirst = document.querySelector("#scoreOne"); // associates the html <p> with Id "scoreOne" with pFirst variable so the inner html can be changed to set score one
const pSecond = document.querySelector("#scoreTwo"); // associates the html <p> with Id "scoreTwo" with pSecond variable so the inner html can be changed to set score two
const pThird = document.querySelector("#scoreThree"); // associates the html <p> with Id "scoreThree" with pThird variable so the inner html can be changed to set score three
const pErrors = document.querySelector("#errors"); //assosciates the html <p> with Id "errors" with pErrors variable so the inner html can be changed to set error count
const testTxt = document.querySelector("#testTxt"); //assosciates the html <p> with Id "testTxt" with testTxt variable so the inner html can be changed to randomize prompts
const pWPM = document.querySelector("#wpm"); //assosciates the html <p> with Id "wpm" with pWPM variable so the inner html can be changed to set words per minute

let timer = [0, 0, 0]; //the timer array, minutes, seconds, milliseconds.
let incrementTime = 0; //used to increment timer to do calculations
let First = [1, 0, 0]; //default high score
let Second = [3, 0, 0]; //default second high score
let Third = [5, 0, 0]; //default third high score
let interval; //timer interval used to enable and disable the timer
let Errors = 0; // number of errors user makes
let wpmNum = 0; // words per minute
let prompts = [
  "The quick brown fox jumps over the lazy dog.",
  "This is a typing prompt.",
  "Let's see how quickly you can type."
];

// Add leading zero to numbers 9 or below (purely for aesthetics):
function addZero(time) {
  //concatenates a 0 to the timer so that it says 09 instead of 9
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

// Timer
function Timer() {
  let currTime =
    addZero(timer[0]) + ":" + addZero(timer[1]) + ":" + addZero(timer[2]); //sets the current time and adds zeros to the front of single digits
  theTimer.innerHTML = currTime; //innerHtml so that it changes the actual text and not the tags
  incrementTime++; //increments timer
  timer[0] = Math.floor(incrementTime / 100 / 60); //calculates minutes, seconds, and milliseconds of the timer
  timer[1] = Math.floor(incrementTime / 100 - timer[0] * 60);
  timer[2] = Math.floor(incrementTime - timer[1] * 100 - timer[0] * 6000);
}

// Text Verification
function checkTxt() {
  let txtTyped = testArea.value; //puts what the user typed into a variable
  let txtTest = testTxt.innerHTML.substring(0, txtTyped.length); //puts the prompt text into a variable letter by letter for comparrison
  if (txtTyped == testTxt.innerHTML) {
    pErrors.innerHTML = "Errors: " + Errors; //set number of user errors
    let len = testTxt.innerHTML.split(" ").length; //gets number of words in prompt
    wpmNum = Math.floor(len/(incrementTime/6000)); //does calculation for words per minute
    pWPM.innerHTML = "Words per minute: " + wpmNum;
    testWrapper.style.borderColor = "gold"; //if the user has the exact text as the prompt, turn the border gold
    clearInterval(interval); // clear the timer interval to turn it off.
    if (theTimer.innerHTML < First) {
      pThird.innerHTML = pSecond.innerHTML; //checks if user beat first place high score, if yes, shifts the other scores down and sets time for First
      pSecond.innerHTML = pFirst.innerHTML;
      pFirst.innerHTML = theTimer.innerHTML;
      First = theTimer.innerHTML;
    } else if (theTimer.innerHTML < Second) {
      pThird.innerHTML = pSecond.innerHTML; //checks if user beat second place high score, if yes, shifts the other scores down and sets time for Second
      pSecond.innerHTML = theTimer.innerHTML;
      Second = theTimer.innerHTML;
    } else if (theTimer.innerHTML < Third) {
      pThird.innerHTML = theTimer.innerHTML; //checks if user beat third place high score, if yes, sets time for Third
      Third = theTimer.innerHTML;
    }
  } else if (txtTyped == txtTest) {
    testWrapper.style.borderColor = "green"; //border color is green when the user is typing correctly
  } else {
    Errors++;
    testWrapper.style.borderColor = "red"; //border color is red when user makes an error
  }
}

// Start timer:
function startTime() {
  let txtLen = testArea.value.length; //starts the timer as soon as the user types a character
  if (txtLen == 0) {
    interval = setInterval(Timer, 10);
  }
}

// Reset
function reset() {
  clearInterval(interval); //stops the timer
  interval = null; //sets interval to null so that there are no errors later when it's re-assigned
  timer = [0, 0, 0]; //sets the timer array back to 0 0 0
  incrementTime = 0;
  testArea.value = ""; // clears the user input box
  theTimer.innerHTML = "00:00:00"; // sets the timer display text to  00:00:00
  testWrapper.style.borderColor = "gray"; // sets the border color to gray to show that the test hasn't started yet
  Errors = 0;
  pErrors.innerHTML = "Errors: ";
  testTxt.innerHTML = prompts[Math.floor(Math.random() * prompts.length)]; // randomizes the prompt every time button is clicked
  pWPM.innerHTML = "Words per minute: ";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", startTime); //event listener to start the timer on key being pressed down
testArea.addEventListener("keyup", checkTxt); // event listener to compare user input letter to prompt text letter when key is released
resetButton.addEventListener("click", reset); // event listener to reset everything when user clicks on "start over" button


//sources
//https://stackoverflow.com/questions/18679576/counting-words-in-string
//https://developer.mozilla.org/en-US/docs/Web/API/setInterval
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length
//https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event
//https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event
//https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click