const N_ROWS = 6;
const N_COLUMNS = 7;

let player = 1;
let countTurn = 0;
let board = new Array();
let scorePlayer1 = document.getElementById("scorePlayer1").innerHTML;
let scorePlayer2 = document.getElementById("scorePlayer2").innerHTML;

init();

if (player == 1)
  document.getElementById("turnPlayer").innerHTML = "C'est à " + document.getElementById("player1").value + " de jouer !";
else
  document.getElementById("turnPlayer").innerHTML = "C'est à " + document.getElementById("player2").value + " de jouer !";

function init() {
  const puissance_4 = document.getElementById("puissance_4");
  const table = document.createElement("table");

  for (let i = 0; i < N_ROWS; i++) {
    const tr = table.appendChild(document.createElement("tr"));
    tr.id = "r" + i;
    board[i] = new Array();
    for (let j = 0; j < N_COLUMNS; j++) {
      const td = tr.appendChild(document.createElement("td"));
      board[i][j] = 0;
      td.id = "r" + i + "c" + j;
      td.addEventListener("click", play_event);
    }
  }
  puissance_4.appendChild(table);
}

function play_event() {
  let col = Number(this.id.charAt(3));
  let row = N_ROWS - 1;
  while (row > -1) {
    if (board[row][col] == 0) {
      let td = document.getElementById("r" + row + "c" + col);
      if (player == 1) {
        td.style.backgroundColor = "rgb(255, 0, 0)";
        document.getElementById("turnPlayer").innerHTML = "C'est à " + document.getElementById("player2").value + " de jouer !";
      } else {
        td.style.backgroundColor = "rgb(255, 255, 0)";
        document.getElementById("turnPlayer").innerHTML = "C'est à " + document.getElementById("player1").value + " de jouer !";
      }

      board[row][col] = player;
      check_win(row, col);
      player = 3 - player;
      row = -1;
    } else {
      row--;
      if (row == -1)
        alert("La colonne est pleine !\nVeuillez choisir un autre emplacement.");
    }
  }
}

function check_win(i, j) {
  // Vérification horizontale
  let horizontal = 0;
  let countHorizontal = 0;
  
  while (horizontal < N_COLUMNS) {
    if (board[i][horizontal] == player) {
      horizontal++;
      countHorizontal++;
    } else if (board[i][horizontal] !== player && countHorizontal == 4) {
      horizontal++;
    } else {
      horizontal++;
      countHorizontal = 0;
    }
  }

  // Vérification verticale
  let vertical = 0;
  let countVertical = 0;
  
  while (vertical < N_ROWS) {
    if (board[vertical][j] == player) {
      vertical++;
      countVertical++;
    } else if (board[vertical][j] !== player && countVertical == 4) {
      vertical++;
    } else {
      vertical++;
      countVertical = 0;
    }
  }

  // Vérification diagonale
  let countDiagonal = 0;
  let diagonal = -Math.min(i, j);

  while (i + diagonal < N_ROWS && j + diagonal < N_COLUMNS && i + diagonal >= 0 && j + diagonal >= 0) {
    if (board[i + diagonal][j + diagonal] == player) {
      diagonal++;
      countDiagonal++;
    } else if (board[i + diagonal][j + diagonal] !== player && countDiagonal == 4) {
      diagonal++;
    } else {
      diagonal++;
      countDiagonal = 0;
    }
  }

  // Vérification anti-diagonale
  let countAntiDiagonal = 0;
  let antiDiagonal = -Math.min(i, N_COLUMNS - 1 - j);
  while (i + antiDiagonal < N_ROWS && j - antiDiagonal < N_COLUMNS && i + antiDiagonal >= 0 && j - antiDiagonal >= 0) {
    if (board[i + antiDiagonal][j - antiDiagonal] == player) {
      antiDiagonal++;
      countAntiDiagonal++;
    } else if (board[i + antiDiagonal][j - antiDiagonal] !== player && countAntiDiagonal == 4) {
      antiDiagonal++;
    } else {
      antiDiagonal++;
      countAntiDiagonal = 0;
    }
  }

  if (countHorizontal >= 4 || countVertical >= 4 || countDiagonal >= 4 || countAntiDiagonal >= 4) {
    let winner;
    if (player == 1) {
      scorePlayer1++;
      winner = document.getElementById("player1").value;
    }
    else {
      scorePlayer2++;
      winner = document.getElementById("player2").value;
    }

    setTimeout(() => {
        alert(`${winner} A GAGNÉ LA PARTIE !`);
        document.getElementById("scorePlayer1").innerHTML = scorePlayer1;
        document.getElementById("scorePlayer2").innerHTML = scorePlayer2;
        reset();
      }, 50);
  }

  countTurn++;

  if (countTurn == N_ROWS * N_COLUMNS) {
    setTimeout(() => {
      alert(`ÉGALITÉ !`);
      reset();
    }, 50);
  }
}

function reset() {
  countTurn = 0;
  for (let i = 0; i < N_ROWS; i++) {
    for (let j = 0; j < N_COLUMNS; j++) {
      let td = document.getElementById("r" + i + "c" + j);
      td.style.backgroundColor = "rgb(190, 190, 190)";
      board[i][j] = 0;
    }
  }
}
