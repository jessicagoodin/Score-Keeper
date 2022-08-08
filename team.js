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

// VARIABLES FOR TEAMS CARD, SIMPLE SCORING

const reset = document.querySelector('#reset');

// const playTo = document.querySelector('#playto');
// let winningScore = 3; // let so it can change - DON'T NEED FOR TEAMS, WE PLAY UNTIL TIME IS UP -- ADDING END OF GAME BUTTON FOR THIS.

// CONVERTING team1 AND team2 VARIABLES TO OBJECTS FOR REFACTORING

const team1 = {
    button: document.querySelector('#t1button'), // to add 1 to score
    score: 0, // Keeps track of score
    display: document.querySelector('#t1display') // the number that displays on page
}

const team2 = {
    button: document.querySelector('#t2button'),
    score: 0,
    display: document.querySelector('#t2display'),
}

const endGame = {
    button: document.querySelector('#endgame'),
}

// UPDATE SCORE FUNCTION, PASSING OBJECTS THRU AS ARGS
// If more than 2 teams, opponent param needs to be array of opponents that can be looped thru

function updateScore(team, opponent) {
    if (!gameOver) {
        team.score += 1;
    // if (team.score > opponent.score && gameOver) {
    //     team.display.classList.add('has-text-success');
    //     opponent.display.classList.add('has-text-danger');
    //     team.button.disabled = true;
    //     opponent.button.disabled = true;
    // }
    // if (team.score < opponent.score && gameOver) {
    //     team.display.classList.add('has-text-danger');
    //     opponent.display.classList.add('has-text-success');
    //     team.button.disabled = true;
    //     opponent.button.disabled = true;
    // }

    team.display.textContent = team.score;
    } 
};

// RESET FUNCTION - REFACTORED TO LOOP IN THE CASE OF MORE THAN 2 PLAYERS.
// If more than 2 players, simply add players to array in for loop.
// issues:

function resetFunc() {
    gameOver = false;
    for (let t of [team1, team2]) {
        t.score = 0;
        t.display.textContent = t.score;
        t.display.classList.remove('has-text-success', 'has-text-danger');
        t.button.disabled = false;
    }
    endGame.button.disabled = false;
};

// END OF GAME FUNCTION
// issues: 
// clicking doesn't disable end game button.
// clicking doesn't set display score numbers to red and green

function endFunc() {
    gameOver = true;
    team1.button.disabled = true;
    team2.button.disabled = true;
    endGame.button.disabled = true;
    if (team2.score > team1.score) {
        team1.display.classList.add('has-text-danger');
        team2.display.classList.add('has-text-success');
    } else {
        team2.display.classList.add('has-text-danger');
        team1.display.classList.add('has-text-success');
    }
};

// TO KEEP TRACK OF GAME OVER STATUS:

let gameOver = false;

// WHEN BUTTON IS PRESSED, VALUE OF SCORE AND DISPLAY ARE UPDATED USING UPDATE SCORE FUNC

team1.button.addEventListener('click', function() {
    updateScore(team1, team2);
});

team2.button.addEventListener('click', function() {
    updateScore(team2, team1);
});

reset.addEventListener('click', resetFunc);

endGame.addEventListener('click', endFunc);

// playTo.addEventListener('change', function () {
//     winningScore = parseInt(this.value);
//     resetFunc();
// });