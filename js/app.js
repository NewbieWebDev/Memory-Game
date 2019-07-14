/*
 * Create a list that holds all of your cards
 */

/*******************CREATE CARDS PROGRAMMATICALLY*******************************/

let deckCard = document.querySelector(".deck");

let cards = [
  "fa-diamond",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-anchor",
  "fa-bolt",
  "fa-bolt",
  "fa-cube",
  "fa-cube",
  "fa-leaf",
  "fa-leaf",
  "fa-bicycle",
  "fa-bicycle",
  "fa-bomb",
  "fa-bomb"
];

function generateCards(card) {
  return `<li class="card" data-name=${card}><i class="fa ${card}"></i></li>`;
}

function gameInit() {
  let cardHtml = shuffle(cards).map(function(card) {
    return generateCards(card);
  });
  deckCard.innerHTML = cardHtml.join("");
}

gameInit();

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/***********************************MEMORY GAME START**********************/
/*LIST OF CARDS*/

let containerCard = document.querySelectorAll(".card");
let listCard = [...containerCard];

/* ARRAY TO STORE THE CARDS OPEN*/
let boxOpenCard = [];

/* ARRAY TO STORE ALL THE CARDS MATCHED*/

let boxMatchCard = [];

/* FUNCTION TO INSERT THE CARDS IN THE BOX  STORING ONLY 2 CARD */

function insertCard(cards) {
  boxOpenCard.push(cards);
  boxOpenCard.splice(3, 1);
}

/* FUNCTION TO REMOVE CLASS TO DISPLAY CARD*/

function removeClass() {
  boxOpenCard.forEach(card => {
    card.classList.remove("open", "show");
    clearArray();
  });
}

/* EMPTY THE ARRAY THAT CONTAINS THE CARDS*/

function clearArray() {
  boxOpenCard = [];
  return boxOpenCard;
}

/* EVENT LISTENER TO FLIP THE CARDS ADDING THE CLASSES*/

listCard.forEach(function(card) {
  card.addEventListener("click", function() {
    if (
      !card.classList.contains("open") &&
      !card.classList.contains("show") &&
      !card.classList.contains("match")
    ) {
      card.classList.add("open", "show");
      insertCard(card);

      if (boxOpenCard.length >= 2) {
        checkMatch();

        if (boxOpenCard.length >= 3) {
          card.classList.remove("open", "show");
        }
      }
    }
  });
});

function insertMatch(x, y) {
  boxMatchCard.push(x, y);
}

/* FUNCTION TO CHECK IF THE CARDS MATCH*/

function checkMatch() {
  if (boxOpenCard[0].dataset.name === boxOpenCard[1].dataset.name) {
    let card1 = boxOpenCard[0];
    let card2 = boxOpenCard[1];
    card1.classList.add("match");
    card1.classList.remove("open", "show");
    card2.classList.add("match");
    card2.classList.remove("open", "show");
    insertMatch(card1, card2);
    moveCounter();
    setTimeout(clearArray, 1000);
  } else {
    moveCounter();
    setTimeout(removeClass, 500);
  }
}

/*********************************************************************************************************/
/************************************MEMORY GAME FEATURE*************************************************/

let restartButton = document.querySelector(".restart");
let counterMoves = document.querySelector("span.moves");

/******** COUNTING MOVES********/
let moves = 0;

function moveCounter() {
  moves++;
  counterMoves.innerHTML = moves;
}

/**RESTART BUTTON */

function restart() {
  listCard.forEach(card => {
    card.classList.remove("open", "show", "match");
  });
  boxOpenCard = [];
  boxMatchCard = [];
  moves = 0;
  counterMoves.innerHTML = moves;
}

restartButton.addEventListener("click", restart);

/**MODAL*/

let modal = document.querySelector(".modal");

function displayModal() {
  modal.classList.add("show-modal");
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */