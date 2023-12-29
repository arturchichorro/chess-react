import actionTypes from "../actionTypes"

export const makeNewMove = ({ newPosition, castle, newMove }) => {

    return {
        type: actionTypes.NEW_MOVE,
        payload: { newPosition, castle, newMove }
    }
}
export const generateCandidateMoves = ({ candidateMoves }) => {

    return {
        type: actionTypes.GENERATE_CANDIDATE_MOVES,
        payload: { candidateMoves }
    }
}

export const clearCandidates = () => {

    return {
        type: actionTypes.CLEAR_CANDIDATE_MOVES
    }
}

export const takeBack = () => {

    return {
        type: actionTypes.TAKE_BACK
    }
}