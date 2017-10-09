// alert("working");

// start game

// display initial draw

// Deck of cards
var card = [];
var suits = ["spades", "diams", "clubs", "hearts"];
var number = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var display = document.getElementById("display");
for (s in suits) { //for...in loop returns all enumerable properties (including non-interger names)
    var suit = suits[s][0].toUpperCase(); // pulling from array
    var bgColor = (suit == "S" || suit == "C") ? "black" : "red";
    for (n in number) {
    // display.innerHTML += "<span style='color:" + bgColor + "'>&" + suits[s] + ";" + number[n] + "</span> ";    
// Card OBJECT build to utilize card and output to HTML
    var cardValue = (n > 9) ? 10 : parseInt(n) + 1;
    var cardSuit = {
        suit: suit,
        icon: suits[s],
        bgcolor: bgColor,
        cardnum: number[n],
        cardvalue: cardValue
    }
    card.push(cardSuit);
    }
}

console.log(card);


// Picking random card
function randoCard() {
var random = Math.floor(Math.random()*52) ;
display.innerHTML += "<span style='color:" + card[random].bgcolor + "'>&" + card[random].icon + ";" + card[random].cardnum + "</span>  ";
}
randoCard();


// tally player and dealer score from initial draw
    // both player and dealer should have arry[0] for 5 cards
    // dealer has one card face down, one face up
    // player has both card face up

// actions to be enabled
    // dealing cards from deck (array[52])
    // adding two cards to player's hand
    // having player hit or stand
    // begin round
    // end round with score
    // shuffle deck

// if dealer or player > 21, bust
    // if d or p has ACE and 4, soft 15
    // if d or p has hand of 10, bust - 'hard' hand

// card logic
    // if player has cards(*2) = 17-21, stand
    // if player has cards(*2) = 2-16, hit
    // if first two cards = 9-11, double down (add bet of >= to current..will receive one additional card)
    // may double down on hard 12 || >

// dealer loop
    // if dealer has blackjack, player LOSE
    // round 2 start
    // break loop
        // else dealer keeps drawing til 17 or bust
    // if dealer has 22 || >, BUST
        // else if dealer is 17 || > , dealer stands

// player loop
    // if player has blackjack, player WINS
    // round 2
    // break player loop
        // else if player draws 17-21, stand
    // if player has 22 >, bust
        // else if player is < 17, stand or hit

// compare hands
    // closer to 21, wins
    // if game ==, game is PUSH
    // if dealer and player has blackjack, PUSH
    // re-shuffle deck
    // deal again

// ace = 1 or 11
// 2-9 == exact
// J, Q, K = 10

// nice to haves (icebox)
    // monies / chips for player
    // betting monies 
    // allow player to surrender after first two cards / lose bet
    // score keeping of player vs dealer

//read.md draft
    // proj description
    // showcase screenshots of tests and explain why
        // break down into end to end test
        // code tests
    // showcase process
    // built with...html, css, js, jq
    // versioning via git repo
    // acknowledgements
        // hat's off to resources
        // inspiration
    


// init() {
//     var cardsShuffle = 52;
//     var shuffle = new Array (52);
//     deck.forEach(function(card) {
//         shuffle[randomNumber] = card;
//     })
// }

// var deck = [];
// obj {
//     suit
//     value
//     number
// }

// deck = [1, 2, 3, 4, 5];
// cardsShuffle = 52;
// var shuffled = [];
// for(var i = 0; i < 52; i++){
//     shuffled.push(deck.splice(randomNumber(0, deck.length -1)));
// }
