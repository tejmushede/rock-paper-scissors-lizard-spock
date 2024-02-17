let choiceButtons = document.querySelector(".choice-buttons");
let chosenHands = document.querySelector(".chosen-hands");
let chosenHandsDesktop = document.querySelector(".chosen-hands-desktop");
let gameResultsMobile = document.querySelector(".game-results-mobile");
let gameResultsDesktop = document.querySelector(".game-results-desktop");
let rulesButton = document.querySelector(".rules-button");

let playerChoice = "";
let computerChoice = "";
let score = 0;

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

const setPlayerChoice = (hand) => {
  playerChoice = hand;
  computerChoice = setComputerChoice();
  
  //Hide the 5 choices of buttons
  //Display the player's choice and the house's choice
  
  choiceButtons.style.display = "none";

  if (window.innerWidth < 1024) {
    chosenHands.style.display = "flex";

    //Replace images for buttons + add styling according to chosen hand
    document.getElementById("player-picked-hand").src = `./images/icon-${hand}.svg`;
    document.querySelector(".player-hand-button").style.outline = `10px solid var(--${hand}-gradient-1)`;

    delayedComputerChoice(computerChoice);
  }
  else{
    chosenHandsDesktop.style.display = "flex";

    //Replace images for buttons + add styling according to chosen hand
    document.getElementById("player-picked-hand-desktop").src = `./images/icon-${hand}.svg`;
    document.querySelector(".player-hand-button-desktop").style.outline = `20px solid var(--${hand}-gradient-1)`;

    delayedComputerChoice(computerChoice);
  }

  decideWinner(playerChoice, computerChoice);
}

const setComputerChoice = () => {
  const choicesArray = ["rock", "paper", "scissors", "lizard", "spock"];
  const randomChoice = Math.floor(Math.random() * choicesArray.length);
  return choicesArray[randomChoice];
}

function delayedComputerChoice (computerChoice){
  setTimeout(()=>{

    if (window.innerWidth < 1024) {
      chosenHands.style.display = "flex";
  
      //Replace images for buttons + add styling according to chosen hand
      document.getElementById("computer-picked-hand").src = `./images/icon-${computerChoice}.svg`;
      document.querySelector(".computer-hand-button").style.outline = `10px solid var(--${computerChoice}-gradient-1)`;
      document.querySelector(".computer-hand-button").style.visibility = "visible"
    }
    else{
      chosenHandsDesktop.style.display = "flex";
  
      //Replace images for buttons + add styling according to chosen hand
  
      document.getElementById("computer-picked-hand-desktop").src = `./images/icon-${computerChoice}.svg`;
      document.querySelector(".computer-hand-button-desktop").style.outline = `20px solid var(--${computerChoice}-gradient-1)`;
      document.querySelector(".computer-hand-button-desktop").style.visibility = "visible"
    }

  }, 500);
};

function decideWinner(userHand, computerHand){
  if (userHand === computerHand){
    displayResult("YOU TIED");
  } else if (choices[userHand].defeats.includes(computerHand)) {
    displayResult("YOU WIN");
    //document.getElementById("player-picked-hand").classList.add("winner");
    increaseScore(1);
  } else {
    displayResult("YOU LOSE");
    decreaseScore(1);
    //document.getElementById("computer-picked-hand").classList.add("winner");
  };
};

function displayResult (finalResult) {

  setTimeout(()=>{
    if (window.innerWidth < 1024) {
      document.querySelector(".game-results-mobile h1").innerText = finalResult;
      gameResultsMobile.style.display = "flex";
    } else {
      document.querySelector(".game-results-desktop h1").innerText = finalResult;
      gameResultsDesktop.style.display = "flex";
    }
  }, 1500);
}

function increaseScore(increment){
  score += increment;
  document.querySelector(".scoreboard-number").innerText = score;
}

function decreaseScore(decrement){
  score -= decrement;
  document.querySelector(".scoreboard-number").innerText = score;
}

function playAgain () {
  chosenHands.style.display = "none";
  chosenHandsDesktop.style.display = "none";
  gameResultsMobile.style.display = "none";
  gameResultsDesktop.style.display = "none";
  document.querySelector(".computer-hand-button").style.visibility = "hidden";
  document.querySelector(".computer-hand-button-desktop").style.visibility = "hidden";
  choiceButtons.style.display = "flex";
}

rulesButton.addEventListener("click", function() {
  document.getElementById("overlay").style.display = "block";
  document.querySelector(".rules-popup").style.display = "flex";
});
