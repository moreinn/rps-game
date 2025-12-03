// selecting all buttons 
// simple RPS with localStorage best score
const buttons = document.querySelectorAll('.move');
const resultEl = document.getElementById('result');
const playerScoreEl = document.getElementById('user-score');
const computerScoreEl = document.getElementById('computer-score');
const bestScoreEl = document.getElementById('best-score');
const resetBtn = document.getElementById('reset');

let playerScore = 0;
let computerScore = 0;
const LOCAL_KEY = 'rps_best_score';

// localStorage helpers
function getLocalBest(){ const v = localStorage.getItem(LOCAL_KEY); return v ? Number(v) : 0; }
function setLocalBest(v){ localStorage.setItem(LOCAL_KEY, String(v)); bestScoreEl.textContent = v; }

// init display
bestScoreEl.textContent = getLocalBest();
playerScoreEl.textContent = playerScore;
computerScoreEl.textContent = computerScore;

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const player = btn.id;                  // 'rock' | 'paper' | 'scissor'
    const comp = computerPlay();
    const outcome = playRound(player, comp);
    resultEl.textContent = outcome.message;
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;

    // update local best if applicable
    const localBest = getLocalBest();
    if (playerScore > localBest) {
      setLocalBest(playerScore);
    }
  });
});

resetBtn.addEventListener('click', () => {
  playerScore = 0; computerScore = 0;
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  resultEl.textContent = 'Scores reset.';
});

function computerPlay(){
  const choices = ['rock','paper','scissor'];
  const idx = Math.floor(Math.random()*choices.length);
  return choices[idx];
}

function playRound(playerSelection, computerSelection){
  if (playerSelection === computerSelection) {
    return { winner: 'tie', message: `It's a tie! Both chose ${playerSelection}.` };
  }

  const win = (playerSelection === 'rock' && computerSelection === 'scissor') ||
              (playerSelection === 'paper' && computerSelection === 'rock') ||
              (playerSelection === 'scissor' && computerSelection === 'paper');

  if (win) {
    playerScore++;
    return { winner: 'player', message: `You Win! ${playerSelection} beats ${computerSelection}.` };
  } else {
    computerScore++;
    return { winner: 'computer', message: `You lose! ${computerSelection} beats ${playerSelection}.` };
  }
}
