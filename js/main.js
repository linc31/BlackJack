var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];

var randomRating = Math.random() * 10; //dealing cards one at a time

var randomScore = Math.floor(Math.random()*52+1);
console.log("I got the score " + randomScore);

//dealing for two inital cards
function twoRandomScores(score1, score2) {
    return score1 + score2;
}
// twoRandomScores(2, 8);

myArray[Math.floor(Math.random() * myArray.length)];


// potential scoring system
var deal = Math.floor(Math.random()*52+1);
var final = deal % 13;

if (deal > 1 && deal <= 13) {
console.log(final);
//console.log("I got "+ deal+ " of Hearts");

}

else if (deal > 14 && deal <= 26) {
console.log(final);
//console.log("I got "+ deal+ " of Diamonds");
}

else if (deal > 27 && deal <= 39) {
console.log(final);
//console.log("I got "+ deal+ " of Clubs")
}

else if (deal > 40 && deal <= 52 ) {
console.log(final);
//console.log("I got "+ deal+ "of Spades");
}

// assign correct blackjack to values
var outcome = "";
var deal = Math.floor(Math.random*40+1);
if (deal % 2 === 0) {
    var outcome = "even"
} else {
    var outcome ="odd"
}

// start game

// display initial draw

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
    