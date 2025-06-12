const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hogwarts Tic-Tac-Toe</title>
  <style>
    body {
      background: #1b1b2f;
      color: #f8f8f2;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }

    h1 {
      font-family: 'Harry P', cursive;
      font-size: 3rem;
      color: #ffcb05;
      text-shadow: 2px 2px #7f0909;
      margin-bottom: 20px;
    }

    #board {
      display: grid;
      grid-template-columns: repeat(3, 100px);
      grid-template-rows: repeat(3, 100px);
      gap: 10px;
    }

    .cell {
      background-color: #3e3e5a;
      border: 2px solid #ffcb05;
      font-size: 2.5rem;
      color: #f8f8f2;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .cell:hover {
      transform: scale(1.05);
      background-color: #504a75;
    }

    #status {
      margin-top: 20px;
      font-size: 1.5rem;
      color: #ffcb05;
      text-shadow: 1px 1px #000;
    }

    #reset {
      margin-top: 10px;
      padding: 10px 20px;
      background: #ffcb05;
      color: #1b1b2f;
      border: none;
      font-weight: bold;
      border-radius: 5px;
      cursor: pointer;
    }

    #reset:hover {
      background: #ffe666;
    }

    @font-face {
      font-family: 'Harry P';
      src: url('https://fonts.cdnfonts.com/s/16954/HARRYP__.TTF') format('truetype');
    }
  </style>
</head>
<body>
  <h1>Hogwarts Tic-Tac-Toe</h1>
  <div id="board"></div>
  <div id="status">Player X's turn</div>
  <button id="reset">Accio Restart</button>

  <script>
    const board = document.getElementById('board');
    const statusText = document.getElementById('status');
    const resetBtn = document.getElementById('reset');
    let cells = [];
    let currentPlayer = 'X';
    let gameActive = true;

    function checkWin() {
      const winCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];

      for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent) {
          gameActive = false;
          statusText.textContent = \⚡ Player \${cells[a].textContent} wins! Expecto Victory!\;
          return;
        }
      }

      if ([...cells].every(cell => cell.textContent !== '')) {
        gameActive = false;
        statusText.textContent = "🎉 It's a draw! Mischief Managed!";
      }
    }

    function handleClick(e) {
      if (!gameActive || e.target.textContent) return;

      e.target.textContent = currentPlayer;
      checkWin();

      if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = \Player \${currentPlayer}'s turn\;
      }
    }

    function resetGame() {
      cells.forEach(cell => cell.textContent = '');
      currentPlayer = 'X';
      gameActive = true;
      statusText.textContent = "Player X's turn";
    }

    function createBoard() {
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
        cells.push(cell);
      }
    }

    resetBtn.addEventListener('click', resetGame);

    createBoard();
  </script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log(`⚡ Server running at http://localhost:\${PORT}`);
});
