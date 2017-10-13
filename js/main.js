
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
var display = document.getElementById('display').style.justifyContent = "center";
var dealerPlate = document.getElementById('dealerPlate');
var playerPlate = document.getElementById('playerPlate');
var pValue = document.getElementById('pValue');
var dValue = document.getElementById('dValue');
var dollarValue = document.getElementById('dollar');

document.getElementById('playerBet').onchange = function () {
    if (this.value < 0) { this.value = 0; }
    if (this.value > dollars) { this.value = dollars; }
    message.innerHTML = "Bet changed to $" + this.value;
}

for (s in suits) { //for...in loop returns all enumerable properties (including non-interger names)
    var suit = suits[s][0].toUpperCase(); // pulling from array
    var bgColor = (suit == "S" || suit == "C") ? "black" : "red";

    for (n in number) { 
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
    shuffle(card);
    newDeal();
    document.getElementById('start').style.display = 'none'; //hide start button after user clicks
    document.getElementById('dollar').innerHTML = dollars;
}

// Dealing new deck of cards, initial draw
function newDeal() {
    dValue.innerHTML = "?";
    player = [];
    dealer = [];
    dealerPlate.innerHTML = "";
    playerPlate.innerHTML = "";

    // Pulling info from HTML to perform actions
    var betValue = document.getElementById('playerBet').value; //picks up value of player's bet
    dollars = dollars - betValue;
    document.getElementById('dollar').innerHTML = dollars;
    document.getElementById('myactions').style.display = 'block'; //makes action buttons show
    message.innerHTML = "Get lucky and beat the dealer to win.<br>Current bet is $" + betValue; // bet message
    document.getElementById('playerBet').disabled = true; //disables bet input field
    document.getElementById('max').disabled = true; //disables max button
    deal(); // invoke deal function to reshuffle
    document.getElementById('btndeal').style.display = 'none';
}

// Re shuffle deck of cards during gameplay
function redeal() {
    cardCount++;
    if (cardCount > 30) {
        shuffle(card);
        cardCount = 0;
    }
}

// Contents of deal
function deal() {
    //card count reshuffle
    for (var x = 0; x < 2; x++) {
        dealer.push(card[cardCount]);
        dealerPlate.innerHTML += cardOutput(cardCount, x);
        if (x == 0) {
            dealerPlate.innerHTML += '<div id="hide" style="left:100px;"></div>';
        }
        redeal();
        player.push(card[cardCount]);
        playerPlate.innerHTML += cardOutput(cardCount, x);
        redeal();
    }
    pValue.innerHTML = total(player);
}


// For symbols on card
function cardOutput(n, x) {
    var position = (x > 0) ? x * 60 + 100 : 100;
    return '<div class="icard ' + card[n].icon + '" style="left:' + position + 'px;">  <div class="top-card suit">' + card[n].cardnum + '<br></div>  <div class="middle-card suit"></div>  <div class="bottom-card suit">' + card[n].cardnum +
        '<br></div> </div>';
}

// Max bet logic
function maxbet() {
    document.getElementById('playerBet').value = dollars;
    message.innerHTML = "Bet changed to $" + dollars;
}


// Player actions for buttons
function cardAction(a) {
    switch (a) {
        case 'hit':
            playCard(); //add new card to player's hand
            break;
        case 'hold':
            playEnd(); //play out and calculate
            break;
        case 'double': // double bet amount for player and remove value from dollars
            var betValue = parseInt(document.getElementById('playerBet').value);
            if ((dollars - betValue) < 0) {
                betValue = betValue + dollars;
                dollars = 0;
            } else {
                dollars = dollars - betValue;
                betValue = betValue * 2;
            }
            document.getElementById('dollar').innerHTML = dollars;
            document.getElementById('playerBet').value = betValue;
            playCard();
            playEnd();
            break;
        default:
            playEnd();
    }
}

//Grabs next card and pushes to player's array for HIT
function playCard() {
    player.push(card[cardCount]);
    playerPlate.innerHTML += cardOutput(cardCount, (player.length - 1)); // positions next card for 'hit'
    redeal();
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
    message.innerHTML = "Deal Again!<br>";
    var payout = 1;
    // checks dealer's score
    var dealerValue = total(dealer);
    dValue.innerHTML = dealerValue;

    while (dealerValue < 17) { //check values of the dealer card to determine to draw more cards
        dealer.push(card[cardCount]);
        dealerPlate.innerHTML += cardOutput(cardCount, (dealer.length - 1));
        redeal();
        dealerValue = total(dealer);
        dValue.innerHTML = dealerValue;
    }
    // check to see if dealer or player wins
    var playerValue = total(player);
    if (playerValue == 21 && player.length == 21) {
        message.innerHTML = "Player BlackJack";
        payout = 1.5;
    }
    var betValue = parseInt(document.getElementById('playerBet').value) * payout;
    if ((playerValue < 22 && dealerValue < playerValue) || (dealerValue > 21 && playerValue < 22)) {
        message.innerHTML += '<span style="color:#51B27A;">CONGRATS! You won $' + betValue + '</span>';
        dollars = dollars + (betValue * 2);
    } //check if dealer wins
    else if (playerValue > 21) {
        message.innerHTML += '<span style="color:#C52E1C;">Dealer Wins! You lost $' + betValue + '</span>';
    }
    else if (playerValue == dealerValue) {
        message.innerHTML += '<span style="color:#F1C40F;">PUSH!</span>';
        dollars = dollars + betValue;
    }
    else {
        message.innerHTML += '<span style="color:#C52E1C;">Dealer Wins! You lost $' + betValue + '</span>';
    }

    pValue.innerHTML = playerValue;
    dollarValue.innerHTML = dollars;
}

// Checks total score and ACE adjustment
function total(argu) {
    var current = 0; // loops thru array and has a value to hold
    var aceAdjust = false;
    //if ACE is detected, take the value and equal to 11
    for (var i in argu) { // loop thru all cards that player has
        if (argu[i].cardnum == 'A' && !aceAdjust) {
            aceAdjust = true;
            current = current + 10;
        }
        current = current + argu[i].cardvalue;
    }
    if (aceAdjust && current > 21) {
        current = current - 10;
    }
    return current;
}


// Shuffle Deck
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j]
        array[j] = temp;
    }
    return array;
}

// Displaying cards for player and dealer
function displayCard() {
    display.innerHTML += "<span style='color:" + card[cardCount].bgcolor + "'>" + card[cardCount].cardnum + "&" + card[cardCount].icon + ";</span>  ";
}
