// alert("working");


// Deck of cards and variables
var card = [];
var player = [];
var dealer = [];
var cardCount = 0;
var dollars = 1000;
var endGame = false;
var suits = ["spades", "diams", "clubs", "hearts"];
var number = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var message = document.getElementById('message');
var display = document.getElementById('display');
var dealerPlate = document.getElementById('dealerPlate');
var playerPlate = document.getElementById('playerPlate');
var pValue = document.getElementById('pValue');
var dValue = document.getElementById('dValue');
var dollarValue = document.getElementById('dollar');

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


// Start game and pick random cards
function start() {
// var random = Math.floor(Math.random()*52) ;
// display.innerHTML += "<span style='color:" + card[random].bgcolor + "'>&" + card[random].icon + ";" + card[random].cardnum + "</span>  ";
// }
    // displayCard();
    shuffle(card);
    newDeal();
    document.getElementById('start').style.display = 'none'; //hide start button after user clicks
    document.getElementById('dollar').innerHTML = dollars;
}

// Dealing new deck of cards, initial draw
function newDeal(){
     player = [];
     dealer = [];
     dealerPlate.innerHTML = "";
     playerPlate.innerHTML = "";

   // Pulling info from HTML to perform actions
    var betValue = document.getElementById('playerBet').value; //picks up value of player's bet
    dollars = dollars - betValue;
    document.getElementById('dollar').innerHTML = dollars;
    document.getElementById('myactions').style.display = 'block'; //makes action buttons show
    message.innerHTML = "Get Lucky and beat the dealer to win.<br>Current bet is $"+betValue; // bet message
    document.getElementById('playerBet').disabled = true; //disables bet input field
    document.getElementById('max').disabled = true; //disables max button
    deal(); // invoke deal function to reshuffle
}

// Contents of deal
function deal(){
    console.log(card);
    //card count reshuffle
     for(var x = 0; x < 2; x++){
         dealer.push(card[cardCount]);
         dealerPlate.innerHTML += cardOutput(cardCount, x);
         if (x == 0) {
            dealerPlate.innerHTML += '<div id="hide" style="left:100px;"></div>';
         }
         cardCount++
         player.push(card[cardCount]);
         playerPlate.innerHTML += cardOutput(cardCount, x);
         cardCount++
     }
     pValue.innerHTML = total(player);
     console.log(dealer);
     console.log(player);
}


// For symbols on card
function cardOutput(n, x){
    var position = (x > 0) ? x * 60 + 100 : 100;
    return '<div class="icard ' + card[n].icon + '" style="left:' + position + 'px;">  <div class="top-card suit">' + card[n].cardnum + '<br></div>  <div class="middle-card suit"></div>  <div class="bottom-card suit">' + card[n].cardnum +
    '<br></div> </div>';
}  


// Player actions for buttons
function cardAction(a){
    console.log(a);
    switch (a) {
        case 'hit' :
            playCard(); //add new card to player's hand
        break;
        case 'hold' :
            playEnd(); //play out and calculate
        break;
        case 'double' : // double bet amount for player and remove value from dollars
            playCard();
            playEnd(); 
        break;
        default:
            console.log('end');
            playEnd();
    }
}

//Grabs next card and pushes to player's array for HIT
function playCard() { 
    player.push(card[cardCount]);
    playerPlate.innerHTML += cardOutput(cardCount, (player.length - 1)); // positions next card for 'hit'
    cardCount++;
    var current = total(player); //checks total of player's hand
    pValue.innerHTML = current;
    if (current > 21) {
        message.innerHTML = "Busted!";
        playEnd();
    }
}

// End game for player
function playEnd() {
    endGame = true;
    document.getElementById('hide').style.display = 'none';
    document.getElementById('myactions').style.display = 'none';
    document.getElementById('btndeal').style.display = 'block';
    document.getElementById('playerBet').disabled = false; 
    document.getElementById('max').disabled = false;
    message.innerHTML = "Deal Again!";
    var payout = 1;
    // checks dealer's score
    var dealerValue = total(dealer);
    dValue.innerHTML = dealerValue;

    while (dealerValue < 17) { //check values of the dealer card to determine to draw more cards
        dealer.push(card[cardCount]);
        dealerPlate.innerHTML += cardOutput(cardCount, (dealer.length - 1)); 
        cardCount++;
        dealerValue = total(dealer);
        dValue.innerHTML = dealerValue;
    }
    // check to see if dealer or player wins
    var playerValue = total(player);
        if (playerValue == 21 && player.length == 21) {
        message.innerHTML = "Player BlackJack";
        payout = 1.5;
    }
    var betValue = parseInt(document.getElementById('playerBet').value)*payout;
        if ((playerValue < 22 && dealerValue < playerValue) || (dealerValue > 21 && playerValue < 22)) {
            message.innerHTML += '<span style="color:green;">CONGRATS! You won $'+betValue+'</span>';
            dollars = dollars + (betValue * 2);
        } //check if dealer wins
        else if (playerValue > 21) {
            message.innerHTML += '<span style="color:red;">Dealer Wins! You lost $'+betValue+'</span>';
        }
        else if (playerValue == dealerValue) {
            message.innerHTML += '<span style="color:purple;">PUSH!</span>';
            dollars = dollars + betValue;
        }
        else {
            message.innerHTML += '<span style="color:red;">Dealer Wins! You lost $'+betValue+'</span>';
        }

    pValue.innerHTML = dealerValue;
    dollarValue.innerHTML = dollars;
}

// Checks total score and ACE adjustment
function total(argu){
    var current = 0; // loops thru array and has a value to hold
    var aceAdjust = false;
    //if ACE is detected, take the value and equal to 11
    for(var i in argu) {
        if (argu[i].cardnum == 'A' && !aceAdjust) { 
            aceAdjust = true;
            current = current + 10;
        }
        current = current + argu[i].cardvalue;
    }
    if( aceAdjust && current > 21){
        current = current - 10;  
    }
    return current;
}
 

// Shuffle Deck
function shuffle(array){
 for(var i = array.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j]
    array[j] = temp;
 }
 return array;
}

// Displaying cards for player and dealer
function displayCard() {
    display.innerHTML +=  "<span style='color:" + card[cardCount].bgcolor + "'>" + card[cardCount].cardnum + "&" + card[cardCount].icon + ";</span>  ";
}


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
