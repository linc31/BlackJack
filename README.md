# BlackJack

The objective of the game is to beat the dealer which can be done by the following :
 - Get 21 points on your first two cards (blackjack), without a dealer blackjack
 - Reach a final score higher than the dealer that doesn't exceed over 21
 - Allow the dealer to draw a hand that exceeds 21
 - If both player and dealer receive the same points, round will result as a push
  
The game is stocked with one deck of cards, but will reshuffle every 30 cards that is played to reduce card counting.
The player will have three standard actions after receiving two initial cards: **Stand, Hit, Double** and following **Deal** after round is finished.
Rules for each action described:
- **Stand**: Player takes no more cards and it is dealer's turn to draw
- **Hit**: Draw another card
- **Double**: Player doubles bet and draws one additional card to hand. Player also has the option to hit and then double if desired

Following rules for the dealer:
- Dealer hits until hand has 17 or more points
- Dealer can never double

# Process
![Blackjack process](https://github.com/linc31/BlackJack/blob/master/process/blackjack_process.gif)

# Technologies Used
- Javascript/jQuery
- HTML
- CSS
- [Trello](https://trello.com/b/887TryzF/proj1blackjack)

# Demo Game
Demo[BlackJack](https://linc31.github.io/BlackJack/)
