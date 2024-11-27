const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];

// Modal and restart button
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const restartButton = document.getElementById('restart-button');

function handleClick(event) {
  const index = event.target.getAttribute('data-cell-index');
  
  // If the cell is already filled, do nothing
  if (gameState[index] !== '') return;
  
  // Fill the cell with the current player's marker
  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  // Change tile color based on the current player
  if (currentPlayer === 'X') {
    event.target.style.backgroundColor = 'green';
  } else {
    event.target.style.backgroundColor = 'red';
  }

  // Check for a winner
  if (checkWinner()) {
    modalMessage.textContent = `${currentPlayer} wins!`;
    modal.style.display = 'flex';
    return;
  } else if (gameState.every(cell => cell !== '')) { // Check for a tie
    modalMessage.textContent = "Game Tie! Try again.";
    modal.style.display = 'flex';
    return;
  }

  // Switch turns
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor = '';  // Reset background color
  });
  currentPlayer = 'X';
  modal.style.display = 'none'; // Hide the modal
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', resetGame);
