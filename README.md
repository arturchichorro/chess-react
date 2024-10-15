# Chess in React

This project is a chess game built with React and Redux. It offers all the usual functionality from a chess game: all the rules are implemented, including en passant, bidirectional castling, pawns moving two squares on their first move, checkmantes, stalemates, etc.

You can try the app here: [Chess in React Demo](https://chess-react-bolota.netlify.app/)

## Features
I started this project by following [this YouTube tutorial series](https://www.youtube.com/watch?v=jS9elCC2hPQ&list=PLnWzgq1mKyAsFZoMyZQbB8bNuNufSD0Sz&index=1) (check out the corresponding GitHub repo [here](https://github.com/felerticia/chess)). After completing the tutorial, I added several features to both complete the game with missing rules from the tutorial, and also enhance the overall experience of playing the game:

- **Threefold Repetition**: Automatically detects when the same position occurs three times, allowing for a draw.
- **Fifty-Move Rule**: Tracks the number of moves made and applies the fifty-move rule for draws.
- **Board Flipping**: A button to flip the board and play from the black perspective, implemented with CSS.
- **Square Highlighting**: Right-click on the board to highlight a square for easier analysis.

## Technologies Used
- **React**: For building the user interface.
- **Redux**: For managing the game state.

## Game State Structure
Here’s how the initial game state looks in the app:

```javascript
export const initGameState = {
    game: [{
        position: createPosition(),
        castleDirection: {
            w: 'both',
            b: 'both',
        },
        fifty: 0
    }],
    turn: 'w', // 'w' for white's turn, 'b' for black's
    movesList: [], // List of moves made in the game
    candidateMoves: [], // Possible moves for the current player
    status: Status.ongoing, // Game status (ongoing, checkmate, draw, etc.)
    promotionSquare: null, // Square where a pawn promotion can occur
    flipped: false // Whether the board is flipped for black
};
```

## Running the App Locally
To run the Chess React App on your local machine:

- Clone this repository.
- Install dependencies by running:
```bash
npm install
```
- Start the development server with:
```bash
npm start
```
