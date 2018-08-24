// Arrays & Global Variables
let cardGraphics = ['fa fa-diamond', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];

let openCards = [];
let pairs = [];

const deck = document.querySelector('.deck');
const refresh = document.querySelector('.restart');

let allStars = document.querySelector('.stars');
let time = 0;
let turns = 0;

// Dynamically create the cards
function createTheCards() {

    for (let a = 0; a < cardGraphics.length; a++) {
        const b = document.createElement('li');
        b.classList.add('card');
        b.innerHTML = `<i class="${cardGraphics[a]}"></i>`;
        deck.appendChild(b);
    }
}
    // Make the cards click-able
   deck.addEventListener('click', e => {
        const c = e.target;
        c.classList.add('open', 'show');
        openCards.push(c);

        const openCardOne = openCards[0];
        const openCardTwo = openCards[1];

        // "Memory Game Logic" Do they match? And if then, what?
        if (openCards.length === 2 && openCardTwo.innerHTML === openCardOne.innerHTML) {
            pairs.push(openCards);
            openCardTwo.classList.add('match');
            openCardOne.classList.add('match');
            movesCounter();
            starsBeGone();
            openCards = [];
            gameOver();
            }

            // But, what if they don't match?
            else if (openCards.length === 2  && openCardTwo !== openCardOne ) {
                setTimeout(function () {
                    openCardTwo.classList.remove('open', 'show');
                    openCardOne.classList.remove('open', 'show');
                    }, 625);
                movesCounter();
                starsBeGone();
                openCards = [];
                }

    });

    // If all the cards are matched,
    function gameOver() {
        if (pairs.length === 8) {
            timerStopPlease();
            youWinOn();
        }
    }

    // Move Counter
    const counter = document.querySelector('.moves');
    function movesCounter() {
        turns++;
        counter.innerHTML = turns;

    }

    // Star Rating
     function starsBeGone() {
        if (turns === 33) {
            allStars.innerHTML = '<li><i class="fa fa-star"></i></li>';
        }

        if (turns === 13) {
            allStars.innerHTML = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
        }
    }

   // Timer
   let stopWatch = setInterval(timer, 1000);

        function timer() {
            time++;
            let toTheSecond = document.querySelector('.tothesecond').innerHTML = time;
        }

        function timerStopPlease() {
            clearInterval(stopWatch);
        }

        function timerRestartPlease() {
            stopWatch = setInterval(timer, 1000);
        }

    // Restart Button
    refresh.addEventListener('click', e => {
        restart();
        });

    function restart() {
        pairs = [];
        time = 0;
        timerRestartPlease();
        turns = 0;
        counter.innerHTML = 0;
        allStars.innerHTML = '<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>';
        deck.innerHTML = '';
        gameOn();
    }

    // Shuffle
    function shuffleIt() {
        let cardGraphicsShuffled = shuffle(cardGraphics);
    }

        // Shuffle function from http://stackoverflow.com/a/2450976
        function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        }

    // Popup "You Are A Winner"
    const youWin = document.querySelector('.youwin');

    function youWinOn() {
        youWin.style.display = 'block';
        let youWinText = document.querySelector('.youwintext');
        youWinText.innerHTML = `<br /><br /> YOU ARE A WINNER! <br /><br /> You won the game in ${time} seconds with ${turns} moves. <br /><br /> ${allStars.innerHTML} <br /><br />`;
    }
        youWin.addEventListener('click', e => {
            youWin.style.display = 'none';
        });

        const playAgainButton = document.querySelector('.playagainbutton');
        playAgainButton.addEventListener('click', e => {
            restart();
        });


    // New Game
    function gameOn() {
        cardGraphicsShuffled = shuffle(cardGraphics);
        createTheCards();
        //timer();
    }

gameOn();