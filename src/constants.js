import { createPosition } from "./helper";

export const Status = {
    'ongoing': 'Ongoing',
    'promoting': 'Promoting',
    'white': 'White wins',
    'black': 'Black wins',
    'stalemate': 'Game draws due to stalemate',
    'insufficient': 'Game draws due to insufficient material',
    'repetition': 'Game draws due to threefold repetition',
}

export const initGameState = {
    game: [{
        position: [createPosition()],
        castleDirection: {
            w: 'both',
            b: 'both',
        }
    }],
    turn: 'w',
    movesList: [],
    candidateMoves: [],
    status: Status.ongoing,
    promotionSquare: null,
    flipped: false
}