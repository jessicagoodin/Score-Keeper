// BELOW IS FOR MAIN FUNCTIONALITY, NEEDED FOR EVERY PAGE

// NAVBAR BURGER IS-ACTIVE TOGGLE

document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  });



// BELOW IS SPECIFIC TO EACH SPORT

// VARIABLES FOR GOLF CARD

const reset = document.querySelector('#reset');
const playTo = document.querySelector('#playto');
let winningScore = 3; // let so it can change

// CONVERTING P1 AND P2 VARIABLES TO OBJECTS FOR REFACTORING

const player1 = {
    button: document.querySelector('#p1button'), // to add 1 to score
    score: 0, // Keeps track of score
    display: document.querySelector('#p1display') // the number that displays on page
}

const player2 = {
    button: document.querySelector('#p2button'),
    score: 0,
    display: document.querySelector('#p2display'),
}

// UPDATE SCORE FUNCTION, PASSING OBJECTS THRU AS ARGS
// If more than 2 players, opponent param needs to be array of opponents that can be looped thru

function updateScore(player, opponent) {
    if (!gameOver) {
        player.score += 1;
    if (player.score === winningScore) {
        gameOver = true;
        player.display.classList.add('has-text-success');
        opponent.display.classList.add('has-text-danger');
        player.button.disabled = true;
        opponent.button.disabled = true;
    }
    player.display.textContent = player.score;
    } 
};

// RESET FUNCTION - REFACTORED TO LOOP IN THE CASE OF MORE THAN 2 PLAYERS.
// If more than 2 players, simply add players to array in for loop.

function resetFunc() {
    gameOver = false;
    for (let p of [player1, player2]) {
        p.score = 0;
        p.display.textContent = p.score;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
};

// TO KEEP TRACK OF GAME OVER STATUS:

let gameOver = false;

// WHEN BUTTON IS PRESSED, VALUE OF SCORE AND DISPLAY ARE UPDATED USING UPDATE SCORE FUNC

player1.button.addEventListener('click', function() {
    updateScore(player1, player2);
});

player2.button.addEventListener('click', function() {
    updateScore(player2, player1);
});

reset.addEventListener('click', resetFunc);

playTo.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    resetFunc();
});