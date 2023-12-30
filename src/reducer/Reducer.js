import actionTypes from "./actionTypes";
import { Status } from "../constants";

export const reducer = (state, action) => {

    switch (action.type) {
        case actionTypes.NEW_MOVE: {

            let { turn, movesList, game } = state;

            turn = turn === 'w' ? 'b' : 'w';

            game = [
                ...game,
                {
                    position: action.payload.newPosition,
                    castleDirection: {
                        ...action.payload.castle
                    }
                }
            ]

            movesList = [
                ...movesList,
                action.payload.newMove
            ];


            return {
                ...state,
                movesList,
                game,
                turn,
            }
        }

        case actionTypes.GENERATE_CANDIDATE_MOVES: {
            return {
                ...state,
                candidateMoves: action.payload.candidateMoves
            }
        }

        case actionTypes.CLEAR_CANDIDATE_MOVES: {
            return {
                ...state,
                candidateMoves: []
            }
        }
        case actionTypes.PROMOTION_OPEN: {
            return {
                ...state,
                status: Status.promoting,
                promotionSquare: { ...action.payload }
            }
        }
        case actionTypes.POPUP_CLOSE: {
            return {
                ...state,
                status: Status.ongoing,
                promotionSquare: null
            }
        }
        case actionTypes.STALEMATE: {
            return {
                ...state,
                status: Status.stalemate,
            }
        }
        case actionTypes.NEW_GAME: {
            return {
                ...action.payload
            }
        }
        case actionTypes.INSUFFICIENT_MATERIAL: {
            return {
                ...state,
                status: Status.insufficient,
            }
        }
        case actionTypes.WIN: {
            return {
                ...state,
                status: action.payload === 'w' ? Status.white : Status.black,
            }
        }
        case actionTypes.TAKE_BACK: {
            let { game, movesList, turn } = state;

            if (game.length > 1) {
                game = game.slice(0, game.length - 1);
                movesList = movesList.slice(0, movesList.length - 1);
                turn = turn === 'w' ? 'b' : 'w';
            }

            return {
                ...state,
                game,
                movesList,
                turn
            }
        }
        case actionTypes.FLIP: {
            return {
                ...state,
                flipped: !state.flipped
            }
        }

        default:
            return state;
    }

}